import axios from "axios";

const api = axios.create({
  //endpoint local
  // baseURL: "http://localhost:3001",

  //endpoint produção
  baseURL: "https://realtor-production-06d6.up.railway.app",
});

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
