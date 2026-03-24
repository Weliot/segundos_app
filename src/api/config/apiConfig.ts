import axios from 'axios';

const apiSegundos = axios.create({
  baseURL: 'http://localhost:8080/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
});

export default apiSegundos;