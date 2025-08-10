import app from './app.js'
import { connectDB } from './db.js'
import { NODE_PORT } from './config/env.js'

connectDB();

app.listen(NODE_PORT)

console.log('Server en puerto',NODE_PORT)