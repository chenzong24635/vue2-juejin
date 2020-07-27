import axios from 'axios';
import axiosRetry from 'axios-retry';
import {baseURL} from '@/libs/config';

const server = axios.create({
  baseURL,
  timeout: 1000,
  // retry: 3,
  // retryDelay: 1000,
  headers: {
    // 'Content-Type': 'json',
    'X-Agent': 'Juejin/Web',
    'X-Juejin-Src': 'web'
  }
});
// console.log(server);
axiosRetry(server, { retries: 3 });

server.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});


server.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default server