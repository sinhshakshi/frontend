import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Register.css";

const RegisterAdminTyping = () => {
  const [full_name, setFullName] = useState('');
  const [email_id, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register-admin-typeforadmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_name, password, email_id, mobile_number }),
      });

      if (response.ok) {
        const { message } = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: message,
        });
        navigate('/admintype-for-login'); // Redirect to login page
      } else {
        const { error } = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error,
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Network error',
      });
    }
  };

  return (
    <div className="container-for-register">
      <form className="register-form-admin" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="register-admin-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email_id}
          onChange={(e) => setEmailId(e.target.value)}
          required
          className="register-admin-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="register-admin-input"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile_number}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          className="register-admin-input"
        />
        <button type="submit" className="register-admin-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterAdminTyping;
