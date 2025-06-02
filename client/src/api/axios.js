// Creamos axios.js que sera un axios configurado-personalizado que usaremos auth.js
import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true // necesario para mantener las credenciales
})
export default instance;