import { authService } from '@/services'

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthenticated: false,
    loading: false
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    CLEAR_USER(state) {
      state.user = null
      state.isAuthenticated = false
    }
  },

  actions: {
    // Đăng nhập
    async login({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        const response = await authService.login(credentials)
        commit('SET_USER', {
          username: response.username,
          role: response.role
        })
        return response
      } catch (error) {
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Đăng ký
    async register({ commit }, userData) {
      commit('SET_LOADING', true)
      try {
        const response = await authService.register(userData)
        return response
      } catch (error) {
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Đăng xuất
    async logout({ commit }) {
      commit('SET_LOADING', true)
      try {
        await authService.logout()
        commit('CLEAR_USER')
        return { message: 'Đăng xuất thành công' }
      } catch (error) {
        // Vẫn clear user ngay cả khi API lỗi
        commit('CLEAR_USER')
        // Nếu lỗi là do text response, coi như thành công
        if (error.response?.data && typeof error.response.data === 'string') {
          return { message: 'Đăng xuất thành công' }
        }
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Kiểm tra authentication khi load app
    checkAuth({ commit }) {
      const user = authService.getCurrentUser()
      if (user) {
        commit('SET_USER', user)
      }
    },

    // Refresh token
    async refreshToken({ commit }) {
      try {
        const response = await authService.refreshToken()
        return response
      } catch (error) {
        commit('CLEAR_USER')
        throw error
      }
    }
  },

  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    isAdmin: state => state.user && state.user.role === 'ROLE_ADMIN',
    isCustomer: state => state.user && state.user.role === 'ROLE_CUSTOMER',
    isLoading: state => state.loading
  }
}
