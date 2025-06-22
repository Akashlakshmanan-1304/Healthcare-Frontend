import React, { useState } from 'react';
import ViewAppointments from '../component/doctor/DoctorViewAppointments';
import MedicalHistory from '../component/doctor/DoctorMedicalHistory';
import TimeSlots from '../component/doctor/DoctorTimeSlots';
import ProfileCard from '../component/doctor/DoctorProfileCard';
import logo from '../assets/logo.png' 
import { useNavigate } from 'react-router-dom';

export default function DoctorDashboard() {
  const [view, setView] = useState("appointments");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="container-fluid p-0 min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <img
          src={logo}
          style={{ width: "30px", cursor: "pointer" }}
          alt=""
          onClick={handleNavigateHome}
        />
          <span className="navbar-brand fw-bold">Doctor Dashboard</span>
          <button
            className="btn btn-link p-0 ms-auto"
            style={{ border: "none", background: "none" }}
            onClick={() => setShowProfile(!showProfile)}
          
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
      <div className="container py-4">
        {showProfile && (
          <div className="position-absolute end-0 me-4 z-3">
            <ProfileCard onClose={() => setShowProfile(false)} />
          </div>
        )}
        <div className="card shadow-sm mb-4 border-0">
          <div className="card-body p-2">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <button 
                  className={`nav-link ${view === "appointments" ? "active bg-primary" : "text-dark"}`}
                  onClick={() => setView("appointments")}
                >
                  <i className="fas fa-calendar-check me-2"></i>
                  Appointments
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${view === "history" ? "active bg-primary" : "text-dark"}`}
                  onClick={() => setView("history")}
                >
                  <i className="fas fa-file-medical me-2"></i>
                  Consultations
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${view === "timeslots" ? "active bg-primary" : "text-dark"}`}
                  onClick={() => setView("timeslots")}
                >
                  <i className="fas fa-clock me-2"></i>
                  Time Slots
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            {view === "appointments" && <ViewAppointments role="Doctor" />}
            {view === "history" && <MedicalHistory role="Doctor" />}
            {view === "timeslots" && <TimeSlots />}
          </div>
        </div>
      </div>
    </div>
  );
}