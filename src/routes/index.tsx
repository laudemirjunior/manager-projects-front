import { useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UseUser } from "../context/user";
import Dashboard from "../views/dashboard";
import Home from "../views/home";
import Login from "../views/login";
import Register from "../views/register";
import Tasks from "../views/tasks";

const Router = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = UseUser();

  useEffect(() => {
    if (token) {
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/" &&
        location.pathname !== "/register"
      ) {
        navigate(location.pathname);
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/");
      localStorage.clear();
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks/:id" element={<Tasks />} />
    </Routes>
  );
};

export default Router;
