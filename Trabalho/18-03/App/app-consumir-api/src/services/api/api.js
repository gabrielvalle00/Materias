import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.175:3100'
});

export default api;