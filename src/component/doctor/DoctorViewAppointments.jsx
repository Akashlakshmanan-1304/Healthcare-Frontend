import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../utils/axiosInstance';
import decodeToken from '../../utils/decodeToken';
import AppointmentCard from './AppointmentCard';
import { FaCalendarAlt, FaSpinner } from 'react-icons/fa';

export default function DoctorViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const doctorId = decodeToken()?.id;

  const fetchAppointments =async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `/doctor/${doctorId}/appointments`;
      const response = await axios.get(url);
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const bookedAppointments = appointments.filter((a) => a.status === "BOOKED");

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <FaSpinner className="spinner text-primary" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-3 my-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 d-flex align-items-center">
            <FaCalendarAlt className="me-2" />
            Your Appointments
          </h5>
        </div>
        
        <div className="card-body p-0">
          {bookedAppointments.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No upcoming appointments found
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {bookedAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.appointmentId} 
                  appointment={appointment} 
                  refreshAppointments={fetchAppointments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}