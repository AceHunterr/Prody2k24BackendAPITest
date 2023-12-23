// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
        email,
        password,
        username
      });
      alert(`Registration successful: ${response.data.message}`);
    } catch (error) {
      alert(`Registration failed: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <h2>Register</h2>

    <div>
      <label htmlFor="">UserName: </label>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>


    <div>
      <label htmlFor="">Password: </label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div>
        <label htmlFor="">Email: </label>
        <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
