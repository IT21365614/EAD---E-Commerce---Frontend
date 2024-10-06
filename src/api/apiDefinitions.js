import { get } from "jquery";
import { api } from "./api";

const apiDefinitions = {
  login: async function (payload) {
    return await api.post(`/api/User/login`, payload);
  },

  // Category API Definitions
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
  updateCategory: async function (categoryId, payload) {
    return await api.put(`/api/Category/${categoryId}`, payload);
  },
  deleteCategory: async function (categoryId) {
    return await api.delete(`/api/Category/${categoryId}`);
  },

  //Product List API Definitions
  getProductList: async function (vendorID) {
    return await api.get(`/api/Product/vendor/${vendorID}`);
  },
  createProduct: async function (payload) {
    return await api.post(`/api/Product`, payload);
  },
  getProductById: async function (productId) {
    return await api.get(`/api/Product/${productId}`);
  },
  updateProduct: async function (productId, payload) {
    return await api.put(`/api/Product/${productId}`, payload);
  },
  deleteProduct: async function (productId) {
    return await api.delete(`/api/Product/${productId}`);
  },
  restockProduct: async function (productId, payload) {
    return await api.put(`/api/Product/restock/${productId}`, payload);
  },
  getProductListingByVendor: async function (vendorId) {
    return await api.get(`/api/ProductListing/vendor/${vendorId}`);
  },
  productReadyStatus: async function (productId) {
    return await api.put(`/api/ProductListing/${productId}/ready`);
  },
  productDeliveredStatus: async function (productId) {
    return await api.put(`/api/ProductListing/${productId}/delivered`);
  },
  getAllOrderList: async function () {
    return await api.get(`/api/Order`);
  },
  adminProductDeliveryStatus: async function (productId) {
    return await api.put(`/api/Order/deliver/${productId}`);
  },
  adminCancelOrder: async function (productId) {
    return await api.put(`/api/Order/cancel/${productId}`);
  },

  //Vendor API Definitions
  createVendor: async function (payload) {
    return await api.post(`/api/User`, payload);
  },
  getVendorList: async function () {
    return await api.get(`/api/User/vendors`);
  },
};

export default apiDefinitions;
