import express from 'express'
import morgan from 'morgan' // Para ver peticiones que llegan al backend
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { pool } from './db.js';

const app = express(); // Crear el servidor

app.use(cors({
    origin: 'http://localhost:5173', //permitir como origen solo el 5173
    credentials: true   //permitir "mantener" las credenciales
})); // permitir la conexion entre diferentes dominios en este servidor
app.use(morgan('dev')); // Para ver peticiones que llegan al backend
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use("/api",tasksRoutes);

export default app;