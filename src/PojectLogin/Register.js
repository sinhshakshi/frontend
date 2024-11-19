// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
// import './Register.css';
// import pic from '../i/signup.jpg';

// const Register = () => {
//   const [fullName, setFullName] = useState('');
//   const [emailId, setEmailId] = useState('');
//   const [password, setPassword] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [dob, setDob] = useState('');
//   const [cityName, setCityName] = useState('');
//   const [gender, setGender] = useState('');
//   const [status, setStatus] = useState('');
//   const [membership, setMembership] = useState('');
//   const [examShortcut, setExamShortcut] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         full_name: fullName,
//         email_id: emailId,
//         password,
//         mobile_number: mobileNumber,
//         dob,
//         city_name: cityName,
//         gender,
//         status,
//         membership,
//         exam_shortcut: examShortcut
//       })
//     });

//     if (response.ok) {
//       toast.success('User registered successfully! Redirecting to login...', {
//         position: "top-right",
//         autoClose: 3000, // Auto-close after 3 seconds
//       });
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//     } else {
//       const { error } = await response.json();
//       toast.error(error, {
//         position: "top-right",
//       });
//     }
//   };

//   return (
//     <div className="container-for-register-project">
//       <ToastContainer /> {/* Add ToastContainer here */}
//       <div className="left-side">
//         <img src={pic} alt="Sign Up" className="sign-up-img" />
//       </div>
//       <div className="right-side">
//         <div className="video-instructions">
//           <h3>How to Register</h3>
//           <video width="100%" height="auto" controls>
//             <source src="your-video-url.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//         <form onSubmit={handleSubmit} className="register-login-form">
//           <h2>Register</h2>
//           <div className="form-grid">
//             <div className="register-admin-form">
//               <label htmlFor="fullName">Full Name</label>
//               <input type="text" id="fullName" className="input-full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="emailId">Email</label>
//               <input type="email" id="emailId" className="input-email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="password">Password</label>
//               <input type="password" id="password" className="input-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="mobileNumber">Mobile Number</label>
//               <input type="text" id="mobileNumber" className="input-mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="dob">Date of Birth</label>
//               <input type="date" id="dob" className="input-dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="cityName">City Name</label>
//               <input type="text" id="cityName" className="input-city-name" value={cityName} onChange={(e) => setCityName(e.target.value)} required />
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="gender">Gender</label>
//               <select id="gender" className="input-gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="status">Status</label>
//               <select id="status" className="input-status" value={status} onChange={(e) => setStatus(e.target.value)} required>
//                 <option value="">Select Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//                 <option value="Pending">Pending</option>
//               </select>
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="membership">Membership</label>
//               <select id="membership" className="input-membership" value={membership} onChange={(e) => setMembership(e.target.value)} required>
//                 <option value="">Select Membership Type</option>
//                 <option value="Basic">Basic</option>
//                 <option value="Premium">Premium</option>
//                 <option value="VIP">VIP</option>
//               </select>
//             </div>
//             <div className="register-admin-form">
//               <label htmlFor="examShortcut">Exam Shortcut</label>
//               <input type="text" id="examShortcut" className="input-exam-shortcut" value={examShortcut} onChange={(e) => setExamShortcut(e.target.value)} required />
//             </div>
//           </div>
//           <div className="user-register">
//           <button type="submit">Register</button></div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


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
  const [status, setStatus] = useState('');
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
        status,
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
    id="status" 
    className="input-status" 
    value={status} 
    onChange={(e) => setStatus(e.target.value)} 
    required
  >
    <option className="input-status-option"  value="">Select Status</option>
    <option className="input-status-option" value="Active">Active</option>
    <option className="input-status-option" value="Inactive">Inactive</option>
    <option className="input-status-option" value="Pending">Pending</option>
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


