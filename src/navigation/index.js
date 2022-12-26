import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Login from '../views/login';
import Register from '../views/register';
import UserHome from '../views/user/home';

export default function Navigation() {
  // linkleme yaparken Routes ve Route kullanıyoruz.
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/user/" element={<UserHome />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
