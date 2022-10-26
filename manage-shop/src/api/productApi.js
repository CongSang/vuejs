import axiosClient from './axiosClient'

export const getProductsApi = () => {
  return axiosClient.get(`/products`)
}

export const getProductByIdApi = id => {
  return axiosClient.get(`/products/${id}`)
}

export const deleteProductApi = id => {
  return axiosClient.delete(`/products/${id}`)
}

export const updateProductApi = data => {
  return axiosClient.put(`/products/${data.id}`, data)
}

export const addProductApi = data => {
  return axiosClient.post(`/products`, data)
}
