import axios from 'axios';

const request = axios.create({
  baseURL: 'http://1.94.180.222:8000',
  timeout: 5000000000000000
});

export default request