
import React, { useState, useEffect } from 'react';
import "./HomePageDescription.css"; // Include your CSS file for styling
import abc from "../i/abc.mp4";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../CheckPayment/PaymentModal'; 
import { useCookies } from 'react-cookie';

const HomePageDescription = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['session_id']);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { userDetails, isLoggedIn } = useAuth();

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  }

  useEffect(() => {
    if (isLoggedIn && userDetails) {
      // Any additional setup after login
    }
  }, [isLoggedIn, userDetails]);

  const checkProductAccess = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTypingProduct`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${cookies.session_id}`,
        },
        body: JSON.stringify({ product_id: '999' }) // Replace with actual product ID
      });

      if (response.ok) {
        const { access } = await response.json();
        if (access === "access") {
          navigate(`/choose-exam`); // Redirect to TypingTestSelector if access is granted
        } else {
          setShowPaymentModal(true); // Open the PaymentModal if access is not granted
        }
      } else {
        console.error("Failed to check product access", response.statusText);
        setShowPaymentModal(true); // Open the modal if there's an error
      }
    } catch (error) {
      console.error("Error checking product access", error);
      setShowPaymentModal(true); // Open the modal on error
    }
  };

  const handleButtonClick = () => {
    if (isLoggedIn) {
      checkProductAccess(); // Check access if logged in
    } else {
      navigate("/login"); // Navigate to login if not logged in
    }
  };

  return (
    <div className="desc-main">
      <div className="description-container">
        <h1 className="title">Why Testdesk</h1>
        
        <p className="intro">
          Testdesk.com is your ultimate platform for comprehensive typing tests, providing authentic interfaces similar to
          <strong> NTA</strong> and <strong>TCS</strong>, designed to replicate real exam environments. Whether you're preparing for competitive exams like <strong>SSC, Banking, Railways, State Exams, or Defense</strong>, Testdesk.com offers specialized typing tests tailored to each exam format.
        </p>
        
        <section className="video-section">
          <div className="video-container">
            <video autoPlay loop muted className="promo-video">
              <source src={abc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        
        <section className="cta-section">
          <p>
            With Testdesk.com, you’re not only practicing for exams but also monitoring your growth every step of the way. Our platform is crafted to give you a complete understanding of your typing skills, track your progress over time, and help you excel in competitive exams with confidence. Start your journey with Testdesk.com today and achieve your typing goals!
          </p>
        </section>

        <section className="signbutton">
          <button className="tut-button" onClick={handleButtonClick}>
            {isLoggedIn ? "Subscribe" : "Log in"}
          </button>
        </section>
      </div>
      {showPaymentModal && <PaymentModal closeModal={closePaymentModal} />}
    </div>
  );
};

export default HomePageDescription;
