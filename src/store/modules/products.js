import { productService } from '@/services'

export default {
  namespaced: true,

  state: {
    products: [],
    availableProducts: [],
    currentProduct: null,
    loading: false,
    error: null
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_AVAILABLE_PRODUCTS(state, products) {
      state.availableProducts = products
    },
    SET_CURRENT_PRODUCT(state, product) {
      state.currentProduct = product
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct)
      }
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
    }
  },

  actions: {
    // Lấy tất cả sản phẩm (Admin)
    async fetchAllProducts({ commit }, params = {}) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const products = await productService.getAllProducts(params)
        commit('SET_PRODUCTS', products)
        return products
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Lấy sản phẩm có sẵn (Customer)
    async fetchAvailableProducts({ commit }, params = {}) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const products = await productService.getAvailableProducts(params)
        commit('SET_AVAILABLE_PRODUCTS', products)
        return products
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Lấy sản phẩm theo ID
    async fetchProductById({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const product = await productService.getProductById(id)
        commit('SET_CURRENT_PRODUCT', product)
        return product
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Tạo sản phẩm mới
    async createProduct({ commit }, productData) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const product = await productService.createProduct(productData)
        commit('ADD_PRODUCT', product)
        return product
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Cập nhật sản phẩm
    async updateProduct({ commit }, { id, productData }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const product = await productService.updateProduct(id, productData)
        commit('UPDATE_PRODUCT', product)
        return product
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Xóa sản phẩm
    async deleteProduct({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        await productService.deleteProduct(id)
        commit('DELETE_PRODUCT', id)
        return { message: 'Xóa sản phẩm thành công' }
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Bật/tắt sản phẩm
    async toggleProductAvailable({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const product = await productService.toggleProductAvailable(id)
        commit('UPDATE_PRODUCT', product)
        return product
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  getters: {
    allProducts: state => state.products,
    availableProducts: state => state.availableProducts,
    currentProduct: state => state.currentProduct,
    isLoading: state => state.loading,
    error: state => state.error,
    productById: state => id => state.products.find(p => p.id === id)
  }
}
