import mongoose from "mongoose";
export const connectDB = async () => {
    const uri = 'mongodb://localhost:27017/gestor_tareas_db';
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('Conectado a la base de datos :D')).catch(err => console.error('Error de conexión:', err));
    } catch (error) {
        console.log(error);
    }
}