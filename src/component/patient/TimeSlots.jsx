import axios from "../../utils/axiosInstance";
import TimeSlotCard from "./TimeSlotCard";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaClock, FaSpinner, FaArrowLeft } from 'react-icons/fa';

export default function TimeSlots() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      setError('No doctor selected.');
      setLoading(false);
      return;
    }
    axios
      .get(`/appointments/doctor/${doctorId}/timeslots`)
      .then((res) => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch time slots. Please try again later.');
        setLoading(false);
      });
  }, [doctorId]);

  const handleBook = (slot) => {
    navigate('/book-appointment/book', { state: { doctorId, slot } });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <FaSpinner className="spinner text-primary" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
          <button 
            className="btn btn-outline-primary mt-2 d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 d-flex align-items-center">
            <FaClock className="me-2" />
            Available Time Slots
          </h4>
        </div>
        
        <div className="card-body">
          {slots.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No time slots available for this doctor
              <button 
                className="btn btn-outline-primary mt-3 d-flex align-items-center mx-auto"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft className="me-2" />
                Back to Doctors
              </button>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {slots.map((slot, idx) => (
                <TimeSlotCard key={idx} slot={slot} onBook={handleBook} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}