import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import './TypingHeader.css';
import logo from "../i/newlogo.gif";
import { useCookies } from "react-cookie";
import Loading from '../Loading';

const TypingHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const { userDetails } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const [loading, setLoading] = useState(true); // Add loading state

  const checkAccess = async () => {
    if (cookies.token) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTyping`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.access === "access") {
            setIsLoggedIn(true); // If access is granted, set isLoggedIn to true
          } else {
            setIsLoggedIn(false); // If access is denied, set isLoggedIn to false
          }
        } else {
          setIsLoggedIn(false); // If response is not ok, set isLoggedIn to false
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setIsLoggedIn(false); // On error, set isLoggedIn to false
      }
    } else {
      setIsLoggedIn(false); // If no token, set isLoggedIn to false
    }

    setLoading(false); // Stop loading once the API call completes
  };

  // Call checkAccess when the component mounts
  useEffect(() => {
    checkAccess();
  }, [cookies.token]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // const toggleSearch = () => {
  //   setSearchOpen(!isSearchOpen);
  // };

  const handleHelpClick = () => {
    navigate('/help');
  };

  const handleBuyNowClick = () => {
    navigate('/buy-now');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    // Here you can implement the actual search functionality
  };

  const home = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const examclick = () => {
    navigate('/choose-exam');
  };

  const handleDashboardClick = () => {
    navigate('/user-dashboard');
  };

  // Close search pop-up on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSearchOpen]);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <header className="typing-header-container">
      <div className="typing-header-content">
        <div className="typing-brand" onClick={home}>
          <img src={logo} alt="Brand Logo" className="typing-brand-logo" />
        </div>

        <div className="typing-nav-menu">
          <div className="typing-nav-item" onClick={toggleDropdown}>
            Typing Test Links
            <div className={`typing-dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <div className="typing-dropdown-item" onClick={examclick}>SSC Typing Test</div>
              <div className="typing-dropdown-item" onClick={examclick}>Railways Typing Test</div>
            </div>
          </div>
          <div className="typing-nav-item typing-help-item" onClick={handleHelpClick}>Help</div>
          <div className="typing-nav-item typing-buy-now-item" onClick={handleBuyNowClick}>Buy Now</div>
          {/* <div className="typing-nav-item" onClick={toggleSearch}>Search</div> */}
        </div>

        <div className="typing-auth-buttons">
          {isLoggedIn ? (
            <div className="typing-dashboard" onClick={handleDashboardClick}>
              <FaUserCircle className="user-icon" />
              Dashboard
            </div>
          ) : (
            <>
              <button className="typing-btn typing-login-btn" onClick={handleLoginClick}>Login</button>
              <button className="typing-btn typing-signup-btn" onClick={handleSignUpClick}>Sign Up</button>
            </>
          )}
        </div>

        {/* Hamburger menu for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
          <div className="typing-nav-item" onClick={toggleDropdown}>Typing Test Links</div>
          <div className="typing-nav-item typing-help-item" onClick={handleHelpClick}>Help</div>
          <div className="typing-nav-item typing-buy-now-item" onClick={handleBuyNowClick}>Buy Now</div>
          {/* <div className="typing-nav-item" onClick={toggleSearch}>Search</div> */}
          {/* <div className="close-button" onClick={toggleMenu}>❌</div> */}
        </div>
      )}

      {isSearchOpen && (
        <div className="typing-search-popup-overlay fade-in">
          <div className="typing-search-popup" ref={searchRef}>
            {/* <div className="close-button" onClick={toggleSearch}>
              <FaTimes />
            </div> */}
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button onClick={performSearch}>Search</button>
          </div>
        </div>
      )}
    </header>
        {loading && <Loading />}
        </>
  );
};

export default TypingHeader;


