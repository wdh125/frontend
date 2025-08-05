import api from './api'

export const authService = {
  // Đăng nhập
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      const { accessToken, refreshToken, username, role } = response.data

      // Lưu token vào localStorage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify({ username, role }))

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
        // Sử dụng responseType: 'text' để tránh lỗi JSON parsing
        await api.post('/auth/logout', { refreshToken }, {
          responseType: 'text'
        })
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
    return user && user.role === 'ROLE_ADMIN'
  },

  // Kiểm tra user có role customer không
  isCustomer() {
    const user = this.getCurrentUser()
    return user && user.role === 'ROLE_CUSTOMER'
  }
}
