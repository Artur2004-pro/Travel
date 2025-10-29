import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:9999/",
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      config.headers.Authentication = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
