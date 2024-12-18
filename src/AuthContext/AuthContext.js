


import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["session_id", "SSDSD"]);
  const [user, setUser] = useState(null);
  const [session_id, setToken] = useState(cookies.session_id || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessTypingStatus, setAccessTypingStatus] = useState(null);

  const getUserDetailsFromCookies = () => {
    const cookieString = document.cookie
      .split('; ')
      .find(row => row.startsWith('SSDSD='));

    if (cookieString) {
      const cookieValue = decodeURIComponent(cookieString.split('=')[1]);
      try {
        return JSON.parse(cookieValue);
      } catch (error) {
        console.error('Error parsing SSDSD from cookies:', error);
      }
    }
    return null; // or default user details
  };

  const [userDetails, setUserDetails] = useState(getUserDetailsFromCookies());

  useEffect(() => {
    // Check if the session_id cookie exists
    const session_id = getCookie('session_id');

    // If the session_id does not exist, clear related cookies and redirect to login
    if (!session_id) {
      clearCookies();
      // window.location.href = '/login'; // Redirect to login page if no session_id
    } else {
      // setIsLoggedIn(true); // Set logged in status to true if session_id exists
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const clearCookies = () => {
    // Clear session_id and userDetails cookies
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    document.cookie = "SSDSD=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    removeCookie("session_id"); // Remove cookie using useCookies hook
    removeCookie("SSDSD"); // Remove cookie using useCookies hook
    setUserDetails(null); // Clear user details from state
    setIsLoggedIn(false); // Update logged in status
  };

  useEffect(() => {
    const checkAccessTyping = async () => {
      if (!session_id) return; // Skip if there's no session_id

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/checkAccessTyping-portal`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session_id}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAccessTypingStatus(data.accessTyping);

          // Check if userDetails is not already set
          if (!userDetails) {
            const userDetailsFromAPI = {
              _id: data.user.id,
              fullName: data.user.full_name,
              mobileNumber: data.user.mobile_number,
              email: data.user.email_id,
            };

            setUserDetails(userDetailsFromAPI); // Update state with user details
          }

          setIsLoggedIn(true); // Set logged in status to true
        } else {
          console.error("Failed to check Access Typing status");
        }
      } catch (error) {
        console.error("Error checking Access Typing status:", error);
      }
    };

    checkAccessTyping(); // Call the function to check access typing
  }, [session_id, userDetails]);

  // Effect to update cookies when userDetails is set
  useEffect(() => {
    if (userDetails) {
      const userDetailsString = JSON.stringify(userDetails);
      setCookie("SSDSD", userDetailsString, { path: "/", maxAge: 24 * 60 * 60 });
    }
  }, [userDetails, setCookie]);

  const logout = async () => {
    try {
      clearCookies(); // Clear cookies and reset state
      // console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session_id,
        logout,
        isLoggedIn,
        accessTypingStatus,
        userDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


