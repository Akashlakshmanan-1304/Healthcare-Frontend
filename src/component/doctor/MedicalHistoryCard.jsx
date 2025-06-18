import React from 'react';
import { FaUserMd, FaUserInjured, FaFileMedicalAlt, FaPrescriptionBottleAlt, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function MedicalHistoryCard({
  consultation,
  editingId,
  editForm,
  loading,
  onEditClick,
  onEditChange,
  onUpdate,
  onCancel
}) {
  return (
    <div className="list-group-item border-0 py-3">
      <div className="d-flex flex-column flex-md-row">
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card h-100 border-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-primary mb-3">
                  <FaUserMd className="me-2" />
                  Consultation Details
                </h6>
                {editingId !== consultation.consultationId && (
                  <FaEdit
                    className="text-secondary"
                    style={{ cursor: 'pointer' }}
                    title="Edit Consultation"
                    onClick={() => onEditClick(consultation)}
                  />
                )}
              </div>
              <div className="d-flex align-items-center mb-2">
                <FaCalendarAlt className="me-2 text-muted" />
                <span>{new Date(consultation.date).toLocaleDateString()}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FaUserInjured className="me-2 text-muted" />
                <span>{consultation.patientName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card h-100 border-primary">
            <div className="card-body">
              {editingId === consultation.consultationId ? (
                <>
                  <h6 className="text-primary mb-3">
                    <FaFileMedicalAlt className="me-2" />
                    Edit Clinical Notes
                  </h6>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="notes"
                      rows={3}
                      value={editForm.notes}
                      onChange={onEditChange}
                      placeholder="Enter clinical notes"
                    />
                  </div>
                  <h6 className="text-primary mb-3">
                    <FaPrescriptionBottleAlt className="me-2" />
                    Edit Prescription
                  </h6>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="prescriptions"
                      rows={2}
                      value={editForm.prescriptions}
                      onChange={onEditChange}
                      placeholder="Enter prescription"
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => onUpdate(consultation.consultationId)}
                      disabled={loading}
                      type="button"
                    >
                      <FaSave className="me-2" />
                      Update
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={onCancel}
                      type="button"
                    >
                      <FaTimes className="me-2" />
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h6 className="text-primary mb-3">
                    <FaFileMedicalAlt className="me-2" />
                    Clinical Notes
                  </h6>
                  <p className="mb-4">{consultation.notes || 'No notes recorded'}</p>
                  <h6 className="text-primary mb-3">
                    <FaPrescriptionBottleAlt className="me-2" />
                    Prescription
                  </h6>
                  <p>{consultation.prescriptions || 'No prescription given'}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}