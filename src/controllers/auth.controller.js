import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt.js';
import { pool } from '../db.js';
import dotenv from 'dotenv';
dotenv.config();

// REGISTER
export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) return res.status(400).json(['El email ya está en uso']);

        const passwordHash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );

        const token = await createAccessToken({ id: result.insertId });

        res.cookie('token', token);

        res.json({
            id: result.insertId,
            username,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = await createAccessToken({ id: user.id });

        res.cookie('token', token);

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGOUT
export const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    return res.sendStatus(200);
};

// PROFILE
export const profile = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
        const user = users[0];
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado :c' });

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// VERIFY TOKEN
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No autorizado' });

    jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
        if (error) return res.status(401).json({ message: 'No autorizado' });

        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [user.id]);
        const userFound = users[0];
        if (!userFound) return res.status(401).json({ message: 'No autorizado' });

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};
