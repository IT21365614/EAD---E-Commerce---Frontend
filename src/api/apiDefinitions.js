import { api } from "./api";

const apiDefinitions = {
  login: async function (payload) {
    return await api.post(`/api/User/login`, payload);
  },
  getAllProduct: async function () {
    return await api.get(`/api/Product`);
  },
  createCategory: async function (payload) {
    return await api.post(`/api/Category`, payload);
  },
  getCategoryList: async function () {
    return await api.get(`/api/Category`);
  },
  disableCategory: async function (categoryId) {
    return await api.put(`/api/Category/disable/${categoryId}`);
  },
  enableCategory: async function (categoryId) {
    return await api.put(`/api/Category/enable/${categoryId}`);
  },
};

export default apiDefinitions;
