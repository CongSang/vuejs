import axiosClient from './axiosClient'

export const getUsersApi = () => {
  return axiosClient.get(`/users`)
}

export const deleteUserApi = id => {
  return axiosClient.delete(`/users/${id}`)
}

export const updateUserApi = data => {
  return axiosClient.put(`/users/${data.id}`, data)
}

export const addUserApi = data => {
  return axiosClient.post(`/users`, data)
}
