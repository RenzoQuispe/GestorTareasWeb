import app from './app.js'
import { connectDB } from './db.js'

connectDB();

app.listen(4000) // El servidor escucha en el puerto 3000

console.log('Server en puerto',4000)