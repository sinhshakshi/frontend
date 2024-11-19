
import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import './PaymentModal.css';
import { useCookies } from 'react-cookie';
import { FcPhoneAndroid } from "react-icons/fc";
import { FaEnvelope } from 'react-icons/fa';
import { CiUser, CiMail  } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import Paymentmodalbutton from "./PaymentModalButton"
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';


const PaymentModal = ({ closeModal  }) => {
  const [email, setEmail] = useState('');
  const [fullname , setfullname] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedPlan, setSelectedPlan] = useState("30 Days"); // Define selectedPlan state here
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [cookies] = useCookies(['session_id']);
  const { userDetails, isLoggedIn } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("userDetails:", userDetails);
  }, [isLoggedIn, userDetails]);
 

  // Plan details mapping for different plans
  const planDetails = {
    "30 Days": { days: "30 Days", priceDrop: "10", savings: "₹10", oldAmount: "₹79", totalAmount: "₹69" },
    "25 Days": { days: "25 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹69", totalAmount: "₹59" },
    "3 Days": { days: "3 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹39", totalAmount: "₹29" },
    "90 Days": { days: "90 Days", priceDrop: "₹40", savings: "₹40", oldAmount: "₹199", totalAmount: "₹159" },
    "180 Days": { days: "180 Days", priceDrop: "₹50", savings: "₹50", oldAmount: "₹349", totalAmount: "₹299" },
    "365 Days": { days: "365 Days", priceDrop: "₹100", savings: "₹100", oldAmount: "₹699", totalAmount: "₹599" }
  };

  const currentPlan = planDetails[selectedPlan];


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

// Inside your PaymentModal component
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
      <AiOutlineClose className="modal-close-icon-payment" onClick={closeModal } />
        <h2 className="payment-modal-title">Get Access</h2>
        <div className="modal-content-payemnt">
          <div className="modal-left">
            <h3 className="details-title">Enter Your Details</h3>
            <div className="modal-left-inputs">
              <div className="input-field">
                <div className="input-container">
                  <CiUser className="user-icon-paymet" />
                  <input type="text" id="name" value ={fullname}  onChange={(e) => setfullname(e.target.value)}  placeholder="Enter your name" required />
                </div>
              </div>
              <div className="input-field">
                <div className="input-container">
                  <CiMail  className="user-icon-paymet" />
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

            <div className="plan-card">
              <div className="recommended-badge">Recommended</div>
              <div className="plan-details">
                <div className="plan-info">
                  <span className="plan-name">{currentPlan.days}</span>
                  <p className="plan-price">₹{currentPlan.oldAmount}</p>
                </div>
                <div className="price-info">
                  <span className="price-drop">Price drop: {currentPlan.priceDrop}</span> 
                  <span className="extra-discount">{currentPlan.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="yoursaving">
              <span className="savings">Your Total Savings</span>
              <span className="savings">{currentPlan.savings}</span>
            </div>

            <div className="centre-end"></div>

            <div className="yoursaving2">
              <div className="amount">
                <p>Amount to be paid: </p>
                <span>{currentPlan.totalAmount}</span>
              </div>
            </div>

            {isLoggedIn ? (
              <Paymentmodalbutton
                email={email}
                fullName={fullname}
                mobile={mobile}
                selectedPlan={selectedPlan}
                userId={userDetails.id}
                startDate={subscriptionDates.startDate}
                expiryDate={subscriptionDates.expiryDate}
                orderAmount={currentPlan.totalAmount}
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
            {Object.keys(planDetails).map((plan) => {
  const planDetailsForKey = planDetails[plan];

  return (
    <li key={plan} onClick={() => { 
      setSelectedPlan(plan); 
      setShowPlanModal(false); 
    }}>
        Choose the {plan} plan for just {planDetailsForKey.totalAmount}
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
