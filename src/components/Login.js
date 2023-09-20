import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      if (response.data.message === 'Login successful') {
        setLoginMessage('Login successful');
        setIsLoggedIn(true);
        navigate('/create');
      } else {
        setLoginMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('User not found. Please register first.');
    }
  };

  return (
    <div className="container" style={{width:300}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>

      {loginMessage && (
        <div
          style={{ color: loginMessage === 'Login successful' ? 'green' : 'red' }}
        >
          {loginMessage}
        </div>
      )}
    </div>
  );
}

export default Login;