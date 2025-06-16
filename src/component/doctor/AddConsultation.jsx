import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';

export default function AddConsultation() {
  const { appointmentId } = useParams();
  const location = useLocation();
  const { patientName, date, time } = location.state || {};
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [prescription, setPrescription] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      await axios.post('/doctor/consultation', {
        appointmentId: Number(appointmentId),
        notes,
        prescription,
      });
      setSubmitSuccess('Consultation added successfully!');
      setNotes('');
      setPrescription('');
      navigate('/doctor'); 
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to add consultation. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card border-primary p-4" style={{ width: '100%', maxWidth: '800px' }}>
        <div className="card-body p-3 p-md-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Add Consultation</h2>
          
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-light p-3 h-100">
                <h5 className="text-primary">Appointment Details</h5>
                <p className="mb-2"><strong>ID:</strong> {appointmentId}</p>
                <p className="mb-2"><strong>Patient:</strong> {patientName || 'N/A'}</p>
                <p className="mb-2"><strong>Date:</strong> {date || 'N/A'}</p>
                <p className="mb-0"><strong>Time:</strong> {time || 'N/A'}</p>
              </div>
            </div>
            
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fs-5">Clinical Notes</label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="5"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    required
                    style={{ minHeight: '150px' }}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fs-5">Prescription</label>
                  <textarea
                    className="form-control form-control-lg"
                    rows="5"
                    value={prescription}
                    onChange={e => setPrescription(e.target.value)}
                    required
                    style={{ minHeight: '150px' }}
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 py-2"
                  >
                    Submit Consultation
                  </button>
                </div>
                
                {submitError && (
                  <div className="alert alert-danger mt-3 mb-0">
                    {submitError}
                  </div>
                )}
                {submitSuccess && (
                  <div className="alert alert-success mt-3 mb-0">
                    {submitSuccess}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}