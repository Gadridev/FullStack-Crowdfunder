import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CreateProject from './pages/CreateProject';
import UpdateProject from './pages/UpdateProject';
import Investors from './pages/Investors';
import Login from './pages/Login';
import Register from './pages/Register';
import { RequireAuth } from './components/layout/RequireAuth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route element={<RequireAuth/>}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/update/:id" element={<UpdateProject />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/:id/investors" element={<Investors />} />
            <Route path="/investors/:id" element={<Investors />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
