import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://api-mto.herokuapp.com'
})

export default api;
