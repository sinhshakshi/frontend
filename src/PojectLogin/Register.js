import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import './Register.css';
import pic from '../i/signup.jpg';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [cityName, setCityName] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [membership, setMembership] = useState('');
  const [examShortcut, setExamShortcut] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        full_name: fullName,
        email_id: emailId,
        password,
        mobile_number: mobileNumber,
        dob,
        city_name: cityName,
        gender,
        status,
        membership,
        exam_shortcut: examShortcut
      })
    });

    if (response.ok) {
      toast.success('User registered successfully! Redirecting to login...', {
        position: "top-right",
        autoClose: 3000, // Auto-close after 3 seconds
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      const { error } = await response.json();
      toast.error(error, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container-for-register-project">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="left-side">
        <img src={pic} alt="Sign Up" className="sign-up-img" />
      </div>
      <div className="right-side">
        <div className="video-instructions">
          <h3>How to Register</h3>
          <video width="100%" height="auto" controls>
            <source src="your-video-url.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <form onSubmit={handleSubmit} className="register-login-form">
          <h2>Register</h2>
          <div className="form-grid">
            <div className="register-admin-form">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" className="input-full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="register-admin-form">
              <label htmlFor="emailId">Email</label>
              <input type="email" id="emailId" className="input-email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
            </div>
            <div className="register-admin-form">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="input-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="register-admin-form">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input type="text" id="mobileNumber" className="input-mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
            </div>
            <div className="register-admin-form">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" className="input-dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>
            <div className="register-admin-form">
              <label htmlFor="cityName">City Name</label>
              <input type="text" id="cityName" className="input-city-name" value={cityName} onChange={(e) => setCityName(e.target.value)} required />
            </div>
            <div className="register-admin-form">
              <label htmlFor="gender">Gender</label>
              <select id="gender" className="input-gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="register-admin-form">
              <label htmlFor="status">Status</label>
              <select id="status" className="input-status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="register-admin-form">
              <label htmlFor="membership">Membership</label>
              <select id="membership" className="input-membership" value={membership} onChange={(e) => setMembership(e.target.value)} required>
                <option value="">Select Membership Type</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div className="register-admin-form">
              <label htmlFor="examShortcut">Exam Shortcut</label>
              <input type="text" id="examShortcut" className="input-exam-shortcut" value={examShortcut} onChange={(e) => setExamShortcut(e.target.value)} required />
            </div>
          </div>
          <div className="user-register">
          <button type="submit">Register</button></div>
        </form>
      </div>
    </div>
  );
};

export default Register;
