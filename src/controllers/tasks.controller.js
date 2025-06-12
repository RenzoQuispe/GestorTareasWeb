import { pool } from "../db.js";

// Obtener todas las tareas del usuario
export const getTasks = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM tasks WHERE user_id = ?`,
            [req.user.id]
        );
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtener una tarea por ID
export const getTask = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [req.params.id]);
        if (rows.length === 0)
            return res.status(404).json({ message: "Tarea no encontrada" });

        const task = rows[0];
        if (task.user_id !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });

        return res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crear nueva tarea
export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const arreglarDate = date.replace('Z', '').replace('T', ' ');
        const [result] = await pool.query(
            `INSERT INTO tasks (title, description, date, user_id) VALUES (?, ?, ?, ?)`,
            [title, description, arreglarDate, req.user.id]
        );
        res.json({
            id: result.insertId,
            title,
            description,
            arreglarDate,
            user_id: req.user.id,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar una tarea
export const deleteTask = async (req, res) => {
    try {
        const [taskRows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [req.params.id]);
        if (taskRows.length === 0)
            return res.status(404).json({ message: "Tarea no encontrada" });

        const task = taskRows[0];
        if (task.user_id !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });

        await pool.query(`DELETE FROM tasks WHERE id = ?`, [req.params.id]);
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar una tarea
export const updateTask = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const [taskRows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [req.params.id]);
        if (taskRows.length === 0)
            return res.status(404).json({ message: "Tarea no encontrada" });

        const task = taskRows[0];
        if (task.user_id !== req.user.id)
            return res.status(403).json({ message: "No autorizado" });

        const arreglarDate = date.replace('Z', '').replace('T', ' ');
        await pool.query(
            `UPDATE tasks SET title = ?, description = ?, date = ? WHERE id = ?`,
            [title, description, arreglarDate, req.params.id]
        );

        const [updatedRows] = await pool.query(`SELECT * FROM tasks WHERE id = ?`, [req.params.id]);
        res.json(updatedRows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
