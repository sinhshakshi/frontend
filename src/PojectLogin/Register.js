


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCity, FaCalendarAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import pic from '../i/exambook.png';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [cityName, setCityName] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [membership, setMembership] = useState('');
  const [examShortcut, setExamShortcut] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!termsAccepted) {
      toast.error('Please accept the Terms and Conditions to continue.', {
        position: 'top-right',
      });
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        full_name: fullName,
        email_id: emailId,
        password,
        mobile_number: mobileNumber,
        dob,
        city_name: cityName,
        gender,
        category,
        membership,
        exam_shortcut: examShortcut,
      }),
    });

    if (response.ok) {
      toast.success('User registered successfully! Redirecting to login...', {
        position: 'top-right',
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      const { error } = await response.json();
      toast.error(error, {
        position: 'top-right',
      });
    }
  };


  const infotwo = () => {
    navigate('/');
  };
  
  return (
    <>
    <div className="register-container">
      <ToastContainer />
      <div className="register-content">
        <div className="register-left">
          {/* <h1>Testdesk</h1> */}
          <img onClick={infotwo} src={pic} alt="Moonstream Logo" className="register-logo" />
          <p>Welcome! Please register to create your account.</p>
          <button className="play-btn">Play</button>
        </div>

        <div className="register-right">
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>
            <p>Create your account. It's free and only takes a minute.</p>
            <div className="register-form-grid">
            <div className="register-test-input-groups">
              <div className="input-with-icon">
                <FaUser />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-test-input-groups">
  {/* Hidden dummy input to trick autofill */}
  <input
    type="text"
    style={{ display: 'none' }}
    autoComplete="off"
  />

  <div className="input-with-icon">
    <FaEnvelope />
    <input
      type="text" // Use "text" instead of "email" to avoid browser patterns
      placeholder="Email"
      value={emailId}
      onChange={(e) => setEmailId(e.target.value)}
      required
      autoComplete="off" // Explicitly disable autofill
      name="random-email-name" // Randomized name
    />
  </div>
</div>


<div className="register-test-input-groups">
  {/* Hidden dummy field to trick autofill */}
  <input
    type="text"
    style={{ display: 'none' }}
    autoComplete="off"
  />

  <div className="input-with-icon">
    <FaLock />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      autoComplete="new-password" // Use new-password to prevent autofill
      name="random-password-name" // Randomized name
    />
  </div>
</div>



            <div className="register-test-input-groups">
              <div className="input-with-icon">
                <FaPhone />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-test-input-groups">
              <div className="input-with-icon">
                <FaCalendarAlt />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-test-input-groups">
              <div className="input-with-icon">
                <FaCity />
                <input
                  type="text"
                  placeholder="City Name"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-test-input-groups">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option className="input-status-option" value="">Select Gender</option>
                <option className="input-status-option" value="Male">Male</option>
                <option  className="input-status-option" value="Female">Female</option>
                <option className="input-status-option" value="Other">Other</option>
              </select>
            </div>

            <div className="register-test-input-groups">
  <select
    id="category"
    className="input-category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  >
    <option className="input-status-option" value="">Select Category</option>
    <option className="input-status-option" value="SC">SC</option>
    <option className="input-status-option" value="ST">ST</option>
    <option className="input-status-option" value="OBC">OBC</option>
    <option className="input-status-option" value="General">General</option>
  </select>
</div>



<div className="register-test-input-groups">

  <select 
    id="membership" 
    className="input-membership" 
    value={membership} 
    onChange={(e) => setMembership(e.target.value)} 
    required
  >
    <option className="input-status-option" value="">Select Membership Type</option>
    <option className="input-status-option"value="Basic">Basic</option>
    <option className="input-status-option"value="Premium">Premium</option>
    <option className="input-status-option" value="VIP">VIP</option>
  </select>
</div>


            <div className="register-test-input-groups">
              <input
                type="text"
                placeholder="Exam Shortcut"
                value={examShortcut}
                onChange={(e) => setExamShortcut(e.target.value)}
              />
            </div>   </div>

            <div className="terms">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>I accept the Terms of Use and Privacy Policy</span>
            </div>


            <div className='mybuttonsignup'>
           
            <button type="submit" className="register-btn">
              Sign Up
            </button>   </div>
            <p className="signin-link">
              Already a member? <span onClick={() => navigate('/login')}>Sign In</span>
            </p> 
        
          
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;


