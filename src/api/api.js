import axios from "axios";

const BaseURL = "127.0.0.1:5175";

export const api = axios.create({
  baseURL: BaseURL,
});
