import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:8001/v1'
})