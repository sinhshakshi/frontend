import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import './AdminHeader.css';

const AdminHeader = ({ toggleSidebar, sidebarVisible }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['myadmin']);
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const tokenAdmin = cookies.myadmin;
        if (!tokenAdmin) {
          throw new Error('No token found');
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkaccessadmin`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
          },
        });

        if (!response.ok) {
          throw new Error('Access denied');
        }

        const result = await response.json();
        if (result.message !== 'Access granted') {
          navigate('/admintype-for-login');
        } else {
          fetchAdminData(tokenAdmin);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have permission to access this page.',
        });
        navigate('/admintype-for-login');
      }
    };

    const fetchAdminData = async (tokenAdmin) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin-user-data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const result = await response.json();
        console.log(result.user); // Log the user data
        setAdminName(result.user.full_name); // Access the full_name property inside the user object
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    checkAccess();
  }, [cookies, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logout-admin-ebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.myadmin}`
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      removeCookie('myadmin', { path: '/' });
      localStorage.removeItem('activeComponent');
      localStorage.removeItem('openGroups');
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        text: 'You have been logged out successfully.',
      });
      navigate('/admintype-for-login');
    } catch (error) {
      console.error('Error during logout:', error);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'There was a problem logging out.',
      });
    }
  };

  return (
    <header className="header-admin-ebook">
      <div className="admin-header__container">
        <div className="admin-header__left">
          <button className="admin-header__toggle-btn" onClick={toggleSidebar}>
            {sidebarVisible ? <FaTimes className="admin-header__icon" /> : <FaBars className="admin-header__icon" />}
          </button>
          <h1 className="admin-header__title">Admin Panel</h1>
        </div>
        <nav className="admin-header__nav">
          <Link to="/" className="admin-header__link">Home</Link>
         
          {cookies.myadmin ? (
            <>
              <span className="admin-header__profile">{adminName}</span>
              <button className="admin-header__link" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/admintype-for-login" className="admin-header__link">Login</Link>
              <Link to="/admintype-for-register" className="admin-header__link">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
