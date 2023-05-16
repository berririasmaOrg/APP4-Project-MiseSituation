import axios from "axios";

const baseURL = "https://9316-193-55-29-173.ngrok-free.app/api/";

const http = axios.create({baseURL});
http.interceptors.request.use((request: any) => {
    const t = localStorage.getItem("token");
    if(t) request.headers.common.Authorization = `Bearer ${t}`;
    return request;
})

export const HTTP = http;