import React from 'react';
import DocentDashboard from "./components/DocentDashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/docent-dashboard" element={<DocentDashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Andere routes na login */}
      </Routes>
    </Router>
  );
}

export default App;