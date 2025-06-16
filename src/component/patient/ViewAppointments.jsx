import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import decodeToken from '../../utils/decodeToken';
import { useNavigate } from 'react-router-dom';
import AppointmentItem from './AppointmentItem';
import { FaCalendarAlt, FaPlusCircle, FaSpinner } from 'react-icons/fa';

export default function ViewAppointments({ role }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = decodeToken()?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const url = `users/${userId}/appointments`;
        const response = await axios.get(url);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId, role]);

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <FaSpinner className="spinner text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 d-flex align-items-center">
            <FaCalendarAlt className="me-2" />
            Your Appointments
          </h5>
          <button 
            className="btn btn-light d-flex align-items-center"
            onClick={handleBookAppointment}
          >
            <FaPlusCircle className="me-2" />
            Book Appointment
          </button>
        </div>
        
        <div className="card-body p-0">
          {appointments.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No appointments scheduled
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {appointments.map((appointment) => (
                <AppointmentItem 
                  key={appointment.appointmentId} 
                  appointment={appointment} 
                  role={role} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}