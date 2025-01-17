

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './PaymentModal.css';
import { useCookies } from 'react-cookie';
import { FcPhoneAndroid } from "react-icons/fc";
import { FaEnvelope } from 'react-icons/fa';
import { CiUser, CiMail } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import Paymentmodalbutton from "./PaymentModalButton";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios to make HTTP requests

const PaymentModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [fullname, setfullname] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedPlan, setSelectedPlan] = useState("30 Days");
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [plans, setPlans] = useState([]);  // State to store plans fetched from API
  const [cookies] = useCookies(['session_id']);
  const { userDetails, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Fetch the plans from the backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getPlans`, {
          method: 'GET',  // The HTTP method (GET is typically used for fetching data)
         
        });
  
        if (response.ok) {
          const data = await response.json();
          setPlans(data);  // Store the fetched data in the plans state
        } else {
          console.error('Failed to fetch plans, received non-200 response:', response);
        }
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    };
  
    fetchPlans();
  }, []);

  useEffect(() => {
    // console.log("isLoggedIn:", isLoggedIn);
    // console.log("userDetails:", userDetails);
  }, [isLoggedIn, userDetails]);

  // Calculate subscription dates based on selected plan
  const calculateSubscriptionDates = () => {
    const startDate = new Date();
    let expiryDate = new Date(startDate);

    switch (selectedPlan) {
      case '30 Days': expiryDate.setDate(startDate.getDate() + 30); break;
      case '25 Days': expiryDate.setDate(startDate.getDate() + 25); break;
      case '3 Days': expiryDate.setDate(startDate.getDate() + 3); break;
      case '90 Days': expiryDate.setDate(startDate.getDate() + 90); break;
      case '180 Days': expiryDate.setDate(startDate.getDate() + 180); break;
      case '365 Days': expiryDate.setDate(startDate.getDate() + 365); break;
      default: break;
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
    };
  };

  const subscriptionDates = calculateSubscriptionDates();

  const handleProceedToLogin = () => {
    Swal.fire({
      title: 'Please log in to proceed',
      text: 'You need to be logged in to complete the payment.',
      icon: 'info',
      confirmButtonText: 'Login'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login'); // Navigate to the login page if "Login" is clicked
      }
    });
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <AiOutlineClose className="modal-close-icon-payment" onClick={closeModal} />
        <h2 className="payment-modal-title">Get Access</h2>
        <div className="modal-content-payemnt">
          <div className="modal-left">
            <h3 className="details-title">Enter Your Details</h3>
            <div className="modal-left-inputs">
              <div className="input-field">
                <div className="input-container">
                  <CiUser className="user-icon-paymet" />
                  <input type="text" id="name" value={fullname} onChange={(e) => setfullname(e.target.value)} placeholder="Enter your name" required />
                </div>
              </div>
              <div className="input-field">
                <div className="input-container">
                  <CiMail className="user-icon-paymet" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="input-field">
                <div className="input-container">
                  <FcPhoneAndroid className="user-icon-paymet" />
                  <input
                    type="tel"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-centre"></div>

          <div className="modal-right">
            <div className="modal-right-first">
              <h3 className="details-title">Your Plan</h3>
              <button
                className="change-plan-button"
                onClick={() => setShowPlanModal(true)}
              >
                Change Plan
              </button>
            </div>

            {/* Display plan details dynamically */}
            {Array.isArray(plans) && plans.length > 0 && (
              <div className="plan-card">
                <div className="recommended-badge">Recommended</div>
                <div className="plan-details">
                  <div className="plan-info">
                    <span className="plan-name">{selectedPlan}</span>
                    <p className="plan-price">₹{plans.find(plan => plan.name === selectedPlan).oldAmount}</p>
                  </div>
                  <div className="price-info">
                    <span className="price-drop">Price drop: {plans.find(plan => plan.name === selectedPlan).priceDrop}</span>
                    <span className="extra-discount">{plans.find(plan => plan.name === selectedPlan).totalAmount}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="yoursaving">
              <span className="savings">Your Total Savings</span>
              <span className="savings">{plans.length > 0 && plans.find(plan => plan.name === selectedPlan).savings}</span>
            </div>

            <div className="centre-end"></div>

            <div className="yoursaving2">
              <div className="amount">
                <p>Amount to be paid: </p>
                <span>{plans.length > 0 && plans.find(plan => plan.name === selectedPlan).totalAmount}</span>
              </div>
            </div>

            {isLoggedIn ? (
              <Paymentmodalbutton
                email={email}
                fullName={fullname}
                mobile={mobile}
                selectedPlan={selectedPlan}
                userId={userDetails.id}
               
                orderAmount={plans.length > 0 && plans.find(plan => plan.name === selectedPlan).totalAmount}
              />
            ) : (
              <button className="proceed-button" onClick={handleProceedToLogin}>
                Proceed to Payment
              </button>
            )}
            <div className="secure-transaction">
              <span className="lock-icon">🔒</span> Secure Transaction
            </div>
          </div>
        </div>

        {showPlanModal && (
          <div className="plan-selection-modal">
            <h3>Select Your Plan</h3>
            <ul className="plan-options">
              {plans.length > 0 && plans.map((plan) => {
                return (
                  <li key={plan._id} onClick={() => {
                    setSelectedPlan(plan.name);
                    setShowPlanModal(false);
                  }}>
                    Choose the {plan.name} plan for just {plan.totalAmount}
                  </li>
                );
              })}
            </ul>
            <button onClick={() => setShowPlanModal(false)} className="close-plan-modal">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;


