import axios from "axios";

const api = axios.create({
  baseURL: "https://api.meoagent.com",
  // baseURL: "https://realtor-production-06d6.up.railway.app",
    // baseURL: "http://127.0.0.1:3001",
});
//teste
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
