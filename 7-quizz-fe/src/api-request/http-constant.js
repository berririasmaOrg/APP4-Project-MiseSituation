import axios from "axios";

const baseURL = "http://localhost:3000/" //"https://cb87-81-64-10-126.ngrok-free.app/";

const http = axios.create({ baseURL: `${baseURL}api/`});
const auth = axios.create({ baseURL: `${baseURL}auth/`});

http.interceptors.request.use(request => {
    const t = localStorage.getItem("token");
    if(t) request.headers.common.Authorization = `Bearer ${t}`;
    return request;
})

export const HTTP = http;
export const AUTH = auth;
