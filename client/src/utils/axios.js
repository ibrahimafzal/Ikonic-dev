import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api/'

axios.interceptors.request.use(
    config => {
        const excludedEndpoints = ['/login', '/register'];

        if (excludedEndpoints.some(endpoint => config.url.includes(endpoint))) {
            // Do not set the Authorization header for excluded API endpoints
            return config;
        }
        
        const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
        config.headers['Authorization'] = `Bearer ${getTokenFromLocalStorage?.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;