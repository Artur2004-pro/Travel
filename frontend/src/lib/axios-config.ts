import axios from "axios";

export const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_APP_DOMAIN}/`,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
