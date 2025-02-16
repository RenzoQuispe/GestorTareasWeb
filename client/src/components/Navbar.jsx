
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)
  
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/taskss" : "/"}>Task Manager</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="text-white">
              Bienvenido {user.username} :D
            </li>
            <li>
              <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm">Añadir Tarea</Link>
            </li>
            <li>
              <Link to="/" className="bg-indigo-500 px-4 py-1 rounded-sm"  onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}