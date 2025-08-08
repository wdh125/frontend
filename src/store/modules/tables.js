import { tableService } from '@/services'

const state = {
  tables: [],
  availableTables: [],
  currentTable: null,
  tableUtilization: null,
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
  SET_TABLES(state, tables) {
    state.tables = tables
  },
  SET_AVAILABLE_TABLES(state, tables) {
    state.availableTables = tables
  },
  SET_CURRENT_TABLE(state, table) {
    state.currentTable = table
  },
  SET_TABLE_UTILIZATION(state, utilization) {
    state.tableUtilization = utilization
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  },
  ADD_TABLE(state, table) {
    state.tables.unshift(table)
  },
  UPDATE_TABLE(state, updatedTable) {
    const index = state.tables.findIndex(table => table.id === updatedTable.id)
    if (index !== -1) {
      state.tables.splice(index, 1, updatedTable)
    }
    
    const availableIndex = state.availableTables.findIndex(table => table.id === updatedTable.id)
    if (availableIndex !== -1) {
      state.availableTables.splice(availableIndex, 1, updatedTable)
    }
    
    if (state.currentTable && state.currentTable.id === updatedTable.id) {
      state.currentTable = updatedTable
    }
  },
  REMOVE_TABLE(state, tableId) {
    state.tables = state.tables.filter(table => table.id !== tableId)
    state.availableTables = state.availableTables.filter(table => table.id !== tableId)
    if (state.currentTable && state.currentTable.id === tableId) {
      state.currentTable = null
    }
  }
}

const actions = {
  async fetchAllTables({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await tableService.getAllTables(params)
      commit('SET_TABLES', response.data || response)
      
      if (response.pagination) {
        commit('SET_PAGINATION', response.pagination)
      }
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchAvailableTables({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await tableService.getAvailableTables(params)
      commit('SET_AVAILABLE_TABLES', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchTableById({ commit }, tableId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await tableService.getTableById(tableId)
      commit('SET_CURRENT_TABLE', response.data || response)
      
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
      
      const response = await tableService.createTable(tableData)
      commit('ADD_TABLE', response.data || response)
      
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
      
      const response = await tableService.updateTable(tableId, tableData)
      commit('UPDATE_TABLE', response.data || response)
      
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
      
      await tableService.deleteTable(tableId)
      commit('REMOVE_TABLE', tableId)
      
      return { success: true }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async toggleTableActive({ commit }, tableId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await tableService.toggleTableActive(tableId)
      commit('UPDATE_TABLE', response.data || response)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async checkTableStatus({ commit }, { tableId, dateTime }) {
    try {
      commit('SET_ERROR', null)
      
      const response = await tableService.checkTableStatus(tableId, dateTime)
      
      return response
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async fetchTableUtilization({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      const response = await tableService.getTableUtilization(params)
      commit('SET_TABLE_UTILIZATION', response.data || response)
      
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
  tables: state => state.tables,
  availableTables: state => state.availableTables,
  currentTable: state => state.currentTable,
  tableUtilization: state => state.tableUtilization,
  pagination: state => state.pagination,
  loading: state => state.loading,
  error: state => state.error,
  
  activeTables: state => state.tables.filter(table => table.active),
  inactiveTables: state => state.tables.filter(table => !table.active),
  
  // Get tables by capacity
  tablesByCapacity: state => capacity => 
    state.tables.filter(table => table.capacity >= capacity),
  
  // Get table by number
  getTableByNumber: state => number => 
    state.tables.find(table => table.number === number)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}