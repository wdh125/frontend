import api from './api'

export const reservationService = {
  // ===== CUSTOMER APIs =====

  // Đặt bàn mới
  async createReservation(reservationData) {
    try {
      const response = await api.post('/reservations', reservationData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy danh sách đặt bàn của tôi
  async getMyReservations(params = {}) {
    try {
      const response = await api.get('/reservations/my-reservations', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy chi tiết đặt bàn
  async getReservationById(reservationId) {
    try {
      const response = await api.get(`/reservations/${reservationId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật đặt bàn
  async updateReservation(reservationId, updateData) {
    try {
      const response = await api.put(`/reservations/${reservationId}`, updateData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Hủy đặt bàn
  async cancelReservation(reservationId, reason) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/cancel`, { reason })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác nhận tham dự
  async confirmAttendance(reservationId) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/confirm`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== TABLE AVAILABILITY =====

  // Kiểm tra bàn có sẵn
  async checkTableAvailability(params) {
    try {
      const response = await api.get('/reservations/available-tables', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy lịch trống của bàn
  async getTableSchedule(tableId, date) {
    try {
      const response = await api.get(`/reservations/table-schedule/${tableId}`, {
        params: { date }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy các khung giờ có sẵn
  async getAvailableTimeSlots(params) {
    try {
      const response = await api.get('/reservations/available-slots', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== ADMIN APIs =====

  // Lấy tất cả đặt bàn (Admin)
  async getAllReservations(params = {}) {
    try {
      const response = await api.get('/reservations', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật trạng thái đặt bàn (Admin)
  async updateReservationStatus(reservationId, status) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/status`, { status })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác nhận đặt bàn (Admin)
  async confirmReservation(reservationId) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/admin-confirm`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Từ chối đặt bàn (Admin)
  async rejectReservation(reservationId, reason) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/reject`, { reason })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Check-in khách hàng (Admin)
  async checkInCustomer(reservationId) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/check-in`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Check-out khách hàng (Admin)
  async checkOutCustomer(reservationId) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/check-out`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đánh dấu khách không đến (Admin)
  async markNoShow(reservationId) {
    try {
      const response = await api.patch(`/reservations/${reservationId}/no-show`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== TABLE MANAGEMENT =====

  // Lấy danh sách bàn (Admin)
  async getAllTables() {
    try {
      const response = await api.get('/reservations/tables')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo bàn mới (Admin)
  async createTable(tableData) {
    try {
      const response = await api.post('/reservations/tables', tableData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật thông tin bàn (Admin)
  async updateTable(tableId, tableData) {
    try {
      const response = await api.put(`/reservations/tables/${tableId}`, tableData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa bàn (Admin)
  async deleteTable(tableId) {
    try {
      await api.delete(`/reservations/tables/${tableId}`)
      return { message: 'Xóa bàn thành công' }
    } catch (error) {
      throw error
    }
  },

  // Bật/tắt bàn (Admin)
  async toggleTableActive(tableId) {
    try {
      const response = await api.patch(`/reservations/tables/${tableId}/toggle-active`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== STATISTICS =====

  // Thống kê đặt bàn (Admin)
  async getReservationStatistics(params = {}) {
    try {
      const response = await api.get('/reservations/statistics', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê sử dụng bàn (Admin)
  async getTableUtilization(params = {}) {
    try {
      const response = await api.get('/reservations/table-utilization', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xuất báo cáo đặt bàn (Admin)
  async exportReservationReport(params = {}) {
    try {
      const response = await api.get('/reservations/export', {
        params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // ===== SHARED APIs =====

  // Lấy cài đặt đặt bàn
  async getReservationSettings() {
    try {
      const response = await api.get('/reservations/settings')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy lịch sử đặt bàn
  async getReservationHistory(reservationId) {
    try {
      const response = await api.get(`/reservations/${reservationId}/history`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}