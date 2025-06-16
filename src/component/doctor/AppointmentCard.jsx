import React from "react";
import { useNavigate } from "react-router-dom";

function AppointmentCard({ appointment }) {
  const navigate = useNavigate();

  const handleAddConsultation = () => {
    navigate(`/add-consultation/${appointment.appointmentId}`, {
      state: {
        appointmentId: appointment.appointmentId,
        patientName: appointment.patientName,
        date: appointment.date,
        time: appointment.time,
      },
    });
  };

  

  return (
    <div className="card mb-3 shadow-sm border-primary">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title text-primary mb-1">{appointment.patientName}</h5>
            <div className="d-flex align-items-center">
             <p className="badge bg-primary me-2">
                {appointment.status}
              </p>
             
              <p >
              <small className="text-muted">ID: {appointment.appointmentId}</small>
              </p>
            </div>
            <div className="d-flex flex-column flex-md-row">
              <div className="me-3 mb-2 mb-md-0">
                <i className="far fa-calendar-alt me-2 text-primary"></i>
                <strong>{appointment.date}</strong>
              </div>
              <div>
                <i className="far fa-clock me-2 text-primary"></i>
                <strong>{appointment.time}</strong>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm align-self-center"
            onClick={handleAddConsultation}
          >
            <i className="fas fa-plus me-1"></i> Add Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;