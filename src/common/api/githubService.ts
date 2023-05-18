import axios from 'axios';

export const githubService = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 20000,
});
