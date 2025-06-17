import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Patient');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8001/api/auth/register', {
        name,
        email,
        phone,
        role,
        password
      });
      console.log(res.data);
      alert('Registration successful');
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card border-primary p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-body p-3 p-md-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Medi Clinic Registration</h2>
          <form onSubmit={handleRegister}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fs-5">Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fs-5">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fs-5">Phone</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fs-5">Role</label>
                <select
                  className="form-select form-select-lg"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label fs-5">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-4">
                <label className="form-label fs-5">Confirm Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 py-2"
              >
                Register
              </button>
            </div>

            <div className="text-center mt-3">
              <p>Already have an account? <a href="/login" className="text-primary">Login here</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}