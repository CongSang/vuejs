import axios from 'axios'
import { API_URL } from '../utils/constant'
import store from '../store/index'

const axiosClient = axios.create({
  baseURL: API_URL
})

axiosClient.interceptors.request.use(async config => {
  return config
})

axiosClient.interceptors.response.use(
  response => {
    store.commit('error/STOP_LOADING')
    return response
  },
  error => {
    store.commit('error/ERROR', error.response)
    store.commit('error/STOP_LOADING')
    return Promise.reject(error)
  }
)

export const setAuthToken = token => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosClient.defaults.headers.common['Authorization']
  }
}

export default axiosClient
