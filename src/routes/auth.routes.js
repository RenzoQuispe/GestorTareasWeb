import { Router } from "express"; // para crear un enrutador
import { register, login, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema} from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";


const router = Router();    

router.post('/register', validateSchema(registerSchema) ,register); // peticion post en http://localhost:4000/api/register (respuesta register)
router.post('/login', validateSchema(loginSchema),login); // post: Enviar datos al servidor para crear o modificar recursos.
router.get('/verify', verifyToken);

router.post('/logout', logout);
router.get('/profile', authRequired, profile); //get:Obtener información del servidor.


export default router;