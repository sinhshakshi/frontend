


import React, { useState, useEffect } from 'react';
import './PlansDisplay.css';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import Header from "../component/Header";
import Paymentmodalbutton from './PaymentModalButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";
import MainFooter from '../Footermain/Footer';
import { useCookies } from 'react-cookie';
import OfferMessage from './OfferMessage';

const PlansDisplay = () => {
  const [plans, setPlans] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();
  const { userDetails, isLoggedIn } = useAuth();
  const [cookies] = useCookies(['session_id']);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getPlans`, {
          method: 'GET',
        });
  
        if (response.ok) {
          const data = await response.json();
  
          // Convert totalAmount to a number for sorting
          const sortedPlans = data.sort((a, b) => {
            const amountA = parseFloat(a.totalAmount.replace(/[^0-9.-]+/g, '')); // Remove currency symbols and convert to number
            const amountB = parseFloat(b.totalAmount.replace(/[^0-9.-]+/g, '')); // Remove currency symbols and convert to number
            return amountA - amountB; // Sort by numeric value
          });
  
          setPlans(sortedPlans);
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
    const checkProductAccess = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/code-234`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies.session_id}`,
          },
          body: JSON.stringify({ product_id: '999' }),
        });

        if (response.ok) {
          const { access } = await response.json();
          setHasAccess(access === "access");
        }
      } catch (error) {
        console.error("Access check failed:", error);
      }
    };

    if (isLoggedIn) checkProductAccess();
  }, [isLoggedIn, cookies.session_id]);

  // Calculate subscription dates dynamically
  const calculateSubscriptionDates = (planName) => {
    const startDate = new Date();
    let expiryDate = new Date(startDate);

    // Extract days from plan name (e.g., "30 Days")
    const daysMatch = planName.match(/\d+/); // Extract numbers from plan name
    const days = daysMatch ? parseInt(daysMatch[0], 10) : 0; // Parse the days or default to 0

    expiryDate.setDate(startDate.getDate() + days); // Add days to the start date

    return {
      startDate: startDate.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
    };
  };

  const handleProceedToLogin = () => {
    Swal.fire({
      title: 'Please log in to proceed',
      text: 'You need to be logged in to complete the payment.',
      icon: 'info',
      confirmButtonText: 'Login',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
  };

  const handleAccessGranted = () => {
    Swal.fire({
      title: 'Already Subscribed',
      text: 'You already have a subscription for the typing test. Go to your dashboard to view your plan.',
      icon: 'info',
      confirmButtonText: 'Go to Dashboard',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/user-dashboard');
      }
    });
  };

  return (
    <>
          <Helmet>
        <title>Testdesk Typing Test Plans - Improve Typing Speed</title>
        <meta
          name="description"
          content="Choose the best typing test to improve your typing speed for exams like SSC, CGL, CHSL, DSSSB, and more with Testdesk."
        />
        <meta name="keywords" content="typing test plans, typing speed, improve typing, typing practice, SSC, CGL, DSSSB" />
        <meta property="og:title" content="Testdesk Typing Test Plans" />
        <meta
          property="og:description"
          content="Choose the best typing test to improve your speed for exams like SSC, CGL, DSSSB, and more."
        />
        <meta property="og:image" content="https://testdesk.in/logo.png?v=1"  />
        <meta property="og:url" content="https://testdesk.in/ssc-typing-test/buy-now" />
      </Helmet>
      <Header />

  

      <div className="plans-display">
        {plans.map((plan, index) => {
          const { startDate, expiryDate } = calculateSubscriptionDates(plan.name); // Calculate dates dynamically

          return (
            <div className="small-plan-card" key={index}>
              <div className="small-plan-header">
                <h3 className="small-details-title">TCS & NTA Typing Test Interface</h3>
              </div>
              <div className="plan-card">
                <div className="recommended-badge">Recommended</div>
                <div className="small-plan-info">
                  <span className="small-plan-name">{plan.name}</span>
                  <p className="small-plan-price">₹{plan.oldAmount}</p>
                </div>
                <div className="small-price-info">
                  <span className="small-price-drop">Price drop: ₹{plan.priceDrop}</span>
                  <span className="small-extra-discount">{plan.totalAmount}</span>
                </div>
              </div>
              <div className="small-savings">
                <span className="savings">Your Total Savings:</span>
                <span className="savings">{plan.savings}</span>
              </div>
              <div className="small-amount">
                <p>Amount to be paid:</p>
                <span>{plan.totalAmount}</span>
              </div>

              {isLoggedIn ? (
                hasAccess ? (
                  <button className="proceed-but-now" onClick={handleAccessGranted}>
                    Already Subscribed
                  </button>
                ) : (
                  <Paymentmodalbutton
                    email={userDetails.email_id}
                    fullName={userDetails.fullName}
                    mobile={userDetails.mobile_number}
                    selectedPlan={plan.name}
                    userId={userDetails.id}

                    orderAmount={plan.totalAmount}
                  />
                )
              ) : (
                <button className="proceed-but-now" onClick={handleProceedToLogin}>
                  Proceed to Payment
                </button>
              )}
              <div className="secure-transaction">
                <span className="lock-icon">🔒</span> Secure Transaction
              </div>
            </div>
          );
        })}
      </div>
      <MainFooter />
    </>
  );
};

export default PlansDisplay;


