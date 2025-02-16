import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import TaskFormPage from "./pages/TaskFormPage";
import TasksPage from "./pages/TasksPage";
import HomePage from "./pages/HomePage";
import RutaProtegida from "./pages/RutaProtegida";
import { TaskProvider } from "./context/TaskContext";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<RutaProtegida />}>
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>

  )
}
export default App