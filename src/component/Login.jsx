import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken, setRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8001/api/auth/login', { email, password });
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      setToken(token);
      setRole(payload.role);
      localStorage.setItem('token', token);
      localStorage.setItem('role', payload.role);
   
      if (payload.role === 'Doctor') navigate("/doctor");
      else if (payload.role === 'Patient') navigate("/patient");
    } catch (err) {
      console.log(email, password, err);
      alert('Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card border-primary p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body p-3 p-md-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Medi Clinic Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="inputEmail" className="form-label fs-5">Email</label>
              <input 
                id="inputEmail"
                className="form-control form-control-lg" 
                type="email" 
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="inputPassword" className="form-label fs-5">Password</label>
              <input 
                id="inputPassword"
                type="password" 
                className="form-control form-control-lg" 
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100 py-2"
            >
              Sign In
            </button>
            <div className="text-center mt-3">
              <p>Don't have an account? <a href="/register" className="text-primary">Register here</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}