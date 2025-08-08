import api from './api'

export const userService = {
  // ===== PROFILE MANAGEMENT =====

  // Lấy thông tin profile hiện tại
  async getProfile() {
    try {
      const response = await api.get('/users/profile')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật avatar
  async updateAvatar(avatarFile) {
    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile)
      
      const response = await api.patch('/users/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa avatar
  async deleteAvatar() {
    try {
      const response = await api.delete('/users/profile/avatar')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đổi mật khẩu
  async changePassword(passwordData) {
    try {
      const response = await api.patch('/users/profile/password', passwordData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa tài khoản
  async deleteAccount(password) {
    try {
      const response = await api.delete('/users/profile', {
        data: { password }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== ADDRESS MANAGEMENT =====

  // Lấy danh sách địa chỉ
  async getAddresses() {
    try {
      const response = await api.get('/users/addresses')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thêm địa chỉ mới
  async addAddress(addressData) {
    try {
      const response = await api.post('/users/addresses', addressData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật địa chỉ
  async updateAddress(addressId, addressData) {
    try {
      const response = await api.put(`/users/addresses/${addressId}`, addressData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa địa chỉ
  async deleteAddress(addressId) {
    try {
      await api.delete(`/users/addresses/${addressId}`)
      return { message: 'Xóa địa chỉ thành công' }
    } catch (error) {
      throw error
    }
  },

  // Đặt địa chỉ mặc định
  async setDefaultAddress(addressId) {
    try {
      const response = await api.patch(`/users/addresses/${addressId}/default`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== PREFERENCES =====

  // Lấy cài đặt tài khoản
  async getPreferences() {
    try {
      const response = await api.get('/users/preferences')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật cài đặt tài khoản
  async updatePreferences(preferences) {
    try {
      const response = await api.patch('/users/preferences', preferences)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== ADMIN USER MANAGEMENT =====

  // Lấy tất cả người dùng (Admin)
  async getAllUsers(params = {}) {
    try {
      const response = await api.get('/users', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy thông tin user theo ID (Admin)
  async getUserById(userId) {
    try {
      const response = await api.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo user mới (Admin)
  async createUser(userData) {
    try {
      const response = await api.post('/users', userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật thông tin user (Admin)
  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/users/${userId}`, userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa user (Admin)
  async deleteUser(userId) {
    try {
      await api.delete(`/users/${userId}`)
      return { message: 'Xóa người dùng thành công' }
    } catch (error) {
      throw error
    }
  },

  // Bật/tắt user (Admin)
  async toggleUserActive(userId) {
    try {
      const response = await api.patch(`/users/${userId}/toggle-active`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đổi role user (Admin)
  async changeUserRole(userId, role) {
    try {
      const response = await api.patch(`/users/${userId}/role`, { role })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Reset mật khẩu user (Admin)
  async resetUserPassword(userId) {
    try {
      const response = await api.patch(`/users/${userId}/reset-password`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Gửi email xác thực lại (Admin)
  async resendVerificationEmail(userId) {
    try {
      const response = await api.post(`/users/${userId}/resend-verification`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== USER STATISTICS =====

  // Thống kê người dùng (Admin)
  async getUserStatistics(params = {}) {
    try {
      const response = await api.get('/users/statistics', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê hoạt động người dùng (Admin)
  async getUserActivity(userId, params = {}) {
    try {
      const response = await api.get(`/users/${userId}/activity`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xuất báo cáo người dùng (Admin)
  async exportUserReport(params = {}) {
    try {
      const response = await api.get('/users/export', {
        params,
        responseType: 'blob'
      })
      return response
    } catch (error) {
      throw error
    }
  },

  // ===== LOYALTY PROGRAM =====

  // Lấy điểm thưởng
  async getLoyaltyPoints() {
    try {
      const response = await api.get('/users/loyalty/points')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy lịch sử điểm thưởng
  async getLoyaltyHistory(params = {}) {
    try {
      const response = await api.get('/users/loyalty/history', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đổi điểm thưởng
  async redeemPoints(rewardId, points) {
    try {
      const response = await api.post('/users/loyalty/redeem', {
        rewardId,
        points
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== FAVORITES =====

  // Lấy danh sách yêu thích
  async getFavorites() {
    try {
      const response = await api.get('/users/favorites')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thêm vào yêu thích
  async addToFavorites(productId) {
    try {
      const response = await api.post('/users/favorites', { productId })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa khỏi yêu thích
  async removeFromFavorites(productId) {
    try {
      await api.delete(`/users/favorites/${productId}`)
      return { message: 'Đã xóa khỏi danh sách yêu thích' }
    } catch (error) {
      throw error
    }
  }
}