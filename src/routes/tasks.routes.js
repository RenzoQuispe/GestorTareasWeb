import { Router } from "express";
import { getTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/tasks.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/tasks', authRequired, getTasks); // todas las tareas
//CRUD
router.get('/tasks/:id', authRequired, getTask); // obtenet una tarea
router.post('/tasks', authRequired,createTask); // para crear tareas
router.delete('/tasks/:id', authRequired, deleteTask); // eliminar
router.put('/tasks/:id', authRequired, updateTask); // editar

export default router;