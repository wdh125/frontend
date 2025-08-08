import api from './api'

export const settingService = {
  // ===== PUBLIC SETTINGS =====
  
  // Lấy cài đặt công khai
  async getPublicSettings() {
    try {
      const response = await api.get('/settings/public-list')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== SYSTEM SETTINGS =====

  // Lấy tất cả cài đặt hệ thống (Admin)
  async getAllSettings() {
    try {
      const response = await api.get('/settings')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy cài đặt theo key
  async getSetting(key) {
    try {
      const response = await api.get(`/settings/${key}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt (Admin)
  async updateSetting(key, value) {
    try {
      const response = await api.put(`/settings/${key}`, { value })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật nhiều cài đặt (Admin)
  async updateMultipleSettings(settings) {
    try {
      const response = await api.patch('/settings/bulk', settings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Reset cài đặt về mặc định (Admin)
  async resetToDefault(key) {
    try {
      const response = await api.patch(`/settings/${key}/reset`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== SHOP SETTINGS =====

  // Lấy thông tin cửa hàng
  async getShopInfo() {
    try {
      const response = await api.get('/settings/shop-info')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật thông tin cửa hàng (Admin)
  async updateShopInfo(shopInfo) {
    try {
      const response = await api.put('/settings/shop-info', shopInfo)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy giờ hoạt động
  async getBusinessHours() {
    try {
      const response = await api.get('/settings/business-hours')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật giờ hoạt động (Admin)
  async updateBusinessHours(hours) {
    try {
      const response = await api.put('/settings/business-hours', hours)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy thông tin liên hệ
  async getContactInfo() {
    try {
      const response = await api.get('/settings/contact-info')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật thông tin liên hệ (Admin)
  async updateContactInfo(contactInfo) {
    try {
      const response = await api.put('/settings/contact-info', contactInfo)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== PAYMENT SETTINGS =====

  // Lấy cài đặt thanh toán (Admin)
  async getPaymentSettings() {
    try {
      const response = await api.get('/settings/payment')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt thanh toán (Admin)
  async updatePaymentSettings(paymentSettings) {
    try {
      const response = await api.put('/settings/payment', paymentSettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy phí giao hàng (Admin)
  async getDeliveryFees() {
    try {
      const response = await api.get('/settings/delivery-fees')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật phí giao hàng (Admin)
  async updateDeliveryFees(deliveryFees) {
    try {
      const response = await api.put('/settings/delivery-fees', deliveryFees)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== NOTIFICATION SETTINGS =====

  // Lấy cài đặt thông báo (Admin)
  async getNotificationSettings() {
    try {
      const response = await api.get('/settings/notifications')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt thông báo (Admin)
  async updateNotificationSettings(notificationSettings) {
    try {
      const response = await api.put('/settings/notifications', notificationSettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy cài đặt email (Admin)
  async getEmailSettings() {
    try {
      const response = await api.get('/settings/email')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt email (Admin)
  async updateEmailSettings(emailSettings) {
    try {
      const response = await api.put('/settings/email', emailSettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Test kết nối email (Admin)
  async testEmailConnection() {
    try {
      const response = await api.post('/settings/email/test')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== ORDER SETTINGS =====

  // Lấy cài đặt đơn hàng (Admin)
  async getOrderSettings() {
    try {
      const response = await api.get('/settings/orders')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt đơn hàng (Admin)
  async updateOrderSettings(orderSettings) {
    try {
      const response = await api.put('/settings/orders', orderSettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy cài đặt đặt bàn (Admin)
  async getReservationSettings() {
    try {
      const response = await api.get('/settings/reservations')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt đặt bàn (Admin)
  async updateReservationSettings(reservationSettings) {
    try {
      const response = await api.put('/settings/reservations', reservationSettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== LOYALTY SETTINGS =====

  // Lấy cài đặt chương trình loyalty (Admin)
  async getLoyaltySettings() {
    try {
      const response = await api.get('/settings/loyalty')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt loyalty (Admin)
  async updateLoyaltySettings(loyaltySettings) {
    try {
      const response = await api.put('/settings/loyalty', loyaltySettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== SECURITY SETTINGS =====

  // Lấy cài đặt bảo mật (Admin)
  async getSecuritySettings() {
    try {
      const response = await api.get('/settings/security')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt bảo mật (Admin)
  async updateSecuritySettings(securitySettings) {
    try {
      const response = await api.put('/settings/security', securitySettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== BACKUP & MAINTENANCE =====

  // Tạo backup dữ liệu (Admin)
  async createBackup() {
    try {
      const response = await api.post('/settings/backup', {}, {
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // Khôi phục từ backup (Admin)
  async restoreBackup(backupFile) {
    try {
      const formData = new FormData()
      formData.append('backup', backupFile)
      
      const response = await api.post('/settings/restore', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy thông tin hệ thống (Admin)
  async getSystemInfo() {
    try {
      const response = await api.get('/settings/system-info')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa cache hệ thống (Admin)
  async clearCache() {
    try {
      const response = await api.post('/settings/clear-cache')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== APPEARANCE SETTINGS =====

  // Lấy cài đặt giao diện
  async getAppearanceSettings() {
    try {
      const response = await api.get('/settings/appearance')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt giao diện (Admin)
  async updateAppearanceSettings(appearanceSettings) {
    try {
      const response = await api.put('/settings/appearance', appearanceSettings)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Upload logo (Admin)
  async uploadLogo(logoFile) {
    try {
      const formData = new FormData()
      formData.append('logo', logoFile)
      
      const response = await api.post('/settings/logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Upload favicon (Admin)
  async uploadFavicon(faviconFile) {
    try {
      const formData = new FormData()
      formData.append('favicon', faviconFile)
      
      const response = await api.post('/settings/favicon', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}