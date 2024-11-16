import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './ForgetPassword.css'; // Import the CSS file

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/forget-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_id: email }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.error,
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send the reset link. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <div className="forgetpass-container">
      <h2 className="forgetpass-title">Forget Password</h2>
      <form onSubmit={handleSubmit} className="forgetpass-form">
        <label className="forgetpass-label">Email Address</label>
        <input
          type="email"
          className="forgetpass-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="forgetpass-button">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
