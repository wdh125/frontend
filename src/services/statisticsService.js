import api from './api'

export const statisticsService = {
  // ===== ADMIN STATISTICS APIs =====

  // Thống kê tổng quan
  async getOverviewStatistics() {
    try {
      const response = await api.get('/admin/statistics/overview')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê doanh thu
  async getRevenueStatistics(from, to) {
    try {
      const response = await api.get('/admin/statistics/revenue', {
        params: { from, to }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê đơn hàng
  async getOrderStatistics(from, to) {
    try {
      const response = await api.get('/admin/statistics/orders', {
        params: { from, to }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Top khách hàng
  async getTopCustomers(limit = 5) {
    try {
      const response = await api.get('/admin/statistics/top-customers', {
        params: { limit }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Top sản phẩm
  async getTopProducts(limit = 5) {
    try {
      const response = await api.get('/admin/statistics/top-products', {
        params: { limit }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}
