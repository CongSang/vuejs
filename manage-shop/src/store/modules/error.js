const error = {
  namespaced: true,
  state: {
    error: '',
    loading: false
  },
  getters: {
    error: state => state.error,
    loading: state => state.loading
  },
  mutations: {
    ERROR(state, message) {
      state.error = message
    },
    CLEAR_ERROR(state) {
      state.error = ''
    },
    START_LOADING(state) {
      state.loading = true
    },
    STOP_LOADING(state) {
      state.loading = false
    }
  }
}

export default error
