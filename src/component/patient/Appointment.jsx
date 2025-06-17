import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import DoctorCard from './DoctorCard';
import { FaUserMd, FaSpinner } from 'react-icons/fa';

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/appointments/available-doctors')
      .then(res => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch available doctors. Please try again later.');
        setLoading(false);
      });
  }, [doctors]);

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
          <h4 className="mb-0 d-flex align-items-center">
            <FaUserMd className="me-2" />
            Available Doctors Today
          </h4>
        </div>
        
        <div className="card-body">
          {doctors.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No doctors available for appointments today
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {doctors.map((doctor) => (
                <div className="col" key={doctor.doctorId}>
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}