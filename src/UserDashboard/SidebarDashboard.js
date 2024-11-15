


import React, { useState } from 'react';
import { FaTachometerAlt, FaUser, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import './SidebarDashboard.css';
import { Link } from 'react-router-dom'; // Import Link
import { useCookies } from 'react-cookie'; // Import useCookies for cookie management

const SidebarDashboard = ({ onMenuClick }) => {
  const [activeMenu, setActiveMenu] = useState('UserOverallChart'); // State to keep track of active menu
  const [cookies, removeCookie] = useCookies(['token', 'email_id', 'userDetails']); // Cookie management

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set the active menu item
    onMenuClick(menu);   // Call the parent function
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${cookies.token}`, // Include token in the request
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Optional: Show success message
        
        // Clear cookies after successful logout
        removeCookie('token');
        removeCookie('email_id');
        removeCookie('userDetails');

        // Redirect to home page after successful logout
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.error); // Handle error accordingly
      }
    } catch (error) {
      console.error('Error during logout:', error); // Handle network or other errors
    }
  };

  return (
    <div className="sidebar-dashboard-container">  {/* Updated class */}
      <ul className="sidebar-menu">
        <li 
          className={activeMenu === 'UserOverallChart' ? 'sidebar-item active' : 'sidebar-item'} 
          onClick={() => handleMenuClick('UserOverallChart')}
        >
          <FaTachometerAlt className="icon" /> Typing Speed Chart
        </li>
        <li 
          className={activeMenu === 'Profile' ? 'sidebar-item active' : 'sidebar-item'} 
          onClick={() => handleMenuClick('Profile')}
        >
          <FaUser className="icon" /> Profile
        </li>
        <li 
          className={activeMenu === 'Settings' ? 'sidebar-item active' : 'sidebar-item'} 
          onClick={() => handleMenuClick('Settings')}
        >
          <FaCog className="icon" /> Settings
        </li>
        <Link to="/" style={{ textDecoration: 'none' }}> {/* Navigation to Home */}
          <li 
            className={activeMenu === 'Home' ? 'sidebar-item active' : 'sidebar-item'} 
            onClick={() => handleMenuClick('Home')}
          >
            <FaHome className="icon" /> Home
          </li>
        </Link>
        <li 
          className="sidebar-item" 
          onClick={handleLogout} // Call handleLogout on click
        >
          <FaSignOutAlt className="icon" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default SidebarDashboard;
