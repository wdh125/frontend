import { paymentService } from '@/services'

const state = {
  payments: [],
  myPayments: [],
  currentPayment: null,
  paymentMethods: [],
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
  SET_PAYMENTS(state, payments) {
    state.payments = payments
  },
  SET_MY_PAYMENTS(state, payments) {
    state.myPayments = payments
  },
  SET_CURRENT_PAYMENT(state, payment) {
    state.currentPayment = payment
  },
  SET_PAYMENT_METHODS(state, methods) {
    state.paymentMethods = methods
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  },
  ADD_PAYMENT(state, payment) {
    state.myPayments.unshift(payment)
  },
  UPDATE_PAYMENT(state, updatedPayment) {
    const index = state.payments.findIndex(payment => payment.id === updatedPayment.id)
    if (index !== -1) {
      state.payments.splice(index, 1, updatedPayment)
    }
    
    const myPaymentIndex = state.myPayments.findIndex(payment => payment.id === updatedPayment.id)
    if (myPaymentIndex !== -1) {
      state.myPayments.splice(myPaymentIndex, 1, updatedPayment)
    }
    
    if (state.currentPayment && state.currentPayment.id === updatedPayment.id) {
      state.currentPayment = updatedPayment
    }
  }
}

const actions = {
  async createPayment({ commit }, paymentData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.createPayment(paymentData)
      commit('ADD_PAYMENT', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchMyPayments({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.getMyPayments(params)
      commit('SET_MY_PAYMENTS', response.data.payments || response.data)
      
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

  async fetchPaymentById({ commit }, paymentId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.getPaymentById(paymentId)
      commit('SET_CURRENT_PAYMENT', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async confirmPayment({ commit }, { paymentId, confirmationData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.confirmPayment(paymentId, confirmationData)
      commit('UPDATE_PAYMENT', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async cancelPayment({ commit }, { paymentId, reason }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.cancelPayment(paymentId, reason)
      commit('UPDATE_PAYMENT', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async requestRefund({ commit }, { paymentId, reason, amount }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.requestRefund(paymentId, reason, amount)
      commit('UPDATE_PAYMENT', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async payWithVNPay({ commit }, orderData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.payWithVNPay(orderData)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async payWithMoMo({ commit }, orderData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.payWithMoMo(orderData)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async payWithCash({ commit }, orderData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.payWithCash(orderData)
      commit('ADD_PAYMENT', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchPaymentMethods({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await paymentService.getPaymentMethods()
      commit('SET_PAYMENT_METHODS', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async checkPaymentStatus({ commit }, paymentId) {
    try {
      commit('SET_ERROR', null)
      
      const response = await paymentService.checkPaymentStatus(paymentId)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  // Admin actions
  async fetchAllPayments({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.getAllPayments(params)
      commit('SET_PAYMENTS', response.data.payments || response.data)
      
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

  async updatePaymentStatus({ commit }, { paymentId, status }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await paymentService.updatePaymentStatus(paymentId, status)
      commit('UPDATE_PAYMENT', response.data)
      
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
  payments: state => state.payments,
  myPayments: state => state.myPayments,
  currentPayment: state => state.currentPayment,
  paymentMethods: state => state.paymentMethods,
  pagination: state => state.pagination,
  loading: state => state.loading,
  error: state => state.error,
  
  successfulPayments: state => state.myPayments.filter(payment => 
    payment.status === 'completed'
  ),
  
  pendingPayments: state => state.myPayments.filter(payment => 
    payment.status === 'pending'
  ),
  
  failedPayments: state => state.myPayments.filter(payment => 
    payment.status === 'failed'
  ),

  totalPaid: state => state.myPayments
    .filter(payment => payment.status === 'completed')
    .reduce((total, payment) => total + payment.amount, 0)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}