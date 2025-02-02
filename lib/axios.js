import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.EXPO_PUBLIC_NEWS_API_KEY || '183daca270264bad86fc5b72972fb82a',
  },
});

export default axiosInstance;
