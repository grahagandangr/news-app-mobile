import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com',
  baseURL: 'https://newsapi.org/v2/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '13277aff24414254ab58d943ac7d4e46',
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
