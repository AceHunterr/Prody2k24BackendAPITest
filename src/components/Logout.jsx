import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/logout/');

      localStorage.removeItem('myJwtToken');

      window.location.href = '/login'; 
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
