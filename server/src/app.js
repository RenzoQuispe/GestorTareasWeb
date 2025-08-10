import express from 'express'
import morgan from 'morgan' // Para ver peticiones que llegan al backend
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express(); // Crear el servidor

// CORS para red local
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (origin.startsWith("http://localhost:5173")) return callback(null, true);
        const regexRedLocal = /^http:\/\/192\.168\.1\.\d{1,3}:5173$/;
        if (regexRedLocal.test(origin)) return callback(null, true);
        return callback(new Error("CORS no permitido desde este origen: " + origin));
    },
    credentials: true
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", tasksRoutes);

export default app;