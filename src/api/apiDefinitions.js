
import { api } from "./api";

const apiDefinitions = {
  getAllProduct: async function () {
    return await api.get(`/api/Product`);
  },
};

export default apiDefinitions;
