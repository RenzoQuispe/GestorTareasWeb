import app from './app.js'
import { connectDB } from './db.js'
import dotenv from "dotenv";
dotenv.config();

connectDB();

app.listen(process.env.PORT) // El servidor escucha en el puerto 3000

console.log('Server en puerto',process.env.PORT)