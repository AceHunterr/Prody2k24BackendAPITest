// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';
import Logout from './components/Logout';
import EventRegister from './components/EventRegister';
import Events from './components/Events';
// import AuthenticatedRoute from './components/AuthenticatedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/event-register/:event_id" element={<EventRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/events" element={<Events />} />
        
        {/* <AuthenticatedRoute path="/event-register" element={<EventRegister />} />
        <AuthenticatedRoute path="/user" element={<User />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
