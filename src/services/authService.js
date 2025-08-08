import api from './api'

export const authService = {
  // Đăng nhập
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      const { accessToken, refreshToken, user } = response.data

      // Lưu token và thông tin user vào localStorage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đăng ký
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đăng xuất
  async logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken })
      }

      // Xóa token khỏi localStorage
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')

      return { message: 'Đăng xuất thành công' }
    } catch (error) {
      // Vẫn xóa token ngay cả khi API lỗi
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      throw error
    }
  },

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('Không có refresh token')
      }

      const response = await api.post('/auth/refresh', { refreshToken })
      const { accessToken } = response.data

      localStorage.setItem('accessToken', accessToken)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Quên mật khẩu
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đặt lại mật khẩu
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xác thực email
  async verifyEmail(token) {
    try {
      const response = await api.post('/auth/verify-email', { token })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Gửi lại email xác thực
  async resendVerificationEmail(email) {
    try {
      const response = await api.post('/auth/resend-verification', { email })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Đổi mật khẩu
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Kiểm tra user đã đăng nhập chưa
  isAuthenticated() {
    const token = localStorage.getItem('accessToken')
    return !!token
  },

  // Lấy thông tin user hiện tại
  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Kiểm tra user có role admin không
  isAdmin() {
    const user = this.getCurrentUser()
    return user && user.role === 'ADMIN'
  },

  // Kiểm tra user có role customer không
  isCustomer() {
    const user = this.getCurrentUser()
    return user && user.role === 'USER'
  },

  // Lấy token hiện tại
  getToken() {
    return localStorage.getItem('accessToken')
  },

  // Lấy refresh token
  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }
}
