import axios from "axios";

export const API_URL = 'https://api.kinopoisk.dev/';

const TOKEN = 'CA171WC-KR34TR8-K3MYFGQ-XFA0FQQ'

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers['X-API-KEY'] = TOKEN;

    return config;
})

export default $api
