import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000'
})

export const signin = (formData) =>{
    return API.post('/users/login', formData)
}

export const signup = (formData)=>{
    return API.post('/users/signup', formData)
}