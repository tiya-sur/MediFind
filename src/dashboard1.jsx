import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/dashboard.css';
import hospitalLogo from './assets/hosp.jpg';

const Dashboard1 = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (logout) {
      // Clear authentication status on logout
      localStorage.removeItem('isAuthenticated');
      // Redirect to the login page
      navigate('/login');
    }
  }, [logout, navigate]);

  const handleLogout = () => {
    setLogout(true);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    place: '',
    reason: '',
    doctor: '',
    slot: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

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
    backgroundColor: '#1E88E5', // Light blue header
    padding: '10px 20px',
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const response = await fetch('https://hos-backend.onrender.com/doctors');
      const data = await response.json();
      console.log('Doctors Data:', data); // Log the doctors data
      setDoctors(data.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const fetchSlotsForDoctor = async (name) => {
    try {
      const formattedDoctorName = name.toLowerCase().trim();
      console.log('Fetching slots for doctor:', formattedDoctorName); // Log the doctor name

      const response = await fetch(`https://hos-backend.onrender.com/doctors/${formattedDoctorName}/slots`);

      if (!response.ok) {
        throw new Error(`Failed to fetch slots. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Slots Data:', data); // Log the slots data
      setSlots(data.slots);
    } catch (error) {
      console.error('Error fetching slots for doctor:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'doctor') {
      const formattedDoctorName = value.toLowerCase().trim();
      fetchSlotsForDoctor(formattedDoctorName);
    }

    const formattedValue = name === 'gender' ? value.toLowerCase() : value;

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://hos-backend.onrender.com/doctors/updateAppointment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorName: formData.doctor,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400 && data.message === "All slots are filled. No slots available for appointment.") {
          // Display a specific message when all slots are filled
          alert('All slots are filled. No slots available for appointment. Please choose another slot or doctor.');
          return;
        } else {
          throw new Error(data.message || 'Error updating doctor count');
        }
      }

      const slotsResponse = await fetch(`https://hos-backend.onrender.com/doctors/${formData.doctor.toLowerCase().trim()}/slots`);
      const slotsData = await slotsResponse.json();

      if (!slotsResponse.ok) {
        throw new Error('Doctor not found');
      }

      setSlots(slotsData.slots);

      if (slotsData.slots.length === 0) {
        alert('No slots available for the selected doctor. Please choose another slot or doctor.');
        return;
      }

      const appointmentResponse = await fetch('https://hos-backend.onrender.com/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          gender: formData.gender,
          place: formData.place,
          reason: formData.reason,
          doctor: formData.doctor,
          slot: formData.slot,
        }),
      });

      if (appointmentResponse.ok) {
        alert('Appointment successful!');
      } else {
        const appointmentData = await appointmentResponse.json();
        throw new Error(appointmentData.message || 'Error creating appointment');
      }
    } catch (error) {
      console.error('Error handling appointment:', error);
      alert('Error processing appointment. Please try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Full viewport height
      }}
    >
      <header className="navbar navbar-expand-lg navbar-light px-2" style={headerStyle}>
        <div style={hospitalNameStyle}>
          <img src={hospitalLogo} alt="Hospital Logo" style={shortIconStyle} />
          <span>MediFind VIT</span>
        </div>
        <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-link text-light">
              Logout
            </button>
          </li>
        </ul>
      </header>

      <div
        style={{
          flex: 1, // Take up remaining space
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          padding: '20px',
        }}
      >
        <div
          className="dashboard1-container"
          style={{
            maxWidth: '800px',
            width: '100%',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1 style={{ textAlign: 'center', color: '#1E88E5', marginBottom: '20px' }}>Appointment Dashboard</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="form-group">
              <label htmlFor="name" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Mobile:
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Gender:
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="place" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Place:
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Reason:
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctor" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Doctor:
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="slot" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Slot:
              </label>
              <select
                id="slot"
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                required
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1E88E5' }}
              >
                <option value="">Select Slot</option>
                {slots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#1E88E5',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;