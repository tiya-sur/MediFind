import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hospitalLogo from './assets/hosp.jpg';

const styles = {
  header: {
    backgroundColor: '#1E88E5', 
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    fontFamily: "'Montserrat', sans-serif",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
    borderRadius: '50%',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Montserrat', sans-serif",
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    fontFamily: "'Lato', sans-serif",
  },
  form: {
    backgroundColor: '#FFFFFF', 
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #1E88E5',
    borderRadius: '5px',
    fontFamily: "'Lato', sans-serif",
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#1E88E5', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    transition: 'background-color 0.2s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#0A2647',
    transform: 'scale(1.05)',
  },
  message: {
    color: '#FF0000', 
    textAlign: 'center',
    marginTop: '10px',
    fontFamily: "'Lato', sans-serif",
  },
};

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin') {
     
      localStorage.setItem('adminToken', 'valid');
      navigate('/dashboard');
    } else {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={hospitalLogo} alt="Hospital Logo" style={styles.logoImage} />
          <span style={styles.logoText}>MediFind VIT</span>
        </div>
      </header>

      {/* Login Form */}
      <div style={styles.container}>
        <form style={styles.form} onSubmit={handleLogin}>
          <h2 style={{ textAlign: 'center', color: '#1E88E5', fontFamily: "'Montserrat', sans-serif" }}>
            ADMIN LOGIN
          </h2>
          <div>
            <label htmlFor="email" style={{ color: '#1E88E5', fontFamily: "'Lato', sans-serif" }}>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" style={{ color: '#1E88E5', fontFamily: "'Lato', sans-serif" }}>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Submit
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Admin;
