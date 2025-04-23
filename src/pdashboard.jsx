import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import hospitalLogo from './assets/hosp.jpg';
import axios from 'axios';
import './assets/patientdash.css';

const Pdashboard = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [doctors, setDoctors] = useState([]);

  // Check authentication status
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Handle logout
  useEffect(() => {
    if (logout) {
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    }
  }, [logout, navigate]);

  const handleLogout = () => {
    setLogout(true);
  };

  // Fetch doctors' data
  useEffect(() => {
    axios
      .get('https://hos-backend.onrender.com/doctors')
      .then((response) => setDoctors(response.data.data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  // Styles
  const shortIconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  };

  const hospitalNameStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2px',
  };

  const headerStyle = {
    backgroundColor: '#1E88E5', // Primary blue
    padding: '10px 20px',
  };

  const doctorGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  };

  const doctorBoxStyle = {
    backgroundColor: '#ffffff', // White background
    border: '2px solid #1E88E5', // Blue border
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  };

  const doctorBoxHoverStyle = {
    transform: 'scale(1.05)',
  };

  const buttonStyle = {
    backgroundColor: '#1E88E5', // Primary blue
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#1565C0', // Darker blue on hover
  };

  const titleStyle = {
    textAlign: 'center', // Centered
    fontSize: '2.5rem',
    marginBottom: '40px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 0 #1E88E5, 1px -1px 0 #1E88E5, -1px 1px 0 #1E88E5, 1px 1px 0 #1E88E5', // Light Blue border
    color: 'white', 
    fontFamily: "'Lato', sans-serif",
  };

  const subtitleStyle = {
    fontSize: '1.2rem', // Smaller font size
    color: '#666', // Gray color
    textAlign: 'center', // Centered
    marginBottom: '30px', // Space below the subtitle
    fontFamily: 'Arial, sans-serif', // Modern font
  };

  return (
    <div>
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-light" style={headerStyle}>
        <div style={hospitalNameStyle}>
          <img src={hospitalLogo} alt="Hospital Logo" style={shortIconStyle} />
          <span>MediFind VIT</span>
        </div>
        <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
          <li className="nav-item">
            <Link to="/dashboard1" className="nav-link text-light">
              Book an Appointment
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </li>
        </ul>
      </header>

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        <h1 style={titleStyle}>DOCTOR INFO</h1>
        <div style={doctorGridStyle}>
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              style={doctorBoxStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <p><strong>Name:</strong> {doctor.name}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Mobile:</strong> {doctor.mobile}</p>
              <p><strong>Speciality:</strong> {doctor.speciality}</p>
              <p><strong>Shift Start:</strong> {doctor.shiftstart}</p>
              <p><strong>Shift End:</strong> {doctor.shiftend}</p>
              <p><strong>Available Slots:</strong> {doctor.slot}</p>
              <p><strong>Appointments Left:</strong> {doctor.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pdashboard;