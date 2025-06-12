import axios from 'axios';

const API = axios.create({
    baseURL: 'https://the-zenchat-backend.onrender.com'
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token && req.headers) {
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
});

export default API; 