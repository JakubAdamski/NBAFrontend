import axios from 'axios';

export const api = {
    newUser: (data) => {
        const token = localStorage.getItem('token');
        return axios.post("http://localhost:8080/user", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getMe: () => {
        const token = (localStorage.getItem('token'));
        return axios.get("http://localhost:8080/api/v1/aut/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        },
    login:(data)=>{
        return axios.post("http://localhost:8080/api/v1/aut/logowanie",data)
    },
    register:(data)=>{
        return axios.post("http://localhost:8080/api/v1/aut/rejestracja",data)
    }
}