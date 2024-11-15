import React, { useState } from 'react';
import './ContactUs.css'; // Ensure to create a CSS file for styling
import MainFooter from '../Footermain/Footer';
import TypingHeader from '../component/Header';

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName || !email || !message) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Your message has been sent successfully!');
        setFullName('');
        setEmail('');
        setMessage('');
      } else {
        setError('There was an error sending your message. Please try again later.');
      }
    } catch (err) {
      setError('There was an error sending your message. Please try again later.');
    }
  };

  return (
    <>
      <TypingHeader />
      <div className="contactus-container">
        <h1 className="contactus-title">Contact Us</h1>
        
        <div className="contactus-options">
          <div className="contactus-option">
            <h2>By Phone</h2>
            <p>Get telephone support by signing into your account.</p>
            <a href="/login" className="contactus-link">Log In</a>
          </div>
          <div className="contactus-option">
            <h2>Start a New Case</h2>
            <p>Just send us your questions or concerns by starting a new case and we will give you the help you need.</p>
            <a href="/start-case" className="contactus-link">Start Here</a>
          </div>
          {/* <div className="contactus-option">
            <h2>Live Chat</h2>
            <p>Chat with a member of our in-house team.</p>
            <a href="/chat" className="contactus-link">Start Chat</a>
          </div> */}
   
        </div>

        <form className="contactus-form" onSubmit={handleSubmit}>
          {error && <div className="contactus-error-message">{error}</div>}
          {success && <div className="contactus-success-message">{success}</div>}

          <label htmlFor="fullName" className="contactus-label">Your Name <span className="contactus-required">*</span></label>
          <input
            type="text"
            id="fullName"
            className="contactus-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email" className="contactus-label">Email Address <span className="contactus-required">*</span></label>
          <input
            type="email"
            id="email"
            className="contactus-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message" className="contactus-label">Your Message <span className="contactus-required">*</span></label>
          <textarea
            id="message"
            className="contactus-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="contactus-button">Send Message</button>
        </form>
      </div>
      <MainFooter />
    </>
  );
};

export default ContactUs;
