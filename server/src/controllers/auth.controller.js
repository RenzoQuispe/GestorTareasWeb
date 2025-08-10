
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    console.log(req.body); // datos que el cliente envia por lo general en formato json
    const { email, password, username } = req.body; // traer la info necesario para del json
    try {

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["El email ya esta en uso"]);

        const passwordHash = await bcrypt.hash(password, 10); // encripta la contraseña con un algoritmo usado 10 veces
        // creating the user
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
        // Guardar usuario
        const userSaved = await newUser.save();

        //crear token
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token); // mandarlo atraves de una cookie

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const login = async (req, res) => {
    console.log(req.body); // datos que el cliente envia por lo general en formato json
    const { email, password } = req.body; // traer la info necesario para del json
    try {

        const userFound = await User.findOne({ email }); //Busca si el email de la peticion existe en la bd

        if (!userFound) return res.status(400).json({ message: "Usuario No encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password); // true or false

        if (!isMatch) return res.status(400).json({ message: "Constraseña incorrecta" });

        //crear token
        const token = await createAccessToken({ id: userFound._id });

        res.cookie('token', token); // mandarlo atraves de una cookie

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    console.log('logout')
    return res.sendStatus(200);
}

export const profile = async (req, res) => {

    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado :c" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });

}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({message:"No autorizado"});
  
    jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
      if (error) return res.status(401).json({message:"No autorizado"});
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({message:"No autorizado"});
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };