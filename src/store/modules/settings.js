import { settingService } from '@/services'

const state = {
  settings: {},
  publicSettings: {},
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
  SET_SETTINGS(state, settings) {
    state.settings = settings
  },
  SET_PUBLIC_SETTINGS(state, settings) {
    state.publicSettings = settings
  },
  UPDATE_SETTING(state, { key, value }) {
    state.settings[key] = value
  },
  UPDATE_MULTIPLE_SETTINGS(state, settings) {
    state.settings = { ...state.settings, ...settings }
  }
}

const actions = {
  async fetchAllSettings({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await settingService.getAllSettings()
      commit('SET_SETTINGS', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchPublicSettings({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await settingService.getPublicSettings()
      commit('SET_PUBLIC_SETTINGS', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async fetchSetting({ commit }, key) {
    try {
      commit('SET_ERROR', null)
      
      const response = await settingService.getSetting(key)
      commit('UPDATE_SETTING', { key, value: response.data || response })
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async updateSetting({ commit }, { key, value }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await settingService.updateSetting(key, value)
      commit('UPDATE_SETTING', { key, value: response.data?.value || value })
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateMultipleSettings({ commit }, settings) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await settingService.updateMultipleSettings(settings)
      commit('UPDATE_MULTIPLE_SETTINGS', settings)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async resetToDefault({ commit }, key) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await settingService.resetToDefault(key)
      commit('UPDATE_SETTING', { key, value: response.data?.value || null })
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async backupSettings({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await settingService.backupSettings()
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async restoreSettings({ commit }, backupData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await settingService.restoreSettings(backupData)
      
      // Reload all settings after restore
      const settingsResponse = await settingService.getAllSettings()
      commit('SET_SETTINGS', settingsResponse.data || settingsResponse)
      
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
  settings: state => state.settings,
  publicSettings: state => state.publicSettings,
  loading: state => state.loading,
  error: state => state.error,
  
  // Get setting by key
  getSetting: state => key => state.settings[key],
  getPublicSetting: state => key => state.publicSettings[key],
  
  // Get settings by category/prefix
  getSettingsByCategory: state => category => {
    const categorySettings = {}
    Object.keys(state.settings).forEach(key => {
      if (key.startsWith(category + '.')) {
        categorySettings[key] = state.settings[key]
      }
    })
    return categorySettings
  },
  
  // Common settings getters
  appName: state => state.publicSettings['app.name'] || 'Coffee Shop',
  appLogo: state => state.publicSettings['app.logo'] || '',
  contactEmail: state => state.publicSettings['contact.email'] || '',
  contactPhone: state => state.publicSettings['contact.phone'] || '',
  businessHours: state => state.publicSettings['business.hours'] || {},
  
  // Admin-only settings
  emailSettings: state => state.settings['email'] || {},
  paymentSettings: state => state.settings['payment'] || {},
  notificationSettings: state => state.settings['notification'] || {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}