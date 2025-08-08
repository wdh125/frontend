import { userService } from '@/services'

const state = {
  users: [],
  currentUser: null,
  profile: {},
  addresses: [],
  favorites: [],
  preferences: {},
  loyaltyPoints: 0,
  loyaltyHistory: [],
  pagination: {
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0
  },
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
  SET_USERS(state, users) {
    state.users = users
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  },
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses
  },
  SET_FAVORITES(state, favorites) {
    state.favorites = favorites
  },
  SET_PREFERENCES(state, preferences) {
    state.preferences = preferences
  },
  SET_LOYALTY_POINTS(state, points) {
    state.loyaltyPoints = points
  },
  SET_LOYALTY_HISTORY(state, history) {
    state.loyaltyHistory = history
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  },
  ADD_USER(state, user) {
    state.users.push(user)
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser)
    }
    
    if (state.currentUser && state.currentUser.id === updatedUser.id) {
      state.currentUser = updatedUser
    }
  },
  REMOVE_USER(state, userId) {
    state.users = state.users.filter(user => user.id !== userId)
    if (state.currentUser && state.currentUser.id === userId) {
      state.currentUser = null
    }
  },
  ADD_ADDRESS(state, address) {
    state.addresses.push(address)
  },
  UPDATE_ADDRESS(state, updatedAddress) {
    const index = state.addresses.findIndex(addr => addr.id === updatedAddress.id)
    if (index !== -1) {
      state.addresses.splice(index, 1, updatedAddress)
    }
  },
  REMOVE_ADDRESS(state, addressId) {
    state.addresses = state.addresses.filter(addr => addr.id !== addressId)
  },
  ADD_TO_FAVORITES(state, productId) {
    if (!state.favorites.includes(productId)) {
      state.favorites.push(productId)
    }
  },
  REMOVE_FROM_FAVORITES(state, productId) {
    state.favorites = state.favorites.filter(id => id !== productId)
  }
}

const actions = {
  async fetchProfile({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.getProfile()
      commit('SET_PROFILE', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateProfile({ commit }, profileData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.updateProfile(profileData)
      commit('SET_PROFILE', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateAvatar({ commit }, avatarFile) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.updateAvatar(avatarFile)
      commit('SET_PROFILE', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteAvatar({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.deleteAvatar()
      commit('SET_PROFILE', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async changePassword({ commit }, passwordData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.changePassword(passwordData)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchAddresses({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await userService.getAddresses()
      commit('SET_ADDRESSES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async addAddress({ commit }, addressData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.addAddress(addressData)
      commit('ADD_ADDRESS', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateAddress({ commit }, { addressId, addressData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.updateAddress(addressId, addressData)
      commit('UPDATE_ADDRESS', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteAddress({ commit }, addressId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      await userService.deleteAddress(addressId)
      commit('REMOVE_ADDRESS', addressId)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async setDefaultAddress({ commit }, addressId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.setDefaultAddress(addressId)
      commit('SET_ADDRESSES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchPreferences({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await userService.getPreferences()
      commit('SET_PREFERENCES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async updatePreferences({ commit }, preferences) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.updatePreferences(preferences)
      commit('SET_PREFERENCES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchFavorites({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await userService.getFavorites()
      commit('SET_FAVORITES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async addToFavorites({ commit }, productId) {
    try {
      commit('SET_ERROR', null)
      
      const response = await userService.addToFavorites(productId)
      commit('ADD_TO_FAVORITES', productId)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async removeFromFavorites({ commit }, productId) {
    try {
      commit('SET_ERROR', null)
      
      await userService.removeFromFavorites(productId)
      commit('REMOVE_FROM_FAVORITES', productId)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async fetchLoyaltyPoints({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await userService.getLoyaltyPoints()
      commit('SET_LOYALTY_POINTS', response.data.points)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async fetchLoyaltyHistory({ commit }, params = {}) {
    try {
      commit('SET_ERROR', null)
      
      const response = await userService.getLoyaltyHistory(params)
      commit('SET_LOYALTY_HISTORY', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  // Admin actions
  async fetchAllUsers({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.getAllUsers(params)
      commit('SET_USERS', response.data.users || response.data)
      
      if (response.data.pagination) {
        commit('SET_PAGINATION', response.data.pagination)
      }
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchUserById({ commit }, userId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.getUserById(userId)
      commit('SET_CURRENT_USER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createUser({ commit }, userData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.createUser(userData)
      commit('ADD_USER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateUser({ commit }, { userId, userData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.updateUser(userId, userData)
      commit('UPDATE_USER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteUser({ commit }, userId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      await userService.deleteUser(userId)
      commit('REMOVE_USER', userId)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async toggleUserActive({ commit }, userId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.toggleUserActive(userId)
      commit('UPDATE_USER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async changeUserRole({ commit }, { userId, role }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await userService.changeUserRole(userId, role)
      commit('UPDATE_USER', response.data)
      
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
  users: state => state.users,
  currentUser: state => state.currentUser,
  profile: state => state.profile,
  addresses: state => state.addresses,
  favorites: state => state.favorites,
  preferences: state => state.preferences,
  loyaltyPoints: state => state.loyaltyPoints,
  loyaltyHistory: state => state.loyaltyHistory,
  pagination: state => state.pagination,
  loading: state => state.loading,
  error: state => state.error,
  
  defaultAddress: state => state.addresses.find(addr => addr.isDefault),
  
  activeUsers: state => state.users.filter(user => user.isActive),
  
  adminUsers: state => state.users.filter(user => user.role === 'ADMIN'),
  
  customerUsers: state => state.users.filter(user => user.role === 'USER'),
  
  isFavorite: state => productId => state.favorites.includes(productId)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}