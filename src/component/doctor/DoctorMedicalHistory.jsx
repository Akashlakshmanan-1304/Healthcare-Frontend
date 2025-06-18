import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import decodeToken from '../../utils/decodeToken';
import { FaFileMedicalAlt, FaSearch } from 'react-icons/fa';
import MedicalHistoryCard from './MedicalHistoryCard';

export default function DoctorMedicalHistory({ role }) {
  const [consultations, setConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ notes: '', prescriptions: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = decodeToken()?.id;

  useEffect(() => {
    fetchConsultations();
    // eslint-disable-next-line
  }, [role, userId]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const url = `/doctor/${userId}/consultations`;
      const res = await axios.get(url);
      setConsultations(res.data);
    } catch {
      setError('Failed to load consultations.');
    }
    setLoading(false);
  };

  const filteredConsultations = consultations.filter(c =>
    c.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (consultation) => {
    setEditingId(consultation.consultationId);
    setEditForm({
      notes: consultation.notes || '',
      prescriptions: consultation.prescriptions || '',
    });
    setError('');
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.put(`/doctor/consultation/update/${id}`, editForm);
      await fetchConsultations();
      setEditingId(null);
    } catch (err) {
      const backendMsg =
        err.response?.data ||
        'Failed to update consultation.';
      setError(backendMsg);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setError('');
  };

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
          {error && (
            <div className="alert alert-danger mx-3">{error}</div>
          )}
          {loading ? (
            <div className="text-center py-4 text-muted">
              Loading...
            </div>
          ) : filteredConsultations.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No consultation records found
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {filteredConsultations.map((c, i) => (
                <MedicalHistoryCard
                  key={i}
                  consultation={c}
                  editingId={editingId}
                  editForm={editForm}
                  loading={loading}
                  onEditClick={handleEditClick}
                  onEditChange={handleEditChange}
                  onUpdate={handleUpdate}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}