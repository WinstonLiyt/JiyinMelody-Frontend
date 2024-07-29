import axios from 'axios';

const request = axios.create({
  baseURL: 'https://www.tjeatwhat.cn',
  timeout: 5000
});

export default request