import api from './api'

export const notificationService = {
  // ===== USER NOTIFICATIONS =====

  // Lấy thông báo của người dùng
  async getMyNotifications(params = {}) {
    try {
      const response = await api.get('/notifications/my', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đánh dấu thông báo đã đọc
  async markAsRead(notificationId) {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đánh dấu tất cả thông báo đã đọc
  async markAllAsRead() {
    try {
      const response = await api.patch('/notifications/mark-all-read')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa thông báo
  async deleteNotification(notificationId) {
    try {
      await api.delete(`/notifications/${notificationId}`)
      return { message: 'Xóa thông báo thành công' }
    } catch (error) {
      throw error
    }
  },

  // Xóa tất cả thông báo đã đọc
  async deleteReadNotifications() {
    try {
      await api.delete('/notifications/read')
      return { message: 'Đã xóa tất cả thông báo đã đọc' }
    } catch (error) {
      throw error
    }
  },

  // Lấy số lượng thông báo chưa đọc
  async getUnreadCount() {
    try {
      const response = await api.get('/notifications/unread-count')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== NOTIFICATION PREFERENCES =====

  // Lấy cài đặt thông báo
  async getNotificationSettings() {
    try {
      const response = await api.get('/notifications/settings')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt thông báo
  async updateNotificationSettings(settings) {
    try {
      const response = await api.patch('/notifications/settings', settings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đăng ký push notification
  async subscribePush(subscription) {
    try {
      const response = await api.post('/notifications/push/subscribe', subscription)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Hủy đăng ký push notification
  async unsubscribePush(endpoint) {
    try {
      const response = await api.post('/notifications/push/unsubscribe', { endpoint })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== ADMIN NOTIFICATIONS =====

  // Lấy tất cả thông báo (Admin)
  async getAllNotifications(params = {}) {
    try {
      const response = await api.get('/notifications', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo thông báo (Admin)
  async createNotification(notificationData) {
    try {
      const response = await api.post('/notifications', notificationData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Gửi thông báo cho người dùng cụ thể (Admin)
  async sendToUser(userId, notificationData) {
    try {
      const response = await api.post(`/notifications/send-to-user/${userId}`, notificationData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Gửi thông báo cho nhóm người dùng (Admin)
  async sendToGroup(groupId, notificationData) {
    try {
      const response = await api.post(`/notifications/send-to-group/${groupId}`, notificationData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Gửi thông báo broadcast (Admin)
  async sendBroadcast(notificationData) {
    try {
      const response = await api.post('/notifications/broadcast', notificationData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Gửi thông báo đẩy (Admin)
  async sendPushNotification(pushData) {
    try {
      const response = await api.post('/notifications/push/send', pushData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật thông báo (Admin)
  async updateNotification(notificationId, updateData) {
    try {
      const response = await api.put(`/notifications/${notificationId}`, updateData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa thông báo (Admin)
  async deleteNotificationAdmin(notificationId) {
    try {
      await api.delete(`/notifications/${notificationId}`)
      return { message: 'Xóa thông báo thành công' }
    } catch (error) {
      throw error
    }
  },

  // ===== NOTIFICATION TEMPLATES =====

  // Lấy template thông báo (Admin)
  async getNotificationTemplates() {
    try {
      const response = await api.get('/notifications/templates')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo template thông báo (Admin)
  async createNotificationTemplate(templateData) {
    try {
      const response = await api.post('/notifications/templates', templateData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật template thông báo (Admin)
  async updateNotificationTemplate(templateId, templateData) {
    try {
      const response = await api.put(`/notifications/templates/${templateId}`, templateData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa template thông báo (Admin)
  async deleteNotificationTemplate(templateId) {
    try {
      await api.delete(`/notifications/templates/${templateId}`)
      return { message: 'Xóa template thành công' }
    } catch (error) {
      throw error
    }
  },

  // ===== NOTIFICATION STATISTICS =====

  // Thống kê thông báo (Admin)
  async getNotificationStatistics(params = {}) {
    try {
      const response = await api.get('/notifications/statistics', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê mở thông báo (Admin)
  async getOpenRates(params = {}) {
    try {
      const response = await api.get('/notifications/open-rates', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xuất báo cáo thông báo (Admin)
  async exportNotificationReport(params = {}) {
    try {
      const response = await api.get('/notifications/export', {
        params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // ===== REAL-TIME NOTIFICATIONS =====

  // Kết nối WebSocket để nhận thông báo realtime
  connectWebSocket() {
    const token = localStorage.getItem('accessToken')
    if (!token) return null

    const ws = new WebSocket(`ws://localhost:8080/notifications/ws?token=${token}`)
    
    ws.onopen = () => {
      console.log('Connected to notification websocket')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    ws.onclose = () => {
      console.log('Disconnected from notification websocket')
    }

    return ws
  },

  // ===== EMAIL NOTIFICATIONS =====

  // Gửi email thông báo (Admin)
  async sendEmailNotification(emailData) {
    try {
      const response = await api.post('/notifications/email/send', emailData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy template email (Admin)
  async getEmailTemplates() {
    try {
      const response = await api.get('/notifications/email/templates')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo template email (Admin)
  async createEmailTemplate(templateData) {
    try {
      const response = await api.post('/notifications/email/templates', templateData)
      return response.data
    } catch (error) {
      throw error
    }
  }
}