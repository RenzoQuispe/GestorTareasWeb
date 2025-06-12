import app from './app.js'
import { testDBConexion } from './db.js'
import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, async () => {
    console.log('Server en puerto', process.env.PORT)
    testDBConexion();
});
