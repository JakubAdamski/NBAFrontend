import {useAuth} from "./AuthContext";
import axios from "axios";


export const setupAxios = (token) => {
    token&&axios.interceptors.request.use(
        (config) => {
            if(!config.url.includes("aut")){
            // const token = localStorage.getItem("token");
            console.log(token);
            config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};