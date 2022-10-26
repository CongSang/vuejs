import {
  getUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi
} from '../../api/userApi'

const user = {
  namespaced: true,
  state: {
    data: []
  },
  getters: {
    users: state => state.data
  },
  actions: {
    async getUsers({ commit }) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await getUsersApi().then(res => {
        commit('SET_DATA', res.data)
      })
    },
    async deleteUser({ commit }, user) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await deleteUserApi(user.id).then(() => {
        commit('DELETE_USER', user.id)
      })
    },
    async updateUser({ commit }, user) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await updateUserApi(user).then(res => {
        commit('EDIT_USER', res.data)
      })
    },
    async addUser({ commit }, user) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await addUserApi(user).then(res => {
        commit('ADD_USER', res.data)
      })
    }
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    },
    DELETE_USER(state, id) {
      state.data = state.data.filter(user => user.id !== id)
    },
    EDIT_USER(state, user) {
      state.data = state.data.map(u => {
        if (u.id === user.id) u = user
        return u
      })
    },
    ADD_USER(state, user) {
      state.data = [...state.data, user]
    }
  }
}

export default user
