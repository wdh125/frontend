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
  async getMyOrders() {
    try {
      const response = await api.get('/orders/my-orders')
      return response.data
    } catch (error) {
      throw error
    }
  }
}
