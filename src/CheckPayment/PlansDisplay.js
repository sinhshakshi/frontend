

// import React, { useState, useEffect } from 'react';
// import './PlansDisplay.css';
// import Swal from 'sweetalert2';
// import Header from "../component/Header";
// import Paymentmodalbutton from './PaymentModalButton';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../AuthContext/AuthContext";
// import MainFooter from '../Footermain/Footer';

// const PlansDisplay = () => {
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const navigate = useNavigate();
//   const { userDetails, isLoggedIn } = useAuth();
// console.log(userDetails)
//   const plans = [
//     { name: "30 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹79", totalAmount: "₹69" },
//     { name: "25 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹69", totalAmount: "₹59" },
//     { name: "3 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹39", totalAmount: "₹29" },
//     { name: "90 Days", priceDrop: "₹40", savings: "₹40", oldAmount: "₹199", totalAmount: "₹159" },
//     { name: "180 Days", priceDrop: "₹50", savings: "₹50", oldAmount: "₹349", totalAmount: "₹299" },
//     { name: "365 Days", priceDrop: "₹100", savings: "₹100", oldAmount: "₹699", totalAmount: "₹599" },
//   ];

//   const calculateSubscriptionDates = () => {
//     const startDate = new Date();
//     let expiryDate = new Date(startDate);

//     switch (selectedPlan) {
//       case '30 Days': expiryDate.setDate(startDate.getDate() + 30); break;
//       case '25 Days': expiryDate.setDate(startDate.getDate() + 25); break;
//       case '3 Days': expiryDate.setDate(startDate.getDate() + 3); break;
//       case '90 Days': expiryDate.setDate(startDate.getDate() + 90); break;
//       case '180 Days': expiryDate.setDate(startDate.getDate() + 180); break;
//       case '365 Days': expiryDate.setDate(startDate.getDate() + 365); break;
//       default: break;
//     }

//     return {
//       startDate: startDate.toISOString().split('T')[0],
//       expiryDate: expiryDate.toISOString().split('T')[0],
//     };
//   };

//   useEffect(() => {
//     console.log("isLoggedIn status changed:", isLoggedIn);
//   }, [isLoggedIn]);

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

//   const subscriptionDates = calculateSubscriptionDates();

// console.log()


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
//               <div className="recommended-badge">Recommended</div>
//               <div className="small-plan-info">
//                 <span className="small-plan-name">{plan.name}</span>
//                 <p className="small-plan-price">{plan.oldAmount}</p>
//               </div>
//               <div className="small-price-info">
//                 <span className="small-price-drop">Price drop: {plan.priceDrop}</span>
//                 <span className="small-extra-discount">{plan.totalAmount}</span>
//               </div>
//             </div>
//             <div className="small-savings">
//               <span className="savings">Your Total Savings:</span>
//               <span className="savings">{plan.savings}</span>
//             </div>
//             <div className="centre-end"></div>
//             <div className="small-amount">
//               <p>Amount to be paid:</p>
//               <span>{plan.totalAmount}</span>
//             </div>

//             {isLoggedIn ? (
//               <Paymentmodalbutton
//                 email={userDetails.email_id}
//                 fullName={userDetails.fullName}
//                 mobile={userDetails.mobile_number}
//                 selectedPlan={plan.name} // Pass the selected plan's name
//                 userId={userDetails.id}
//                 startDate={subscriptionDates.startDate}
//                 expiryDate={subscriptionDates.expiryDate}
//                 orderAmount={plan.totalAmount}
//               />
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
//       <MainFooter/>
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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();
  const { userDetails, isLoggedIn } = useAuth();
  const [cookies] = useCookies(['token']);
  
  const plans = [
    { name: "30 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹79", totalAmount: "₹69" },
    { name: "25 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹69", totalAmount: "₹59" },
    { name: "3 Days", priceDrop: "₹10", savings: "₹10", oldAmount: "₹39", totalAmount: "₹29" },
    { name: "90 Days", priceDrop: "₹40", savings: "₹40", oldAmount: "₹199", totalAmount: "₹159" },
    { name: "180 Days", priceDrop: "₹50", savings: "₹50", oldAmount: "₹349", totalAmount: "₹299" },
    { name: "365 Days", priceDrop: "₹100", savings: "₹100", oldAmount: "₹699", totalAmount: "₹599" },
  ];

  useEffect(() => {
    const checkProductAccess = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTypingProduct`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({ product_id: '999' }) // Use dynamic product ID if necessary
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
  }, [isLoggedIn, cookies.token]);

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

  const handleProceedToLogin = () => {
    Swal.fire({
      title: 'Please log in to proceed',
      text: 'You need to be logged in to complete the payment.',
      icon: 'info',
      confirmButtonText: 'Login'
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
      confirmButtonText: 'Go to Dashboard'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/user-dashboard');
      }
    });
  };

  const subscriptionDates = calculateSubscriptionDates();

  return (
    <>
      <Header />
      <div className="plans-display">
        {plans.map((plan, index) => (
          <div className="small-plan-card" key={index}>
            <div className="small-plan-header">
              <h3 className="small-details-title">TCS & NTA Typing Test Interface</h3>
            </div>
            <div className="plan-card">
              <div className="recommended-badge">Recommended</div>
              <div className="small-plan-info">
                <span className="small-plan-name">{plan.name}</span>
                <p className="small-plan-price">{plan.oldAmount}</p>
              </div>
              <div className="small-price-info">
                <span className="small-price-drop">Price drop: {plan.priceDrop}</span>
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
                  startDate={subscriptionDates.startDate}
                  expiryDate={subscriptionDates.expiryDate}
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
        ))}
      </div>
      <MainFooter />
    </>
  );
};

export default PlansDisplay;
