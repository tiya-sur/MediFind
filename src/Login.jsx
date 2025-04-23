import {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './assets/hospital.css';
import hospitalLogo from './assets/hosp.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
    backgroundColor: '#1E88E5',
    padding: '10px 20px',
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('*All fields are required');
      return;
    }

    axios
      .post('https://hos-backend.onrender.com/Login', { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Success') {
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/pdashboard');
        } else {
          setErrorMessage('Account does not exist');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Login failed. Please try again.');
      });
  };

  return (
    <div
      className="hos"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', 
      }}
    >
      <header className="navbar navbar-expand-lg navbar-light px-2" style={headerStyle}>
        <div style={hospitalNameStyle}>
          <img src={hospitalLogo} alt="Hospital Logo" style={shortIconStyle} />
          <span>MediFind VIT</span>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '500px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ textAlign: 'center', color: '#1E88E5', marginBottom: '20px' }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" style={{ fontWeight: 'bold', color: '#1E88E5' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                style={{ marginBottom: '15px' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-0"
              style={{ backgroundColor: '#1E88E5', border: 'none', padding: '10px', fontSize: '16px', color: '#fff' }}
            >
              Login
            </button>
            {message && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{message}</div>}
          </form>
          <br />
          <p style={{ textAlign: 'center', color: '#1E88E5' }}>Don't Have an Account?</p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            style={{ color: '#1E88E5', padding: '10px', fontSize: '16px', borderColor: '#1E88E5' }}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;