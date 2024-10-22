import axios from 'axios';

const api = axios.create({
  baseURL: 'https://simple-ecommerce-p704.onrender.com/api', // Atualize com a URL da sua API
});

export default api;
