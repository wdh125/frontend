import api from './api'

export const productService = {
  // ===== ADMIN APIs =====

  // Lấy tất cả sản phẩm (Admin)
  async getAllProducts(params = {}) {
    try {
      const response = await api.get('/products', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy sản phẩm theo ID (Admin)
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo sản phẩm mới (Admin)
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật sản phẩm (Admin)
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Xóa sản phẩm (Admin)
  async deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`)
      return { message: 'Xóa sản phẩm thành công' }
    } catch (error) {
      throw error
    }
  },

  // Bật/tắt sản phẩm (Admin)
  async toggleProductAvailable(id) {
    try {
      const response = await api.patch(`/products/${id}/toggle-available`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Sắp xếp lại sản phẩm (Admin)
  async reorderProducts(reorderList) {
    try {
      const response = await api.patch('/products/reorder', reorderList)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== CUSTOMER APIs =====

  // Lấy sản phẩm có sẵn (Customer)
  async getAvailableProducts(params = {}) {
    try {
      const response = await api.get('/products/available', { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy sản phẩm theo danh mục (Customer)
  async getProductsByCategory(categoryId, params = {}) {
    try {
      const response = await api.get(`/products/category/${categoryId}`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tìm kiếm sản phẩm (Customer)
  async searchProducts(query, params = {}) {
    try {
      const response = await api.get('/products/search', { 
        params: { query, ...params }
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy sản phẩm nổi bật (Customer)
  async getFeaturedProducts() {
    try {
      const response = await api.get('/products/featured')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy sản phẩm mới nhất (Customer)
  async getLatestProducts(limit = 10) {
    try {
      const response = await api.get('/products/latest', { params: { limit } })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy sản phẩm bán chạy (Customer)
  async getBestSellingProducts(limit = 10) {
    try {
      const response = await api.get('/products/best-selling', { params: { limit } })
      return response.data
    } catch (error) {
      throw error
    }
  }
}
