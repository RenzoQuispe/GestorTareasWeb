import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});


export const testDBConexion = async () => {
    try {
        const [rows] = await pool.query("SELECT NOW() AS now");
        console.log("Conexion exitosa a la base de datos :D", rows[0].now);
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
};