import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from "./pages/MainPage";
import LoginPage1 from "./pages/LoginPage1";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/page1" element={<LoginPage1 />}></Route>
      <Route path="/reset-password/:token" element={<ResetPassword />} ></Route>
      
    </Routes>

  );
}

export default App; // ✅ make sure this line exists!
