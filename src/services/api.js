import axios from 'axios'
import Swal from 'sweetalert2'

// Tạo axios instance với cấu hình mặc định
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - xử lý response và error
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Thử refresh token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post('http://localhost:8080/api/auth/refresh', {
            refreshToken: refreshToken
          })

          const { accessToken } = response.data
          localStorage.setItem('accessToken', accessToken)

          // Retry request với token mới
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh token cũng hết hạn, logout user
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')

        Swal.fire({
          icon: 'error',
          title: 'Phiên đăng nhập hết hạn',
          text: 'Vui lòng đăng nhập lại',
          confirmButtonText: 'Đăng nhập'
        }).then(() => {
          window.location.href = '/login'
        })
      }
    }

    // Xử lý các lỗi khác - kiểm tra responseType trước khi parse JSON
    let message = 'Có lỗi xảy ra'

    if (error.response?.data) {
      // Nếu responseType là text, sử dụng data trực tiếp
      if (typeof error.response.data === 'string') {
        message = error.response.data
      } else if (error.response.data.message) {
        message = error.response.data.message
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Lỗi',
      text: message,
      confirmButtonText: 'Đóng'
    })

    return Promise.reject(error)
  }
)

export default api
