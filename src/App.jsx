import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import FundDetail from './pages/FundDetail';
import SavedFunds from './pages/SavedFunds';
import Display from './pages/Display';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fund/:id" element={<FundDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved" element={<SavedFunds />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
