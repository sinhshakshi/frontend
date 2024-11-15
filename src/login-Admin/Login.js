import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import './Login.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LoginAdminTyping = () => {
  const [email_id, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['myadmin', 'email_id_admin']);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login-admin-typeforadmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_id, password, mobile_number }),
      });

      if (response.ok) {
        const { tokenAdmin } = await response.json();

        if (tokenAdmin) {
          setCookie("myadmin", tokenAdmin, { path: "/", maxAge: 24 * 60 * 60 });
          setCookie("email_id_admin", email_id, { path: "/", maxAge: 24 * 60 * 60 });
          navigate('/admin_dashboard');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Token not found in the response',
          });
        }
      } else {
        const { message } = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: message,
        });
      }
    } catch (error) {
      console.error('Network error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Network error',
      });
    }
  };

  const toSignup = () => {
    navigate("/register-admin");
  };

  return (
    <div className="container-for-login">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin log in</h2>

        <div className="EmailInput">
          <label htmlFor="email_id">Email</label>
          <span className="for-signup">
            Need an account? <span className="s" onClick={toSignup}>Sign up</span>
          </span>
        </div>

        <input
          className='userName-user'
          type="email"
          id="email_id"
          value={email_id}
          onChange={(e) => setEmailId(e.target.value)}
          required
        />

        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="text"
          className='userName-user'
          id="mobile_number"
          value={mobile_number}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <span className="eye-icon" onClick={togglePasswordVisibility}>
          {showPassword ? (
            <>
              <AiOutlineEyeInvisible className="eyeicon" /> Hide
            </>
          ) : (
            <>
              <AiOutlineEye className="eyeicon" /> Show
            </>
          )}
        </span>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-button" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginAdminTyping;
