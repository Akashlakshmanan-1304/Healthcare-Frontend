import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import decodeToken from "../../utils/decodeToken";
import { FaCalendarAlt, FaUserMd, FaArrowLeft, FaCheck } from "react-icons/fa";

export default function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const patientId = decodeToken()?.id;
  const { doctorId, slot } = location.state || {};
  const timeSlot = slot?.split("-")[0];
  console.log(patientId, doctorId, timeSlot);

  const handleBook = async () => {
    try {
      await axios.post("/appointments/book", {
        patientId,
        doctorId,
        timeSlot,
      });
      alert("Appointment booked successfully!");
      navigate("/patient");
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Failed to book appointment. Please try again.");
    }
    console.log("Slot", timeSlot);
  };

  if (!doctorId || !slot) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <FaUserMd className="me-2" />
          Missing doctor or time slot information.
        </div>
        <button 
          className="btn btn-outline-primary mt-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 d-flex align-items-center">
            <FaCalendarAlt className="me-2" />
            Confirm Appointment
          </h4>
        </div>
        <div className="card-body">
          <div className="mb-3 d-flex align-items-center">
            <FaUserMd className="text-primary me-3" size={20} />
            <div>
              <strong>Doctor ID:</strong> {doctorId}
            </div>
          </div>
          <div className="mb-4 d-flex align-items-center">
            <FaCalendarAlt className="text-primary me-3" size={20} />
            <div>
              <strong>Time Slot:</strong> {slot}
            </div>
          </div>
          <button 
            className="btn btn-success d-flex align-items-center"
            onClick={handleBook}
          >
            <FaCheck className="me-2" />
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}