import axios from './axios';

const API = import.meta.env.VITE_API_URL;

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get('/verify');