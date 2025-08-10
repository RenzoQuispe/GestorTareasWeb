import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// obtener __dirname compatible con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// cargar el .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../../..', '.env') });
// exportar variables ya cargadas
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
