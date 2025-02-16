import axios from './axios';

const API = 'http://localhost:4000/api'

export const registerRequest = user => axios.post(`/register`, user); // Se crea una peticion con el user dado en el frontend

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get('/verify');