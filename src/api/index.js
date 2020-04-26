import axios from 'axios';
import {baseURL} from '@/libs/config.js';

const server = axios.create({
  baseURL,
  timeout: 1000,
  headers: {'X-Agent': 'Juejin/Web'}
});

server.interceptors.response.use(
  res => {
    return res.data
  }
)

export default server