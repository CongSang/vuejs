import {
  getProductsApi,
  deleteProductApi,
  updateProductApi,
  addProductApi
} from '../../api/productApi'

const product = {
  namespaced: true,
  state: {
    data: [],
    totalRecords: 20
  },
  getters: {
    products: state => state.data,
    totalRecords: state => state.totalRecords
  },
  actions: {
    async getProducts({ commit }) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await getProductsApi().then(res => {
        commit('SET_DATA', res.data)
      })
    },
    async deleteProduct({ commit }, product) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await deleteProductApi(product.id).then(() => {
        commit('DELETE_PROD', product.id)
      })
    },
    async updateProduct({ commit }, product) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await updateProductApi(product).then(res => {
        commit('EDIT_PROD', res.data)
      })
    },
    async addProduct({ commit }, product) {
      commit('error/CLEAR_ERROR', null, { root: true })
      commit('error/START_LOADING', null, { root: true })
      await addProductApi(product).then(res => {
        commit('ADD_PROD', res.data)
      })
    }
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    },
    CLEAR_DATA(state) {
      state.data = []
    },
    DELETE_PROD(state, id) {
      state.data = state.data.filter(product => product.id !== id)
    },
    EDIT_PROD(state, product) {
      state.data = state.data.map(prod => {
        if (prod.id === product.id) prod = product
        return prod
      })
    },
    ADD_PROD(state, product) {
      state.data = [...state.data, product]
    }
  }
}

export default product
