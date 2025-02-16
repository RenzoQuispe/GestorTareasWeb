import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => { signin(data) });

    useEffect(()=>{
        if(isAuthenticated) navigate("/tasks");
    },[isAuthenticated])

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {
                    signinErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white my-2" key={i}>
                            {error}
                        </div>
                    ))
                }
                
                <h1 className="text-2xl font-bold text-white">Inicia Sesion</h1>
                
                <form onSubmit={onSubmit}>

                    <input type="email" {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="email" />
                    {errors.email && (
                        <p className="text-red-500">email es requerido</p>
                    )}
                    <input type="password" {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Contraseña" />
                    {errors.username && (
                        <p className="text-red-500">Contraseña requerida</p>
                    )}
                    <button type="submit" className="text-white font-bold">Entrar</button>
                </form>
                <p className="flex gap-x-2 justify-between text-gray-400">
                    No tienes una cuenta? <Link to="/register" className="text-sky-500 ">Sign Up </Link>
                </p>
            </div>
        </div>
    )
}
export default LoginPage;