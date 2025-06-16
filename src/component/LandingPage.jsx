import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DoctorProfileCard from './doctor/DoctorProfileCard';
import PatientProfileCard from './patient/ProfileCard';
import decodeToken from '../utils/decodeToken';
import logo from '../assets/logo.png';

export const LandingPage = () => {
    const navigate = useNavigate();
const token = localStorage.getItem('token');
 const [showProfile, setShowProfile] = useState(false);
const role = decodeToken()?.role || ''; 
const handleRegisterView = (e) => {
  e.preventDefault();
  if (token) {
   
     if (role === 'Doctor') navigate('/doctor');
    else if (role === 'Patient') navigate('/patient');
    else {
      alert('Unknown role');
      return;
   }
}
    else {
    navigate('/register');
  }
};
  const handleDashboardView = (e) => {
  e.preventDefault();
  if (token) {
   
     if (role === 'Doctor') navigate('/doctor');
    else if (role === 'Patient') navigate('/patient');
    else {
      alert('Unknown role');
      return;
    }
  }
}
    
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
            <img src={logo} style={{width:"30px"}} alt="" />
            <a className="navbar-brand fw-bold text-primary" href="#">CarePlus</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                    <li className="nav-item"><a className="nav-link" href="#blog">Blog</a></li>
                    <li className="nav-item"><a className="nav-link" href="#service">Services</a></li>
                    {!token ? (
                      <li className="nav-item ms-lg-3">
                        <a
                          className="btn btn-primary"
                          href="/register"
                          onClick={handleRegisterView}
                        >
                          Register
                        </a>
                      </li>
                    ) : (
                      <li className="nav-item ms-lg-3 position-relative d-flex align-items-center" style={{ minWidth: 48, minHeight: 48 }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          alt="Profile"
                          width={40}
                          height={40}
                          className="rounded-circle border border-2 border-white"
                          style={{ cursor: 'pointer', objectFit: 'cover' }}
                          onClick={() => setShowProfile((prev) => !prev)}
                        />
                        {role === 'doctor' && (
                          <span
                            className="position-absolute"
                            style={{
                              right: 6,
                              bottom: 6,
                              width: '12px',
                              height: '12px',
                              backgroundColor: '#198754',
                              borderRadius: '50%',
                              border: '2px solid #fff',
                              display: 'inline-block'
                            }}
                          ></span>
                        )}
                        {showProfile && (
                          <div
                            className="position-absolute end-0 mt-2"
                            style={{
                              top: '100%',
                              zIndex: 1050,
                            }}
                          >
                            {role === 'Doctor' && (
                              <DoctorProfileCard onClose={() => setShowProfile(false)} />
                            )}
                            {role === 'Patient' && (
                              <PatientProfileCard onClose={() => setShowProfile(false)} />
                            )}
                          </div>
                        )}
                      </li>
                    )}
                    {token && (
                      <li className="nav-item ms-lg-3">
                        <a
                          className="btn btn-primary"
                          href="/register"
                          onClick={handleDashboardView}
                        >
                          Dashboard
                        </a>
                      </li>
                    )}
                </ul>
                
            </div>
        </div>
    </nav>

    
    <section className="hero-section text-center">
        <div className="container">
            <p className="text-uppercase fw-bold">COMPASSIONATE CARE, ADVANCED MEDICINE</p>
            <h1 className="display-4 fw-bold mb-4">Your Health, Our Priority</h1>
            <a href="#dept" className="btn btn-primary btn-lg px-4">Explore Services</a>
        </div>
    </section>

   
    <section id="about" className="py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h2>Welcome to CarePlus Clinic</h2>
                    <p className="lead">At CarePlus, we are committed to providing high-quality, personalized healthcare. Our goal is to ensure your wellness journey is smooth, reassuring, and effective—every step of the way.</p>
                    <ul className="list-unstyled">
                        <li className="mb-2"><i className="fas fa-check text-primary me-2"></i> Easy appointment booking</li>
                        <li className="mb-2"><i className="fas fa-check text-primary me-2"></i> Trusted doctors and specialists</li>
                        <li className="mb-2"><i className="fas fa-check text-primary me-2"></i> Care that feels like home</li>
                    </ul>
                    <a href="#" className="btn btn-outline-primary mt-3">Learn More</a>
                </div>
                <div className="col-md-6">
                    <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Clinic" className="img-fluid rounded" />
                </div>
            </div>
        </div>
    </section>

    
    <section id="dept" className="py-5 bg-light">
        <div className="container">
            <div className="text-center mb-5">
                <h2>Our Departments</h2>
                <p className="lead">CarePlus offers a wide range of medical services tailored to you and your family's needs.</p>
            </div>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card department-card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-tooth text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h5 className="card-title">Dentistry</h5>
                            <p className="card-text">Healthy smiles for a happier life.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card department-card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-heartbeat text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h5 className="card-title">Cardiology</h5>
                            <p className="card-text">Comprehensive heart care you can trust.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card department-card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-ear text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h5 className="card-title">ENT</h5>
                            <p className="card-text">Caring for your ears, nose, and throat with precision.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card department-card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-brain text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h5 className="card-title">Neurology</h5>
                            <p className="card-text">Advanced neurological care for better living.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card department-card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-vial text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h5 className="card-title">Pathology</h5>
                            <p className="card-text">Accurate diagnosis with modern testing methods.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card department-card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-syringe text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h5 className="card-title">Vaccination</h5>
                            <p className="card-text">Protecting your health through prevention.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="service" className="py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Appointment" className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h3>Book Your Appointment Easily</h3>
                    <p>Skip the queue and consult your doctor from the comfort of your home. Choose your preferred doctor, date, and time—all in a few clicks!</p>
                    <a href="/patient" className="btn btn-primary mt-3">Book Now</a>
                </div>
            </div>
        </div>
    </section>


    <section id="blog" className="py-5 bg-light">
        <div className="container">
            <div className="text-center mb-5">
                <h2>Meet Our Experts</h2>
                <p className="lead">Our experienced doctors are here to care, listen, and help you feel better.</p>
            </div>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" className="card-img-top" alt="Doctor" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Dr. Sarah Johnson</h5>
                            <p className="text-muted">Cardiologist</p>
                            <p className="card-text">Helping hearts beat healthier.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" className="card-img-top" alt="Doctor" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Dr. Michael Chen</h5>
                            <p className="text-muted">Neurologist</p>
                            <p className="card-text">Expert care for brain and nerve health.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" className="card-img-top" alt="Doctor" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Dr. Emily Wilson</h5>
                            <p className="text-muted">Dentist</p>
                            <p className="card-text">Brightening lives with confident smiles.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
    <section className="py-5">
        <div className="container">
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-comment-medical text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h4>Consult a Doctor</h4>
                            <p>Get expert medical advice when you need it the most.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-calendar-check text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h4>Easy Scheduling</h4>
                            <p>Pick your preferred date and time effortlessly.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-user-md text-primary mb-3" style={{ marginRight: "10px", color: "red" }}></i>
                            <h4>Search Specialists</h4>
                            <p>Find the right expert for your specific health needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="py-5 bg-light">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3>Specialty Services</h3>
                    <p>We offer care in various specialties to serve every stage of life—because your health matters, always.</p>

                    <div className="row mt-4">
                        <div className="col-6">
                            <ul className="list-unstyled">
                                <li className="mb-2">Pediatrics</li>
                                <li className="mb-2">Orthopedics</li>
                                <li className="mb-2">Cardiology</li>
                                <li className="mb-2">Neurology</li>
                                <li className="mb-2">Geriatrics</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul className="list-unstyled">
                                <li className="mb-2">Dental Care</li>
                                <li className="mb-2">Radiology</li>
                                <li className="mb-2">Gastroenterology</li>
                                <li className="mb-2">Obstetrics</li>
                                <li className="mb-2">Rehabilitation</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h3>Working Hours</h3>
                    <ul className="list-unstyled">
                        <li className="mb-2"><strong>Monday - Friday</strong>: 8:00 AM - 6:00 PM</li>
                        <li className="mb-2"><strong>Saturday</strong>: 8:00 AM - 4:00 PM</li>
                        <li className="mb-2"><strong>Sunday</strong>: Closed</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <footer className="py-4">
        <div className="container text-center">
            <p className="mb-0">© 2025 CarePlus. Crafted with ❤️ to serve your health better.</p>
        </div>
    </footer>
    <div style={{ marginTop: "20px" }}>Hello</div>
    </div>
  )
}
