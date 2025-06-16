import React, { useEffect, useState } from "react";
import decodeToken from "../../utils/decodeToken";
import axios from "../../utils/axiosInstance";
import { FaUserMd, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

export default function DoctorProfileCard({ onClose }) {
  const doctorId = decodeToken()?.id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`/doctor/${doctorId}/details`)
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [doctorId]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className="card shadow-lg border-primary"
      style={{
        position: "absolute",
        top: "60px",
        right: "20px",
        width: "320px",
        zIndex: 1000,
      }}
    >
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <FaUserMd className="me-2" />
          Doctor Profile
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
      
      <div className="card-body">
        <div className="d-flex align-items-center mb-4">
          <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
            <FaUserMd size={24} className="text-primary" />
          </div>
          <div>
            <h6 className="mb-0 text-primary">{user?.name || "N/A"}</h6>
            <small className="text-muted">Medical Professional</small>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <FaEnvelope className="me-2 text-muted" />
            <div>
              <small className="text-muted">Email</small>
              <p className="mb-0" style={{ wordBreak: "break-word" }}>
                {user?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
        
        <button 
          className="btn btn-outline-danger w-100 mt-3 d-flex align-items-center justify-content-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
}