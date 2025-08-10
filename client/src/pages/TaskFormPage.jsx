//Formulario usado para crear tareaas y para editar tareas
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router" //useParams para usar los datos dinamicos de la url, usado en editTask
import { useEffect } from "react";

import utc from 'dayjs/plugin/utc';
import dayjs from "dayjs";
dayjs.extend(utc)

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm(); // Para hacer funcional el formulario
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function CargarTarea() { // Cargar los datos en el formulario para su edicion
            if (params.id) {
                const task = await getTask(params.id);
                console.log(task)
                setValue('title', task.title)
                setValue('description', task.description)
                setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"))
            }
        }
        CargarTarea();
    }, [])

    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ?  dayjs.utc(data.date).format() : dayjs.utc().format(),
        };
        if (params.id) {
            updateTask(params.id,dataValid);
        } else {
            createTask(dataValid);
        }
        navigate('/tasks')
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

                <h1 className="text-2xl font-bold text-white">
                    {params.id ? "Editar Tarea" : "Añadir Tarea"}
                </h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="title" className="text-white">Titulo</label>
                    <input id="title" type="text" placeholder="Titulo" {...register("title")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" autoFocus />

                    <label htmlFor="description" className="text-white">Descripcion</label>
                    <textarea id="description" rows="3" placeholder="Descripcion" {...register("description")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"></textarea>

                    <label htmlFor="date" className="text-white">Fecha</label>
                    <input id="date" type="date" {...register("date")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />

                    <button className="bg-blue-800 px-4 py-1 rounded-sm text-white">Guardar</button>



                </form>
            </div>
        </div>


    )
}
export default TaskFormPage;