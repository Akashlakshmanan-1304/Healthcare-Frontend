import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './component/ProtectedRoute';
import decodeToken from './utils/decodeToken';
import TimeSlots from './component/patient/TimeSlots';
import AddConsultation from './component/doctor/AddConsultation';
import Appointment from './component/patient/Appointment';
import BookAppointment from './component/patient/BookAppointment';
import { LandingPage } from './pages/LandingPage';
import NotFound from './pages/NotFound';
import PatientEditPage from './component/patient/PatientEditPage';
import DoctorEditPage from './component/doctor/DoctorEditPage';

function App() {
  
const[token,setToken]=useState(localStorage.getItem('token'));
const[role,setRole]=useState(localStorage.getItem('role'));

if(token){
  const payload=decodeToken();
  const isExpired=Date.now()>=payload.exp*1000;
  if(isExpired){
    localStorage.clear();
    console.log("Token Expired");
    window.location.href="/login";
  }
}
else{
  console.log("Token Empty");
}
  return (
    <>
     <Router>
      <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole}/>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/doctor" element={<ProtectedRoute role="Doctor"><DoctorDashboard/></ProtectedRoute>}></Route>
          <Route path="/patient" element={<ProtectedRoute role="Patient"><PatientDashboard/></ProtectedRoute>}></Route>
          <Route path="/time-slots" element={<ProtectedRoute role="Patient"><TimeSlots/></ProtectedRoute>}></Route>
          <Route path="/add-consultation/:appointmentId" element={<ProtectedRoute role="Doctor"><AddConsultation/></ProtectedRoute>}></Route>
          <Route path="/book-appointment" element={<ProtectedRoute role="Patient"><Appointment/></ProtectedRoute>}></Route>
          <Route path="/time-slots" element={<ProtectedRoute role="Doctor"><TimeSlots/></ProtectedRoute>}></Route>
          <Route path="/book-appointment/book" element={<ProtectedRoute role="Patient"><BookAppointment/></ProtectedRoute>}></Route>
          <Route path="/patient/edit" element={<ProtectedRoute role="Patient"><PatientEditPage/></ProtectedRoute>}></Route>
          <Route path="/doctor/edit" element={<ProtectedRoute role="Doctor"><DoctorEditPage/></ProtectedRoute>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
          </Routes>
    </Router>
    </>
  )
}

export default App
