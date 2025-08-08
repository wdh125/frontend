import api from './api'

export const paymentService = {
  // ===== CUSTOMER APIs =====

  // Tạo thanh toán cho đơn hàng
  async createPayment(paymentData) {
    try {
      const response = await api.post('/payments', paymentData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy lịch sử thanh toán của tôi
  async getMyPayments(params = {}) {
    try {
      const response = await api.get('/payments/my-payments', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy chi tiết thanh toán
  async getPaymentById(paymentId) {
    try {
      const response = await api.get(`/payments/${paymentId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác nhận thanh toán
  async confirmPayment(paymentId, confirmationData) {
    try {
      const response = await api.post(`/payments/${paymentId}/confirm`, confirmationData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Hủy thanh toán
  async cancelPayment(paymentId, reason) {
    try {
      const response = await api.patch(`/payments/${paymentId}/cancel`, { reason })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Yêu cầu hoàn tiền
  async requestRefund(paymentId, reason, amount) {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, {
        reason,
        amount
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== PAYMENT METHODS =====

  // Thanh toán qua VNPay
  async payWithVNPay(orderData) {
    try {
      const response = await api.post('/payments/vnpay', orderData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác nhận thanh toán VNPay
  async confirmVNPayPayment(vnpayData) {
    try {
      const response = await api.post('/payments/vnpay/confirm', vnpayData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thanh toán qua MoMo
  async payWithMoMo(orderData) {
    try {
      const response = await api.post('/payments/momo', orderData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác nhận thanh toán MoMo
  async confirmMoMoPayment(momoData) {
    try {
      const response = await api.post('/payments/momo/confirm', momoData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thanh toán tiền mặt
  async payWithCash(orderData) {
    try {
      const response = await api.post('/payments/cash', orderData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== ADMIN APIs =====

  // Lấy tất cả thanh toán (Admin)
  async getAllPayments(params = {}) {
    try {
      const response = await api.get('/payments', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật trạng thái thanh toán (Admin)
  async updatePaymentStatus(paymentId, status) {
    try {
      const response = await api.patch(`/payments/${paymentId}/status`, { status })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xử lý hoàn tiền (Admin)
  async processRefund(paymentId, refundData) {
    try {
      const response = await api.post(`/payments/${paymentId}/process-refund`, refundData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê thanh toán (Admin)
  async getPaymentStatistics(params = {}) {
    try {
      const response = await api.get('/payments/statistics', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê doanh thu (Admin)
  async getRevenueStatistics(params = {}) {
    try {
      const response = await api.get('/payments/revenue', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xuất báo cáo thanh toán (Admin)
  async exportPaymentReport(params = {}) {
    try {
      const response = await api.get('/payments/export', {
        params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // ===== SHARED APIs =====

  // Kiểm tra trạng thái thanh toán
  async checkPaymentStatus(paymentId) {
    try {
      const response = await api.get(`/payments/${paymentId}/status`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy các phương thức thanh toán khả dụng
  async getPaymentMethods() {
    try {
      const response = await api.get('/payments/methods')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy lịch sử giao dịch thanh toán
  async getPaymentHistory(paymentId) {
    try {
      const response = await api.get(`/payments/${paymentId}/history`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}