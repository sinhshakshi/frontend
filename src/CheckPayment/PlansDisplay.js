


// import React, { useState, useEffect } from 'react';
// import './PlansDisplay.css';
// import Swal from 'sweetalert2';
// import Header from "../component/Header";
// import Paymentmodalbutton from './PaymentModalButton';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../AuthContext/AuthContext";
// import MainFooter from '../Footermain/Footer';
// import { useCookies } from 'react-cookie';

// const PlansDisplay = () => {
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [hasAccess, setHasAccess] = useState(false);
//   const navigate = useNavigate();
//   const { userDetails, isLoggedIn } = useAuth();
//   const [cookies] = useCookies(['session_id']);
  
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getPlans`, {
//           method: 'GET',  // The HTTP method (GET is typically used for fetching data)
      
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           setPlans(data);  // Store the fetched data in the plans state
//         } else {
//           console.error('Failed to fetch plans, received non-200 response:', response);
//         }
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       }
//     };
  
//     fetchPlans();
//   }, []);

//   useEffect(() => {
//     const checkProductAccess = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTypingProduct`, {
//           method: 'POST',
//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": `Bearer ${cookies.session_id}`,
//           },
//           body: JSON.stringify({ product_id: '999' }) // Use dynamic product ID if necessary
//         });

//         if (response.ok) {
//           const { access } = await response.json();
//           setHasAccess(access === "access");
//         }
//       } catch (error) {
//         console.error("Access check failed:", error);
//       }
//     };

//     if (isLoggedIn) checkProductAccess();
//   }, [isLoggedIn, cookies.session_id]);


//   console.log(plans)
//   const calculateSubscriptionDates = () => {
//     const startDate = new Date();
//     let expiryDate = new Date(startDate); // Create a new Date object for expiryDate
    
//     // Adjust the expiry date based on the selected plan
//     switch (selectedPlan) {
//       case '30 Days':
//         expiryDate.setDate(startDate.getDate() + 30); 
//         break;
//       case '25 Days':
//         expiryDate.setDate(startDate.getDate() + 25); 
//         break;
//       case '3 Days':
//         expiryDate.setDate(startDate.getDate() + 3);  // Add 3 days for this plan
//         break;
//       case '90 Days':
//         expiryDate.setDate(startDate.getDate() + 90); 
//         break;
//       case '180 Days':
//         expiryDate.setDate(startDate.getDate() + 180); 
//         break;
//       case '365 Days':
//         expiryDate.setDate(startDate.getDate() + 365); 
//         break;
//       default:
//         break;
//     }
  
//     // Return formatted date strings (using ISO format to avoid time issues)
//     return {
//       startDate: startDate.toISOString().split('T')[0],  // Ensure format YYYY-MM-DD
//       expiryDate: expiryDate.toISOString().split('T')[0],  // Ensure format YYYY-MM-DD
//     };
//   };
  
  
//   const handleProceedToLogin = () => {
//     Swal.fire({
//       title: 'Please log in to proceed',
//       text: 'You need to be logged in to complete the payment.',
//       icon: 'info',
//       confirmButtonText: 'Login'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/login');
//       }
//     });
//   };

//   const handleAccessGranted = () => {
//     Swal.fire({
//       title: 'Already Subscribed',
//       text: 'You already have a subscription for the typing test. Go to your dashboard to view your plan.',
//       icon: 'info',
//       confirmButtonText: 'Go to Dashboard'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/user-dashboard');
//       }
//     });
//   };

//   const subscriptionDates = calculateSubscriptionDates();
// console.log(subscriptionDates)
//   return (
//     <>
//       <Header />
//       <div className="plans-display">
//         {plans.map((plan, index) => (
//           <div className="small-plan-card" key={index}>
//             <div className="small-plan-header">
//               <h3 className="small-details-title">TCS & NTA Typing Test Interface</h3>
//             </div>
//             <div className="plan-card">
//              <div className="recommended-badge">Recommended</div>
//               <div className="small-plan-info">
//                 <span className="small-plan-name">{plan.name}</span>
//                 <p className="small-plan-price">₹{plan.oldAmount}</p>
//               </div>
//               <div className="small-price-info">
//                 <span className="small-price-drop">Price drop: ₹{plan.priceDrop}</span>
//                 <span className="small-extra-discount">{plan.totalAmount}</span>
//               </div>
//             </div>
//             <div className="small-savings">
//               <span className="savings">Your Total Savings:</span>
//               <span className="savings">{plan.savings}</span>
//             </div>
//             <div className="small-amount">
//               <p>Amount to be paid:</p>
//               <span>{plan.totalAmount}</span>
//             </div>

//             {isLoggedIn ? (
//               hasAccess ? (
//                 <button className="proceed-but-now" onClick={handleAccessGranted}>
//                   Already Subscribed
//                 </button>
//               ) : (
//                 <Paymentmodalbutton
//                   email={userDetails.email_id}
//                   fullName={userDetails.fullName}
//                   mobile={userDetails.mobile_number}
//                   selectedPlan={plan.name}
//                   userId={userDetails.id}
//                   startDate={subscriptionDates.startDate}
//                   expiryDate={subscriptionDates.expiryDate}
//                   orderAmount={plan.totalAmount}
//                 />
//               )
//             ) : (
//               <button className="proceed-but-now" onClick={handleProceedToLogin}>
//                 Proceed to Payment
//               </button>
//             )}
//             <div className="secure-transaction">
//               <span className="lock-icon">🔒</span> Secure Transaction
//             </div>
//           </div>
//         ))}
//       </div>
//       <MainFooter />
//     </>
//   );
// };

// export default PlansDisplay;


import React, { useState, useEffect } from 'react';
import './PlansDisplay.css';
import Swal from 'sweetalert2';
import Header from "../component/Header";
import Paymentmodalbutton from './PaymentModalButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";
import MainFooter from '../Footermain/Footer';
import { useCookies } from 'react-cookie';

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
          setPlans(data);
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTypingProduct`, {
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
                    startDate={startDate} // Pass calculated startDate
                    expiryDate={expiryDate} // Pass calculated expiryDate
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


