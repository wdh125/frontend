import { notificationService } from '@/services'

const state = {
  notifications: [],
  unreadCount: 0,
  settings: {},
  loading: false,
  error: null
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
  },
  SET_UNREAD_COUNT(state, count) {
    state.unreadCount = count
  },
  SET_NOTIFICATION_SETTINGS(state, settings) {
    state.settings = settings
  },
  ADD_NOTIFICATION(state, notification) {
    state.notifications.unshift(notification)
    if (!notification.read) {
      state.unreadCount++
    }
  },
  UPDATE_NOTIFICATION(state, updatedNotification) {
    const index = state.notifications.findIndex(notif => notif.id === updatedNotification.id)
    if (index !== -1) {
      const oldNotification = state.notifications[index]
      state.notifications.splice(index, 1, updatedNotification)
      
      // Update unread count if read status changed
      if (!oldNotification.read && updatedNotification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      } else if (oldNotification.read && !updatedNotification.read) {
        state.unreadCount++
      }
    }
  },
  REMOVE_NOTIFICATION(state, notificationId) {
    const notification = state.notifications.find(notif => notif.id === notificationId)
    if (notification && !notification.read) {
      state.unreadCount = Math.max(0, state.unreadCount - 1)
    }
    state.notifications = state.notifications.filter(notif => notif.id !== notificationId)
  },
  MARK_ALL_AS_READ(state) {
    state.notifications = state.notifications.map(notif => ({ ...notif, read: true }))
    state.unreadCount = 0
  }
}

const actions = {
  async fetchMyNotifications({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await notificationService.getMyNotifications(params)
      commit('SET_NOTIFICATIONS', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchUnreadCount({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await notificationService.getUnreadCount()
      commit('SET_UNREAD_COUNT', response.data?.count || response.count || 0)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async markAsRead({ commit }, notificationId) {
    try {
      commit('SET_ERROR', null)
      
      const response = await notificationService.markAsRead(notificationId)
      commit('UPDATE_NOTIFICATION', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async markAllAsRead({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await notificationService.markAllAsRead()
      commit('MARK_ALL_AS_READ')
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteNotification({ commit }, notificationId) {
    try {
      commit('SET_ERROR', null)
      
      await notificationService.deleteNotification(notificationId)
      commit('REMOVE_NOTIFICATION', notificationId)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async deleteReadNotifications({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      await notificationService.deleteReadNotifications()
      
      // Reload notifications to reflect changes
      const response = await notificationService.getMyNotifications()
      commit('SET_NOTIFICATIONS', response.data || response)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchNotificationSettings({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await notificationService.getNotificationSettings()
      commit('SET_NOTIFICATION_SETTINGS', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async updateNotificationSettings({ commit }, settings) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await notificationService.updateNotificationSettings(settings)
      commit('SET_NOTIFICATION_SETTINGS', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  notifications: state => state.notifications,
  unreadCount: state => state.unreadCount,
  notificationSettings: state => state.settings,
  loading: state => state.loading,
  error: state => state.error,
  
  unreadNotifications: state => state.notifications.filter(notif => !notif.read),
  readNotifications: state => state.notifications.filter(notif => notif.read),
  
  // Get notifications by type
  getNotificationsByType: state => type => 
    state.notifications.filter(notif => notif.type === type),
  
  // Check if there are unread notifications
  hasUnreadNotifications: state => state.unreadCount > 0
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}