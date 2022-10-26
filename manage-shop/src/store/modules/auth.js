// import { loginApi } from '../../api/authApi'
import { setAuthToken } from '../../api/axiosClient'
import { setToken, removeToken } from '../../utils/constant'
import { loginApi, getInfoUserApi } from '../../api/authApi'

const auth = {
  namespaced: true,
  state: {
    data: {},
    isAuthenticated: false
  },
  getters: {
    user: state => state.data,
    isAuthenticated: state => state.isAuthenticated
  },
  actions: {
    async loginByToken({ commit, dispatch }, userId) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await getInfoUserApi(userId)
        .then(res => {
          commit('LOGIN_SUCCESS', res.data)
        })
        .catch(() => {
          dispatch('logout')
        })
    },
    async login({ commit }, data) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await loginApi(data)
        .then(res => {
          commit('LOGIN_SUCCESS', res.data)
          setAuthToken(res.data.accessToken)
          setToken({ token: res.data.accessToken, id: res.data.user.id })
        })
        .catch(() => {
          commit('LOGIN_FAILED')
        })
    },
    logout({ commit }) {
      commit('LOGOUT')
      setAuthToken()
      removeToken()
    }
  },
  mutations: {
    LOGIN_SUCCESS(state, data) {
      state.data = data
      state.isAuthenticated = true
    },
    LOGOUT(state) {
      state.data = {}
      state.isAuthenticated = false
    },
    LOGIN_FAILED(state) {
      state.data = {}
      state.isAuthenticated = false
    }
  }
}

export default auth
