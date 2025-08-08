import { orderService } from '@/services'

const state = {
  orders: [],
  myOrders: [],
  currentOrder: null,
  orderHistory: [],
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
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  SET_MY_ORDERS(state, orders) {
    state.myOrders = orders
  },
  SET_CURRENT_ORDER(state, order) {
    state.currentOrder = order
  },
  SET_ORDER_HISTORY(state, history) {
    state.orderHistory = history
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  },
  ADD_ORDER(state, order) {
    state.myOrders.unshift(order)
  },
  UPDATE_ORDER(state, updatedOrder) {
    const index = state.orders.findIndex(order => order.id === updatedOrder.id)
    if (index !== -1) {
      state.orders.splice(index, 1, updatedOrder)
    }
    
    const myOrderIndex = state.myOrders.findIndex(order => order.id === updatedOrder.id)
    if (myOrderIndex !== -1) {
      state.myOrders.splice(myOrderIndex, 1, updatedOrder)
    }
    
    if (state.currentOrder && state.currentOrder.id === updatedOrder.id) {
      state.currentOrder = updatedOrder
    }
  },
  REMOVE_ORDER(state, orderId) {
    state.orders = state.orders.filter(order => order.id !== orderId)
    state.myOrders = state.myOrders.filter(order => order.id !== orderId)
    if (state.currentOrder && state.currentOrder.id === orderId) {
      state.currentOrder = null
    }
  }
}

const actions = {
  async createOrder({ commit }, orderData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.createOrder(orderData)
      commit('ADD_ORDER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchMyOrders({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.getMyOrders(params)
      commit('SET_MY_ORDERS', response.data.orders || response.data)
      
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

  async fetchOrderById({ commit }, orderId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.getOrderById(orderId)
      commit('SET_CURRENT_ORDER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async cancelOrder({ commit }, { orderId, reason }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.cancelOrder(orderId, reason)
      commit('UPDATE_ORDER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async confirmReceived({ commit }, orderId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.confirmReceived(orderId)
      commit('UPDATE_ORDER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async rateOrder({ commit }, { orderId, rating, comment }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.rateOrder(orderId, rating, comment)
      commit('UPDATE_ORDER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Admin actions
  async fetchAllOrders({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.getAllOrders(params)
      commit('SET_ORDERS', response.data.orders || response.data)
      
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

  async updateOrderStatus({ commit }, { orderId, status }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.updateOrderStatus(orderId, status)
      commit('UPDATE_ORDER', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async trackOrder({ commit }, trackingNumber) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await orderService.trackOrder(trackingNumber)
      
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
  orders: state => state.orders,
  myOrders: state => state.myOrders,
  currentOrder: state => state.currentOrder,
  orderHistory: state => state.orderHistory,
  pagination: state => state.pagination,
  loading: state => state.loading,
  error: state => state.error,
  
  pendingOrders: state => state.myOrders.filter(order => 
    ['pending', 'confirmed', 'preparing'].includes(order.status)
  ),
  
  completedOrders: state => state.myOrders.filter(order => 
    ['delivered', 'completed'].includes(order.status)
  ),
  
  cancelledOrders: state => state.myOrders.filter(order => 
    order.status === 'cancelled'
  )
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}