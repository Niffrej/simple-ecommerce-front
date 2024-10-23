import axios from 'axios';

const api = axios.create({
  baseURL: 'https://simple-ecommerce-green.vercel.app/api', 
});

export default api;
