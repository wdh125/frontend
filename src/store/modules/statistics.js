import { statisticsService } from '@/services'

export default {
  namespaced: true,

  state: {
    overview: null,
    revenue: null,
    orders: null,
    topCustomers: null,
    topProducts: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_OVERVIEW(state, overview) {
      state.overview = overview
    },
    SET_REVENUE(state, revenue) {
      state.revenue = revenue
    },
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    SET_TOP_CUSTOMERS(state, customers) {
      state.topCustomers = customers
    },
    SET_TOP_PRODUCTS(state, products) {
      state.topProducts = products
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    // Lấy thống kê tổng quan
    async fetchOverview({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const overview = await statisticsService.getOverviewStatistics()
        commit('SET_OVERVIEW', overview)
        return overview
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Lấy thống kê doanh thu
    async fetchRevenue({ commit }, { from, to }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const revenue = await statisticsService.getRevenueStatistics(from, to)
        commit('SET_REVENUE', revenue)
        return revenue
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Lấy thống kê đơn hàng
    async fetchOrders({ commit }, { from, to }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const orders = await statisticsService.getOrderStatistics(from, to)
        commit('SET_ORDERS', orders)
        return orders
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Lấy top khách hàng
    async fetchTopCustomers({ commit }, limit = 5) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const customers = await statisticsService.getTopCustomers(limit)
        commit('SET_TOP_CUSTOMERS', customers)
        return customers
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Lấy top sản phẩm
    async fetchTopProducts({ commit }, limit = 5) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const products = await statisticsService.getTopProducts(limit)
        commit('SET_TOP_PRODUCTS', products)
        return products
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    overview: state => state.overview,
    revenue: state => state.revenue,
    orders: state => state.orders,
    topCustomers: state => state.topCustomers,
    topProducts: state => state.topProducts,
    isLoading: state => state.loading,
    error: state => state.error
  }
}
