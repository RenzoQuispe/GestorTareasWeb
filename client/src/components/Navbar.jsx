
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)
  
  return (
    <nav className="bg-zinc-500 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={ isAuthenticated ? "/tasks" : "/"}/>
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Gestor de Tareas</Link>
      </h1>
      <ul className="flex gap-x-5">
        {isAuthenticated ? (
          <>
            <li className="text-2xl">
              Bienvenido {user.username}
            </li>
            <li>
              <Link to="/add-task" className="bg-blue-800 px-4 py-1 rounded-sm text-white">Añadir Tarea</Link>
            </li>
            <li>
              <Link to="/" className="bg-blue-800 px-4 py-1 rounded-sm text-white"  onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-blue-800 px-4 py-1 rounded-sm text-white">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-blue-800 px-4 py-1 rounded-sm text-white">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}