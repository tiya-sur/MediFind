import React from 'react';
import { Link } from 'react-router-dom';
import hospitalLogo from './assets/hosp.jpg';
import emergency from './assets/emergency.jpg';
import surgery from './assets/surgery.jpg';
import ultra1 from './assets/ultra1.jpg';
import radiology from './assets/radiology.jpg';
import homeBackground from './assets/home.jpg'; 

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
    width: '60px',
    height: '60px',
    marginRight: '10px',
    borderRadius: '50%',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#FFFFFF', 
    fontFamily: "'Montserrat', sans-serif",
  },
  hero: {
    backgroundImage: `url(${homeBackground})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start', 
    color: 'white',
    textAlign: 'left',
    fontFamily: "'Montserrat', sans-serif",
    paddingLeft: '20px', 
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), -1px -1px 0 #1E88E5, 1px -1px 0 #1E88E5, -1px 1px 0 #1E88E5, 1px 1px 0 #1E88E5', // Light Blue border
    color: 'white', 
    fontFamily: "'Montserrat', sans-serif",
  },
  heroSubtitle: {
    fontSize: '24px',
    marginBottom: '40px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5), -1px -1px 0 #1E88E5, 1px -1px 0 #1E88E5, -1px 1px 0 #1E88E5, 1px 1px 0 #1E88E5', // Light Blue border
    color: 'white', 
    fontFamily: "'Lato', sans-serif",
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1E88E5',
    backgroundColor: 'white',
    border: '2px solid #1E88E5', 
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
    fontFamily: "'Montserrat', sans-serif",
  },
  buttonHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    borderColor: '#1E88E5', 
  },
  services: {
    padding: '60px 20px',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Lato', sans-serif",
  },
  servicesTitle: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '40px',
    color: '#1E88E5', 
    fontFamily: "'Montserrat', sans-serif",
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  serviceCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    fontFamily: "'Lato', sans-serif",
  },
  serviceCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  serviceIcon: {
    width: '60px',
    height: '60px',
    marginBottom: '10px',
  },
  serviceName: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#1E88E5', 
    fontFamily: "'Montserrat', sans-serif",
  },
  serviceDescription: {
    fontSize: '14px',
    color: '#666',
    fontFamily: "'Lato', sans-serif",
  },
  footer: {
    backgroundColor: '#1E88E5', 
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
  },
};

const serviceInfo = [
  {
    name: 'Emergency Care',
    image: emergency,
    description: '24/7 Emergency Care Services',
  },
  {
    name: 'Surgery Services',
    image: ultra1,
    description: 'State-of-the-Art Surgical Procedures',
  },
  {
    name: 'Radiology and Imaging',
    image: radiology,
    description: 'Advanced Radiology and Imaging',
  },
  {
    name: 'Specialist Consultations',
    image: surgery, // You can replace this with a new image
    description: 'Expert Consultations for All Medical Needs',
  },
];

function Home() {
  return (
    <div>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={hospitalLogo} alt="Hospital Logo" style={styles.logoImage} />
          <span style={styles.logoText}>MediFind VIT</span>
        </div>
      </header>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to MediFind VIT</h1>
        <p style={styles.heroSubtitle}>
          Your gateway to finding hospitals and specialists near VIT.
        </p>
        <div style={styles.buttonContainer}>
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Admin</button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={styles.button}>Patient</button>
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <section style={styles.services}>
        <h2 style={styles.servicesTitle}>Our Services</h2>
        <div style={styles.servicesGrid}>
          {serviceInfo.map((service, index) => (
            <div key={index} style={styles.serviceCard}>
              <img src={service.image} alt={service.name} style={styles.serviceIcon} />
              <h3 style={styles.serviceName}>{service.name}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 MediFind VIT. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;