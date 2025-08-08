import api from './api'

export const tableService = {
  // ===== ADMIN APIs =====

  // Lấy tất cả bàn (Admin)
  async getAllTables(params = {}) {
    try {
      const response = await api.get('/tables', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo bàn mới (Admin)
  async createTable(tableData) {
    try {
      const response = await api.post('/tables', tableData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật thông tin bàn (Admin)
  async updateTable(tableId, tableData) {
    try {
      const response = await api.put(`/tables/${tableId}`, tableData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa bàn (Admin)
  async deleteTable(tableId) {
    try {
      await api.delete(`/tables/${tableId}`)
      return { message: 'Xóa bàn thành công' }
    } catch (error) {
      throw error
    }
  },

  // Bật/tắt bàn (Admin)
  async toggleTableActive(tableId) {
    try {
      const response = await api.patch(`/tables/${tableId}/toggle-active`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== CUSTOMER APIs =====

  // Lấy bàn có sẵn (Customer)
  async getAvailableTables(params = {}) {
    try {
      const response = await api.get('/tables/available', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy thông tin chi tiết bàn
  async getTableById(tableId) {
    try {
      const response = await api.get(`/tables/${tableId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== SHARED APIs =====

  // Kiểm tra tình trạng bàn
  async checkTableStatus(tableId, dateTime) {
    try {
      const response = await api.get(`/tables/${tableId}/status`, {
        params: { dateTime }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy lịch của bàn
  async getTableSchedule(tableId, params = {}) {
    try {
      const response = await api.get(`/tables/${tableId}/schedule`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê sử dụng bàn (Admin)
  async getTableUtilization(params = {}) {
    try {
      const response = await api.get('/tables/utilization', { params })
      return response.data
    } catch (error) {
      throw error
    }
  }
}