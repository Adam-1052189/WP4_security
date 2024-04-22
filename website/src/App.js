import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" component={Login} />
        <Navigate from="/" to="/login" />
        {/* Andere routes na login */}
      </Routes>
    </Router>
  );
}

export default App;
