import { useTasks } from "../context/TaskContext";
import { Link } from "react-router";

import days from "dayjs";
import utc from 'dayjs';
days.extend(utc)

function TaskCard({ task }) {
    const {deleteTask} = useTasks();
    return (
        <div className="bg-zinc-800 max-w-md w-full p-5 rounded-md">
            <h1 className="text-2xl font-bold text-white">{task.title}</h1>
            <p className="text-slate-400">{task.description}</p>
            <p className="text-white">{days(task.date).utc().format("DD/MM/YYYY")}</p>
            <div className="flex gap-x-35 items-center">
                <Link className="bg-blue-800 text-white px-1 py-1" to={`/tasks/${task.id}`}>
                    Editar
                </Link>
                <button className="bg-red-800 text-white px-1 py-1" onClick={()=>{deleteTask(task.id)}}>
                    Eliminar
                </button>

            </div>
        </div>
    )
}
export default TaskCard