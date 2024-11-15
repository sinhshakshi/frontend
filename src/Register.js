import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const Register = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailId = (event) => {
    setEmailId(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email_id: emailId, password })
    });

    if (response.ok) {
      alert('User registered successfully');
      navigate('/');
    } else {
      const { message } = await response.json();
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-login-form">
      <h2>Register</h2>
      <input type="text" placeholder="Email" value={emailId} onChange={handleEmailId} required className="form-input" />
      <input type="password" placeholder="Password" value={password} onChange={handlePassword} required className="form-input" />
      <button type="submit" className="form-button">Register</button>
    </form>
  );
};

export default Register;
