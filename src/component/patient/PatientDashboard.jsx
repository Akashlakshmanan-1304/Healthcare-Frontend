import React, { useState } from 'react';
import ViewAppointments from './ViewAppointments';
import MedicalHistory from './MedicalHistory';
import ProfileCard from './ProfileCard';
import { FaUserCircle, FaCalendarAlt, FaFileMedicalAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard() {
  const [view, setView] = useState("appointments");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const handleNavigateHome = () => {
  navigate('/');
  };

  return (
    <div className="container-fluid p-0 min-vh-100 bg-light">
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <img src={logo} style={{width:"30px", cursor: "pointer"}} alt="" onClick={handleNavigateHome}/>
          <span className="navbar-brand fw-bold">Patient Dashboard</span>
          <button
            className="btn btn-link p-0 ms-auto"
            style={{ border: "none", background: "none" }}
            onClick={() => setShowProfile(!showProfile)}
            aria-label="Profile"
          >
             <div className="position-relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-circle border border-2 border-white"
              />
              
                  {showProfile && (
                <div className="position-absolute end-0 bottom-0 bg-success rounded-circle" 
                     style={{ width: '12px', height: '12px' }}></div>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        {/* Profile Card (positioned absolutely) */}
        {showProfile && (
          <div className="position-absolute end-0 me-4 z-3">
            <ProfileCard onClose={() => setShowProfile(false)} />
          </div>
        )}

        {/* Dashboard Navigation */}
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-body p-2">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <button 
                  className={`nav-link ${view === "appointments" ? "active bg-primary" : "text-dark"}`}
                  onClick={() => setView("appointments")}
                >
                  <FaCalendarAlt className="me-2" />
                  My Appointments
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${view === "history" ? "active bg-primary" : "text-dark"}`}
                  onClick={() => setView("history")}
                >
                  <FaFileMedicalAlt className="me-2" />
                  Medical History
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            {view === "appointments" ? <ViewAppointments /> : <MedicalHistory />}
          </div>
        </div>
      </div>
    </div>
  );
}