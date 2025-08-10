import app from './app.js'
import { connectDB } from './db.js'
import { PORT } from './config/env.js'

connectDB();

app.listen(PORT)

console.log('Server en puerto',PORT)