import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const authRequired = (req, res, next) =>{
    const {token} = req.cookies;
    if(!token)
        return res.status(401).json({message: "No token, no autorizado >:/ "});
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
            return res.status(403).json({message: "Token invalido >:c"});
        }
        req.user = user
        next();
    }) // Verifica si el token es correcto

}