import React, { useState } from 'react';
import './DashboardHeader.css'; // Ensure you create this CSS file with the provided styles
import { useCookies } from 'react-cookie';
import logo from "../i/newlogo.gif";
import { useNavigate } from 'react-router-dom';


const DashboardHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['session_id', 'SSIDCE', 'SSDSD']); // Include cookies to remove
  const navigate = useNavigate();


  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    navigate('/choose-exam');
  };

  const home = () => {
     navigate('/');
  }

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${cookies.session_id}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.message); // Optional: Show success message
         // Redirect to home page after successful logout
     
        // Clear cookies after successful logout
        removeCookie('session_id');
        removeCookie('SSIDCE');
        removeCookie('SSDSD');
        // navigate("/");
        window.location.href = '/';
        // Optional: Redirect or perform any other necessary actions after successful logout
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.error); // Handle error accordingly
      }
    } catch (error) {
      console.error('Error during logout:', error); // Handle network or other errors
    }
  };

  return (
    <div className="dashboard-header">
       <div className="dashboard-header-part2">
       <div className="typing-brand">    
          <img onClick={home}
            src={logo} 
            alt="Brand Logo"
            className="typing-brand-logo"
          />
        </div>
      {/* <div className="header-title">Dashboard</div> */}
      
      <div className="header-notification">Notification</div>
      
      <div className="header-account" onClick={toggleDropdown}>
        Give tests
     
      </div> </div>
      <div className="dashboard-header-part2">
      <div className="header-logout" onClick={handleLogout}>Logout</div>
   </div>   </div>
  );
};

export default DashboardHeader;
