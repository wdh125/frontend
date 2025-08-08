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

  // Thống kê dashboard tổng quan  
  async getDashboardStats() {
    try {
      const response = await api.get('/admin/statistics/dashboard')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê doanh thu
  async getRevenueStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/revenue', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê doanh thu theo thời gian
  async getRevenueByPeriod(period, from, to) {
    try {
      const response = await api.get('/admin/statistics/revenue/by-period', {
        params: { period, from, to }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê đơn hàng
  async getOrderStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/orders', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê đơn hàng theo trạng thái
  async getOrdersByStatus(from, to) {
    try {
      const response = await api.get('/admin/statistics/orders/by-status', {
        params: { from, to }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê sản phẩm
  async getProductStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/products', { params })
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

  // Top sản phẩm bán chạy
  async getTopProducts(limit = 5, from, to) {
    try {
      const response = await api.get('/admin/statistics/top-products', {
        params: { limit, from, to }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê danh mục
  async getCategoryStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/categories', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê thanh toán
  async getPaymentStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/payments', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê đặt bàn
  async getReservationStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/reservations', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê người dùng
  async getUserStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/users', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê người dùng mới
  async getNewUserStatistics(from, to) {
    try {
      const response = await api.get('/admin/statistics/users/new', {
        params: { from, to }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê hoạt động người dùng
  async getUserActivityStatistics(params = {}) {
    try {
      const response = await api.get('/admin/statistics/users/activity', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê theo thời gian thực
  async getRealTimeStatistics() {
    try {
      const response = await api.get('/admin/statistics/realtime')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Báo cáo tài chính
  async getFinancialReport(params = {}) {
    try {
      const response = await api.get('/admin/statistics/financial-report', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xuất báo cáo
  async exportReport(reportType, params = {}) {
    try {
      const response = await api.get(`/admin/statistics/export/${reportType}`, {
        params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // Thống kê so sánh
  async getComparisonStatistics(period1, period2) {
    try {
      const response = await api.get('/admin/statistics/comparison', {
        params: { period1, period2 }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Dự báo doanh thu
  async getRevenueForecast(months = 3) {
    try {
      const response = await api.get('/admin/statistics/revenue-forecast', {
        params: { months }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê theo giờ trong ngày
  async getHourlyStatistics(date) {
    try {
      const response = await api.get('/admin/statistics/hourly', {
        params: { date }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê inventory
  async getInventoryStatistics() {
    try {
      const response = await api.get('/admin/statistics/inventory')
      return response.data
    } catch (error) {
      throw error
    }
  }
}
