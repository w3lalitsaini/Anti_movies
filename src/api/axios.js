import axios from "axios";

import siteConfig from "../config/siteConfig";

const API = axios.create({
  baseURL: siteConfig.baseUrl,
});

API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
