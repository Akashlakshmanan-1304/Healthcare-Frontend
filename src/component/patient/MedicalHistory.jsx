import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import decodeToken from '../../utils/decodeToken';
import { FaUserMd, FaUserInjured, FaFileMedicalAlt, FaPrescriptionBottleAlt, FaCalendarAlt } from 'react-icons/fa';

export default function MedicalHistory({ role }) {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = decodeToken()?.id;

  useEffect(() => {
    const url =
      role === "Doctor"
        ? `/doctor/${userId}/consultations`
        : `/users/${userId}/consultations`;

    axios.get(url)
      .then(res => {
        setConsultations(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [role, userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {role === "Doctor" ? (
            <>
              <FaUserMd className="me-2" />
              Consultations Given
            </>
          ) : (
            <>
              <FaFileMedicalAlt className="me-2" />
              Medical History
            </>
          )}
        </h5>
      </div>
      
      <div className="card-body p-0">
        {consultations.length === 0 ? (
          <div className="text-center py-4 text-muted">
            No consultation records found
          </div>
        ) : (
          <div className="list-group list-group-flush">
            {consultations.map((c, i) => (
              <div key={i} className="list-group-item border-0">
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <h6 className="text-primary">
                          <FaCalendarAlt className="me-2" />
                          Consultation Details
                        </h6>
                        <div className="d-flex align-items-center mb-2">
                          <FaCalendarAlt className="me-2 text-muted" />
                          <span>{new Date(c.date).toLocaleDateString()}</span>
                        </div>
                        {role === "Doctor" ? (
                          <div className="d-flex align-items-center">
                            <FaUserInjured className="me-2 text-muted" />
                            <span>{c.patientName}</span>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center">
                            <FaUserMd className="me-2 text-muted" />
                            <span>Dr. {c.doctorName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-8">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <h6 className="text-primary">
                          <FaFileMedicalAlt className="me-2" />
                          Clinical Notes
                        </h6>
                        <p className="mb-4">{c.notes || 'No notes recorded'}</p>
                        
                        <h6 className="text-primary">
                          <FaPrescriptionBottleAlt className="me-2" />
                          Prescription
                        </h6>
                        <p>{c.prescriptions || 'No prescription given'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}