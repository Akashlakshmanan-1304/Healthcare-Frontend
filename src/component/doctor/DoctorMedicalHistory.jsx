import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import decodeToken from '../../utils/decodeToken';
import { FaUserMd, FaUserInjured, FaFileMedicalAlt, FaPrescriptionBottleAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

export default function DoctorMedicalHistory({ role }) {
  const [consultations, setConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = decodeToken()?.id;

  useEffect(() => {
    const url = `/doctor/${userId}/consultations`;
    axios.get(url).then(res => setConsultations(res.data));
  }, [role, userId]);

  const filteredConsultations = consultations.filter(c =>
    c.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-0">
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0 d-flex align-items-center">
            <FaFileMedicalAlt className="me-2" />
            Consultation History
          </h5>
        </div>
        
        <div className="card-body p-0">
          {/* Search Bar */}
          <div className="p-3">
            <div className="input-group" style={{ maxWidth: 400 }}>
              <span className="input-group-text bg-white">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by patient name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {filteredConsultations.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No consultation records found
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {filteredConsultations.map((c, i) => (
                <div key={i} className="list-group-item border-0 py-3">
                  <div className="d-flex flex-column flex-md-row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="card h-100 border-primary">
                        <div className="card-body">
                          <h6 className="text-primary mb-3">
                            <FaUserMd className="me-2" />
                            Consultation Details
                          </h6>
                          <div className="d-flex align-items-center mb-2">
                            <FaCalendarAlt className="me-2 text-muted" />
                            <span>{new Date(c.date).toLocaleDateString()}</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <FaUserInjured className="me-2 text-muted" />
                            <span>{c.patientName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-8">
                      <div className="card h-100 border-primary">
                        <div className="card-body">
                          <h6 className="text-primary mb-3">
                            <FaFileMedicalAlt className="me-2" />
                            Clinical Notes
                          </h6>
                          <p className="mb-4">{c.notes || 'No notes recorded'}</p>
                          
                          <h6 className="text-primary mb-3">
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
    </div>
  );
}