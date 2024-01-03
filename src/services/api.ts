import axios from 'axios';

const url = 'https://api.rawg.io/api/'

const api = axios.create({
    baseURL: url
})

export default api;