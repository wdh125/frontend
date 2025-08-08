import api from './api'

export const orderService = {
  // ===== CUSTOMER APIs =====

  // Tạo đơn hàng mới
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy đơn hàng của tôi
  async getMyOrders(params = {}) {
    try {
      const response = await api.get('/orders/my-orders', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy chi tiết đơn hàng
  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Hủy đơn hàng
  async cancelOrder(orderId, reason) {
    try {
      const response = await api.patch(`/orders/${orderId}/cancel`, { reason })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác nhận nhận hàng
  async confirmReceived(orderId) {
    try {
      const response = await api.patch(`/orders/${orderId}/confirm-received`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đánh giá đơn hàng
  async rateOrder(orderId, rating, comment) {
    try {
      const response = await api.post(`/orders/${orderId}/rate`, {
        rating,
        comment
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== ADMIN APIs =====

  // Lấy tất cả đơn hàng (Admin)
  async getAllOrders(params = {}) {
    try {
      const response = await api.get('/admin/orders', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật trạng thái đơn hàng (Admin)
  async updateOrderStatus(orderId, status) {
    try {
      const response = await api.patch(`/admin/orders/${orderId}/status`, { status })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác nhận đơn hàng (Admin)
  async confirmOrder(orderId) {
    try {
      const response = await api.patch(`/orders/${orderId}/confirm`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Từ chối đơn hàng (Admin)
  async rejectOrder(orderId, reason) {
    try {
      const response = await api.patch(`/orders/${orderId}/reject`, { reason })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đánh dấu đơn hàng đang chuẩn bị (Admin)
  async startPreparing(orderId) {
    try {
      const response = await api.patch(`/orders/${orderId}/preparing`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đánh dấu đơn hàng sẵn sàng (Admin)
  async markReady(orderId) {
    try {
      const response = await api.patch(`/orders/${orderId}/ready`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đánh dấu đơn hàng đã giao (Admin)
  async markDelivered(orderId) {
    try {
      const response = await api.patch(`/orders/${orderId}/delivered`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê đơn hàng (Admin)
  async getOrderStatistics(params = {}) {
    try {
      const response = await api.get('/orders/statistics', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xuất báo cáo đơn hàng (Admin)
  async exportOrderReport(params = {}) {
    try {
      const response = await api.get('/orders/export', {
        params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // ===== SHARED APIs =====

  // Theo dõi đơn hàng
  async trackOrder(trackingNumber) {
    try {
      const response = await api.get(`/orders/track/${trackingNumber}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy lịch sử trạng thái đơn hàng
  async getOrderHistory(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}/history`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}