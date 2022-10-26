import axiosClient from './axiosClient'

export const loginApi = data => {
  return axiosClient.post('/login', data)
}

export const getInfoUserApi = id => {
  return axiosClient.get(`/users/${id}`)
}
