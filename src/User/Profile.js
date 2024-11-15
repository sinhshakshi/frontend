// components/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useCookies } from 'react-cookie';
import pic from '../i/profile.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 'user-id'; // Replace with the actual user ID
  const [cookies] = useCookies(['token, email_id']);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/profile/${cookies.email_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="profile-page">
    <div className="profile-header">
      <img src={pic} className="profile-image" />
      <div className="header-text">
        <h2>{user.full_name}</h2>
        <p>Welcome to your profile page</p>
       
      </div>
    </div>

      <div className="profile-content">
        <div className="profile-info">
        <div className="info-section-personal">
          <h3>Personal Information</h3>
          <div className="info-section">
            <p><strong>Full Name:</strong> {user.full_name}</p>
            <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>City:</strong> {user.city_name}</p>
          </div> </div>
          <div className="info-section-personal">
          <h3>Contact Information</h3>
          <div className="info-section">
            <p><strong>Email:</strong> {user.email_id}</p>
            <p><strong>Mobile Number:</strong> {user.mobile_number}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <p><strong>Membership:</strong> {user.membership}</p>
            <p><strong>Exam Shortcut:</strong> {user.exam_shortcut}</p>
          </div>
        </div></div>

      
      </div>
    </div>
  );
};

export default Profile;
