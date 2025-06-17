import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import { FaCalendarAlt, FaUserMd, FaUserInjured, FaTimes, FaSpinner } from "react-icons/fa";

export default function AppointmentItem({ appointment, role, onCancelSuccess }) {
  const [status, setStatus] = useState(appointment.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.put(`/appointments/${appointment.appointmentId}/cancel`);
      setStatus("CANCELLED");
      if (onCancelSuccess) {
        onCancelSuccess(appointment);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel appointment.");
    }
    setLoading(false);
  };

  const getStatusBadge = () => {
    switch(status) {
      case 'BOOKED':
        return 'bg-primary';
      case 'COMPLETED':
        return 'bg-success';
      case 'CANCELLED':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div className="d-flex align-items-center mb-2 ">
              <span className={`badge ${getStatusBadge()} me-2 `}>
                {status}
              </span>
              <small className="text-muted">ID: {appointment.appointmentId}</small>
            </div>
            
            <div className="d-flex align-items-center mb-2">
              <FaCalendarAlt className="text-primary me-2" />
              <strong>{appointment.date}</strong>&nbsp;at&nbsp;<strong>{appointment.time}</strong>
            </div>
            
            <div className="d-flex align-items-center">
              {role === "Doctor" ? (
                <>
                  <FaUserInjured className="text-primary me-2" />
                  <span>Patient: {appointment.patientName}</span>
                </>
              ) : (
                <>
                  <FaUserMd className="text-primary me-2" />
                  <span>Dr. {appointment.doctorName}</span>
                </>
              )}
            </div>
          </div>
          
          {status !== "CANCELLED" && status !== "COMPLETED" && (
            <button
              className="btn btn-outline-danger btn-sm d-flex align-items-center"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner-border spinner-border-sm me-1" />
                  Cancelling
                </>
              ) : (
                <>
                  <FaTimes className="me-1" />
                  Cancel
                </>
              )}
            </button>
          )}
        </div>
        
        {error && (
          <div className="alert alert-danger mt-2 mb-0 p-2">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}