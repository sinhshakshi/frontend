

import React, { useState } from 'react';
import './ForgetPassword.css'; // Import the CSS file
import Header from "../component/Header";
import MainFooter from '../Footermain/Footer';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // State to store the message
  const [loading, setLoading] = useState(false); // State for "sending" status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

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
        setMessage({
          text: 'Password reset link has been sent to your email. Please check your inbox or spam folder.',
          type: 'success',
        });
      } else {
        setMessage({ text: data.error || 'Failed to send the reset link.', type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'An unexpected error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false); // Reset loading state after response
    }
  };

  return (
    <>
      <Header />
      <div className="forgetpass-container">
        <h2 className="forgetpass-title">Forget Password</h2>
        {message.text && (
          <div className={`forgetpass-message ${message.type}`}>
            {message.text}
          </div>
        )}
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
          <button type="submit" className="forgetpass-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
      <MainFooter />
    </>
  );
};

export default ForgetPassword;
