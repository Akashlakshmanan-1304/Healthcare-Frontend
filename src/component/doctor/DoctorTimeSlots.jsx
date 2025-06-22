import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import decodeToken from '../../utils/decodeToken';
import { FaClock, FaPlusCircle, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';

export default function DoctorTimeSlots() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const doctorId = decodeToken()?.id;
  
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(`/appointments/doctor/${doctorId}/timeslots`);
        setTimeSlots(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching time slots:", err);
        setError(err.response?.data || 'Failed to fetch time slots. Please try again later.');
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchTimeSlots();
    } else {
      setError("Doctor ID is missing. Please log in again.");
      setLoading(false);
    }
  }, [doctorId]);

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleButtonClick = () => {
    setShowForm(true);
    setSubmitError(null);
    if (timeSlots.length > 0 && typeof timeSlots[0] === 'object') {
      setStartTime(timeSlots[0].startTime || '09:00');
      setEndTime(timeSlots[0].endTime || '18:00');
    } else {
      setStartTime('09:00');
      setEndTime('18:00');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (endTime <= startTime) {
      setSubmitError('End time must be after start time.');
      return;
    }

    setSubmitLoading(true);
    try {
      await axios.post('/availability/update-availability', {
        doctorId,
        isAvailable: true,
        startTime,
        endTime,
        date: getTomorrowDate(),
      });
      setShowForm(false);
      setStartTime('09:00');
      setEndTime('18:00');
      setSubmitLoading(false);
      setLoading(true);
      const response = await axios.get(`/appointments/doctor/${doctorId}/timeslots`);
      setTimeSlots(response.data);
      setError(null); 
      setLoading(false);
    } 
    catch (err) {
      setSubmitError(err.response?.data || 'Failed to update time slot. Please try again later.');
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const showAddButton = error === "No Availability found, add Availability" || timeSlots.length === 0;

  if (error && error !== "No Availability found, add Availability") {
    return (
      <div className="alert alert-danger mx-3 my-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaClock className="me-2" />
            {error === "No Availability found, add Availability" ? 'Add Availability' : 'Your Available Time Slots'}
          </h5>
          <button
            className={`btn btn-sm ${showAddButton ? 'btn-light' : 'btn-outline-light'}`}
            onClick={handleButtonClick}
          >
            {showAddButton ? (
              <>
                <FaPlusCircle className="me-1" />
                Add Timeslot
              </>
            ) : (
              <>
                <FaEdit className="me-1" />
                Update
              </>
            )}
          </button>
        </div>

        <div className="card-body">
          {timeSlots.length === 0 && !showAddButton ? (
            <div className="text-center py-4 text-muted">
              No time slots available
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {timeSlots.map((slot, index) => (
                <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <FaClock className="text-primary me-2" />
                    {typeof slot === 'object' ? `${slot.startTime} - ${slot.endTime}` : slot}
                  </div>
                  <small className="text-muted">Available</small>
                </div>
              ))}
            </div>
          )}

          {showForm && (
            <div className="mt-4 p-3 border rounded">
              <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="d-flex">
                  <button
                    type="submit"
                    className="btn btn-primary me-2 d-flex align-items-center"
                    disabled={submitLoading}
                  >
                    {submitLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCheck className="me-2" />
                        {showAddButton ? 'Add' : 'Update'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary d-flex align-items-center"
                    onClick={() => setShowForm(false)}
                    disabled={submitLoading}
                  >
                    <FaTimes className="me-2" />
                    Cancel
                  </button>
                </div>
                
                {submitError && (
                  <div className="alert alert-danger mt-3 mb-0">
                    {submitError}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}