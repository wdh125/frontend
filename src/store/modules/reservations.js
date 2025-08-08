import { reservationService } from '@/services'

const state = {
  reservations: [],
  myReservations: [],
  currentReservation: null,
  tables: [],
  availableTables: [],
  availableTimeSlots: [],
  reservationSettings: {},
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
  SET_RESERVATIONS(state, reservations) {
    state.reservations = reservations
  },
  SET_MY_RESERVATIONS(state, reservations) {
    state.myReservations = reservations
  },
  SET_CURRENT_RESERVATION(state, reservation) {
    state.currentReservation = reservation
  },
  SET_TABLES(state, tables) {
    state.tables = tables
  },
  SET_AVAILABLE_TABLES(state, tables) {
    state.availableTables = tables
  },
  SET_AVAILABLE_TIME_SLOTS(state, slots) {
    state.availableTimeSlots = slots
  },
  SET_RESERVATION_SETTINGS(state, settings) {
    state.reservationSettings = settings
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  },
  ADD_RESERVATION(state, reservation) {
    state.myReservations.unshift(reservation)
  },
  UPDATE_RESERVATION(state, updatedReservation) {
    const index = state.reservations.findIndex(res => res.id === updatedReservation.id)
    if (index !== -1) {
      state.reservations.splice(index, 1, updatedReservation)
    }
    
    const myResIndex = state.myReservations.findIndex(res => res.id === updatedReservation.id)
    if (myResIndex !== -1) {
      state.myReservations.splice(myResIndex, 1, updatedReservation)
    }
    
    if (state.currentReservation && state.currentReservation.id === updatedReservation.id) {
      state.currentReservation = updatedReservation
    }
  },
  ADD_TABLE(state, table) {
    state.tables.push(table)
  },
  UPDATE_TABLE(state, updatedTable) {
    const index = state.tables.findIndex(table => table.id === updatedTable.id)
    if (index !== -1) {
      state.tables.splice(index, 1, updatedTable)
    }
  },
  REMOVE_TABLE(state, tableId) {
    state.tables = state.tables.filter(table => table.id !== tableId)
  }
}

const actions = {
  async createReservation({ commit }, reservationData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.createReservation(reservationData)
      commit('ADD_RESERVATION', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchMyReservations({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.getMyReservations(params)
      commit('SET_MY_RESERVATIONS', response.data.reservations || response.data)
      
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

  async fetchReservationById({ commit }, reservationId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.getReservationById(reservationId)
      commit('SET_CURRENT_RESERVATION', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateReservation({ commit }, { reservationId, updateData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.updateReservation(reservationId, updateData)
      commit('UPDATE_RESERVATION', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async cancelReservation({ commit }, { reservationId, reason }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.cancelReservation(reservationId, reason)
      commit('UPDATE_RESERVATION', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async confirmAttendance({ commit }, reservationId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.confirmAttendance(reservationId)
      commit('UPDATE_RESERVATION', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async checkTableAvailability({ commit }, params) {
    try {
      commit('SET_ERROR', null)
      
      const response = await reservationService.checkTableAvailability(params)
      commit('SET_AVAILABLE_TABLES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async fetchAvailableTimeSlots({ commit }, params) {
    try {
      commit('SET_ERROR', null)
      
      const response = await reservationService.getAvailableTimeSlots(params)
      commit('SET_AVAILABLE_TIME_SLOTS', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async fetchReservationSettings({ commit }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await reservationService.getReservationSettings()
      commit('SET_RESERVATION_SETTINGS', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  // Admin actions
  async fetchAllReservations({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.getAllReservations(params)
      commit('SET_RESERVATIONS', response.data.reservations || response.data)
      
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

  async updateReservationStatus({ commit }, { reservationId, status }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.updateReservationStatus(reservationId, status)
      commit('UPDATE_RESERVATION', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchAllTables({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.getAllTables()
      commit('SET_TABLES', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createTable({ commit }, tableData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.createTable(tableData)
      commit('ADD_TABLE', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateTable({ commit }, { tableId, tableData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await reservationService.updateTable(tableId, tableData)
      commit('UPDATE_TABLE', response.data)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteTable({ commit }, tableId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      await reservationService.deleteTable(tableId)
      commit('REMOVE_TABLE', tableId)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  reservations: state => state.reservations,
  myReservations: state => state.myReservations,
  currentReservation: state => state.currentReservation,
  tables: state => state.tables,
  availableTables: state => state.availableTables,
  availableTimeSlots: state => state.availableTimeSlots,
  reservationSettings: state => state.reservationSettings,
  pagination: state => state.pagination,
  loading: state => state.loading,
  error: state => state.error,
  
  pendingReservations: state => state.myReservations.filter(res => 
    res.status === 'pending'
  ),
  
  confirmedReservations: state => state.myReservations.filter(res => 
    res.status === 'confirmed'
  ),
  
  completedReservations: state => state.myReservations.filter(res => 
    res.status === 'completed'
  ),
  
  cancelledReservations: state => state.myReservations.filter(res => 
    res.status === 'cancelled'
  ),

  activeTables: state => state.tables.filter(table => table.isActive),
  
  upcomingReservations: state => {
    const now = new Date()
    return state.myReservations.filter(res => {
      const reservationDate = new Date(res.reservationDate)
      return reservationDate > now && ['confirmed', 'pending'].includes(res.status)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}