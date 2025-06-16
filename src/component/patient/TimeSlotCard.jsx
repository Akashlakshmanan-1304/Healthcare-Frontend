import React from 'react';
import { FaCalendarCheck, FaClock } from 'react-icons/fa';

function TimeSlotCard({ slot, onBook }) {
  console.log("TimeSlotCard rendered with slot:", slot);
  
  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10" style={{ maxWidth: "80%" }}>
          <div className="card mb-3 shadow-sm border-primary">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FaClock className="text-primary me-3" size={20} />
                <h6 className="mb-0">{slot}</h6>
              </div>
              <button 
                className="btn btn-success d-flex align-items-center"
                onClick={() => onBook(slot)}
              >
                <FaCalendarCheck className="me-2" />
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSlotCard;