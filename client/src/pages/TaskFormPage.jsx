import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
function TaskFormPage() {
    const { register, handleSubmit } = useForm();

    const { createTask } = useTasks();

    const onSubmit = handleSubmit((data) => { createTask(data) });

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

            <h1 className="text-2xl font-bold text-white">Añadir Tarea</h1>

            <form onSubmit={onSubmit}>

                <input type="text" placeholder="Titulo" {...register("title")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" autoFocus />

                <textarea rows="3" placeholder="Descripcion" {...register("description")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"></textarea>

                <button className="text-white font bold">Guardar</button>
            </form>
        </div>
    )
}
export default TaskFormPage;