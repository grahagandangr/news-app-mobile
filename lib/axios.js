import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '13277aff24414254ab58d943ac7d4e46',
  },
});

export default axiosInstance;
