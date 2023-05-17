import axios from "axios";

//const baseURL = "https://c863-193-55-29-172.ngrok-free.app/";
const baseURLHost = "http://localhost:3000/";

const http = axios.create({ baseURL: `${baseURLHost}api/`});
const auth = axios.create({ baseURL: `${baseURLHost}auth/`});

http.interceptors.request.use(request => {
    const t = localStorage.getItem("token");
    if(t) request.headers.Authorization = `Bearer ${t}`;
    return request;
})

export const HTTP = http;
export const AUTH = auth;
