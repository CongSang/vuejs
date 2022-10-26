import { createStore } from 'vuex'
import auth from './modules/auth'
import product from './modules/product'
import user from './modules/user'
import error from './modules/error'

const store = createStore({
  modules: {
    error,
    auth,
    user,
    product
  }
})

export default store
