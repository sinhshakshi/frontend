// RegisterPromptModal.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './RegisterPromptModal.css';

const RegisterPromptModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    password: '',
    mobileNumber: '',
    dob: '',
    cityName: '',
    gender: '',
    status: '',
    membership: '',
    examShortcut: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire('Success', 'User registered successfully!', 'success');
        onClose();
      } else {
        Swal.fire('Error', 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire('Error', 'An error occurred. Please try again.', 'error');
    }
  };

  return (
    <div className="modal-form">
      <h3>Register</h3>
      <div className="form-grid">
        {/* Map through formData keys to create input fields dynamically */}
        {Object.keys(formData).map((key) => (
          <div key={key} className="register-admin-form">
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPromptModal;
