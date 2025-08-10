import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('Conectado a la base de datos :D')).catch(err => console.error('Error de conexión:', err));
    } catch (error) {
        console.log(error);
    }
}