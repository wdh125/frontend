import { categoryService } from '@/services'

const state = {
  categories: [],
  menuCategories: [],
  currentCategory: null,
  pagination: {
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0
  },
  loading: false,
  error: null
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_MENU_CATEGORIES(state, categories) {
    state.menuCategories = categories
  },
  SET_CURRENT_CATEGORY(state, category) {
    state.currentCategory = category
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  },
  ADD_CATEGORY(state, category) {
    state.categories.push(category)
  },
  UPDATE_CATEGORY(state, updatedCategory) {
    const index = state.categories.findIndex(cat => cat.id === updatedCategory.id)
    if (index !== -1) {
      state.categories.splice(index, 1, updatedCategory)
    }
    
    if (state.currentCategory && state.currentCategory.id === updatedCategory.id) {
      state.currentCategory = updatedCategory
    }
  },
  REMOVE_CATEGORY(state, categoryId) {
    state.categories = state.categories.filter(cat => cat.id !== categoryId)
    if (state.currentCategory && state.currentCategory.id === categoryId) {
      state.currentCategory = null
    }
  },
  REORDER_CATEGORIES(state, reorderedCategories) {
    state.categories = reorderedCategories
  }
}

const actions = {
  async fetchAllCategories({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await categoryService.getAllCategories(params)
      commit('SET_CATEGORIES', response.data.categories || response.data)
      
      if (response.data.pagination) {
        commit('SET_PAGINATION', response.data.pagination)
      }
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchMenuCategories({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await categoryService.getMenu()
      commit('SET_MENU_CATEGORIES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async fetchCategoryById({ commit }, categoryId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await categoryService.getCategoryById(categoryId)
      commit('SET_CURRENT_CATEGORY', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createCategory({ commit }, categoryData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await categoryService.createCategory(categoryData)
      commit('ADD_CATEGORY', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateCategory({ commit }, { id, categoryData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await categoryService.updateCategory(id, categoryData)
      commit('UPDATE_CATEGORY', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteCategory({ commit }, categoryId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      await categoryService.deleteCategory(categoryId)
      commit('REMOVE_CATEGORY', categoryId)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async toggleCategoryActive({ commit }, categoryId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await categoryService.toggleCategoryActive(categoryId)
      commit('UPDATE_CATEGORY', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async reorderCategories({ commit }, reorderList) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await categoryService.reorderCategories(reorderList)
      commit('REORDER_CATEGORIES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchProductsByCategory({ commit }, { categoryId, params = {} }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await categoryService.getProductsByCategory(categoryId, params)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  categories: state => state.categories,
  menuCategories: state => state.menuCategories,
  currentCategory: state => state.currentCategory,
  pagination: state => state.pagination,
  loading: state => state.loading,
  error: state => state.error,
  
  activeCategories: state => state.categories.filter(cat => cat.isActive),
  
  categoriesWithProducts: state => state.categories.filter(cat => 
    cat.productCount && cat.productCount > 0
  ),
  
  categoriesByOrder: state => [...state.categories].sort((a, b) => 
    (a.sortOrder || 0) - (b.sortOrder || 0)
  )
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}