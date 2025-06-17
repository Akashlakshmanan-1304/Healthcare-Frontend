import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import decodeToken from "../../utils/decodeToken";

export default function PatientEditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.patientId || decodeToken()?.id;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`/users/${userId}/details`)
        .then((res) => {
          setForm((prev) => ({
            ...prev,
            name: res.data.name || "",
            phone: res.data.phone || "",
          }));
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load details");
          setLoading(false);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.password) {
      setError("Password is required to edit profile.");
      return;
    }
    try {
      await axios.put(`/users/${userId}/edit`, form);
      setSuccess("Profile updated successfully.");
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Failed to update profile."
      );
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 500 }}>
      <h3 className="mb-4">Edit Patient Profile</h3>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password to confirm changes"
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
}