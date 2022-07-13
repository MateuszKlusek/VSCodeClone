import axios from 'axios';
var BASE_URL = ""
process.env.NODE_ENV !== 'production' ? BASE_URL = "http://localhost:5001" : BASE_URL = "https://vscodeclone.com/api"

// for non-auth routes
export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});