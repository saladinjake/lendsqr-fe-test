import axios from "axios";
import { deleteToken } from "../utils/tokenConfig";

let token;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_KUDA_ACADEMY_API_URL,
  headers: {
    "Content-Type": "application/json",
    clientId: process.env.REACT_APP_CLIENT_ID,
  },
});




axiosInstance.interceptors.request.use(
  function (config) {
    token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);





// DELETE EXPIRED TOKEN
axiosInstance.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      deleteToken();
    }

    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      deleteToken();
      //window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
