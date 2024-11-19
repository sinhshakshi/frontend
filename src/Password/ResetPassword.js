import React, { useState } from 'react';
import { useSearchParams,useNavigate  } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import './ResetPassword.css'; // Import the CSS file for styling
import MainFooter from '../Footermain/Footer';
import Header from "../component/Header";
import Swal from 'sweetalert2'; // Import SweetAlert2

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');

  // Password validation function
  const passwordValidationMessage = () => {
    if (newPassword.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(newPassword)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(newPassword)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(newPassword)) {
      return 'Password must contain at least one number.';
    }
    if (!/[\W_]/.test(newPassword)) {
      return 'Password must contain at least one special character.';
    }
    if (newPassword !== confirmPassword) {
      return 'New password and confirmation do not match.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const validationMessage = passwordValidationMessage();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show SweetAlert and redirect
        Swal.fire({
          title: 'Password Reset Successful',
          text: 'Your password has been successfully reset. Redirecting to login...',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate('/login'); // Redirect after the SweetAlert closes
        });
      } else {
        setError(data.error || 'Failed to reset the password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Header />
    <div className="reset-password-page">
      <h2 className="reset-password-title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        {/* New Password Field */}
        <div className="reset-password-field">
          <label className="reset-password-label" htmlFor="new-password">New Password:</label>
          <div className="reset-password-input-group">
            <input
              id="new-password"
              type={showNewPassword ? 'text' : 'password'}
              className="reset-password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
            <div
              className="reset-password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => e.key === 'Enter' && setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="reset-password-field">
          <label className="reset-password-label" htmlFor="confirm-password">Confirm Password:</label>
          <div className="reset-password-input-group">
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              className="reset-password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
            />
            <div
              className="reset-password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => e.key === 'Enter' && setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* Validation Message */}
        {passwordValidationMessage() && (
          <small className="reset-password-validation">{passwordValidationMessage()}</small>
        )}

        {/* Submit Button */}
        <button type="submit" className="reset-password-button">Reset Password</button>
      </form>

      {/* Feedback Messages */}
      {message && <p className="reset-password-success">{message}</p>}
      {error && <p className="reset-password-error">{error}</p>}
    </div>
    <MainFooter/>
    </>
  );
};

export default ResetPassword;
