import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const initialFormData = {
    username: '',
    password: '',
    email: '',
    mobile: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const [registrationStatus, setRegistrationStatus] = useState({
    message: '',
    isError: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setRegistrationStatus({ message: response.data.message, isError: false });

      // Clear the form data after successful registration
      setFormData(initialFormData);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Error registering:', error);
      setRegistrationStatus({ message: 'Registration failed', isError: true });
    }
  };

  return (
    <div className="container" style={{width:300}}>
      <h2>Register</h2>
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
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>

      {registrationStatus.message && (
        <div
          style={{ color: registrationStatus.isError ? 'red' : 'green' }}
        >
          {registrationStatus.message}
        </div>
      )}
    </div>
  );
}

export default Register;