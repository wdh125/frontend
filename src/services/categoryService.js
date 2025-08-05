import api from './api'

export const categoryService = {
  // ===== ADMIN APIs =====

  // Lấy tất cả danh mục (Admin)
  async getAllCategories() {
    try {
      const response = await api.get('/categories')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy danh mục theo ID (Admin)
  async getCategoryById(id) {
    try {
      const response = await api.get(`/categories/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy sản phẩm theo danh mục (Admin)
  async getProductsByCategory(id) {
    try {
      const response = await api.get(`/categories/${id}/products`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Tạo danh mục mới (Admin)
  async createCategory(categoryData) {
    try {
      const response = await api.post('/categories', categoryData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Cập nhật danh mục (Admin)
  async updateCategory(id, categoryData) {
    try {
      const response = await api.put(`/categories/${id}`, categoryData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Bật/tắt danh mục (Admin)
  async toggleCategoryActive(id) {
    try {
      const response = await api.patch(`/categories/${id}/toggle-active`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Sắp xếp lại danh mục (Admin)
  async reorderCategories(reorderList) {
    try {
      const response = await api.patch('/categories/reorder', reorderList)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Thống kê danh mục (Admin)
  async getCategoryStatistics() {
    try {
      const response = await api.get('/categories/statistics')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // ===== CUSTOMER APIs =====

  // Lấy danh mục đang hoạt động (Customer)
  async getActiveCategories() {
    try {
      const response = await api.get('/categories/active')
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Lấy menu (Customer)
  async getMenu() {
    try {
      const response = await api.get('/categories/menu')
      return response.data
    } catch (error) {
      throw error
    }
  }
}
