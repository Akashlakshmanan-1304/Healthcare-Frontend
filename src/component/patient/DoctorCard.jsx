import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaStethoscope, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/time-slots?doctorId=${doctor.doctorId}`);
  };

  return (
    <div className="card h-100 border-primary shadow-sm">
      <div className="card-header bg-primary text-white d-flex align-items-center">
        <FaUserMd className="me-2" size={20} />
        <h5 className="card-title mb-0">{doctor.name}</h5>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <FaStethoscope className="text-primary me-3" />
          <div>
            <strong>Specialization:</strong> {doctor.specialization || 'General Surgeon'}
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <FaEnvelope className="text-primary me-3" />
          <div>
            <strong>Email:</strong> {doctor.email}
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <FaPhone className="text-primary me-3" />
          <div>
            <strong>Phone:</strong> {doctor.phone}
          </div>
        </div>
        <button 
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          onClick={handleBook}
        >
          <FaCalendarAlt className="me-2" />
          Book Appointment
        </button>
      </div>
    </div>
  );
}