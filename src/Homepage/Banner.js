
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Banner.css';
import pic from '../i/a.gif';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../CheckPayment/PaymentModal'; // Adjust the path as necessary
import { useCookies } from 'react-cookie'; // Ensure you import this if using cookies

const Banner = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['session_id']); // Access the session_id from cookies
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
          // Redirect to TypingTestSelector if access is granted
          navigate(`/choose-exam`);
        } else {
          // Open the PaymentModal if access is not granted
          setShowPaymentModal(true);
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

    checkProductAccess();
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  }

  return (
    <div className="b1a3n5n6er">
      <div className="b2a8n2n3er-c1o2n1t3ent">
        {/* Left Column */}
        <div className="b3a1n1n4er-c1o4l2u2mn">
          <h2>
            Transform Your Home into an Exam Hall for SSC CHSL, CGL, RRB-NTPC, RRC-GDCE, HCM, High Court & State Exams, and More!
          </h2>
          <p>
            Experience the intuitive and user-friendly <span className="animated-text">TCS & NTA</span> User Interface, designed to help you prepare effectively for your exams. Our platform provides a realistic exam environment, ensuring you are well-equipped for your upcoming challenges.
          </p>
          <Button onClick={handleButtonClick} variant="primary" className="a5d2d6t-t2e3s4t-btn">Add this Typing test</Button>
        </div>
        <div className="g2i3f1-container">
          <img src={pic} alt="Typing Test Animation" className="b2a2n6er-g5i2f1" />
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && <PaymentModal  closeModal={closePaymentModal} />}
    </div>
  );
};

export default Banner;
