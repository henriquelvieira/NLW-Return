import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://nlw-return-production-5fc3.up.railway.app',
});