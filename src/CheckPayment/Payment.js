


// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useCookies } from "react-cookie";
// import { useNavigate } from 'react-router-dom';

// const BuyTyping = ({
//   userDetails,
//   orderAmount,
//   selectedPlan,
//   subscriptionDates,
//   exam,
//   examName,
//   paperCode,
//   buttonText = "Buy This Plan",
//   className = "",
// }) => {
//   const [isProcessing, setIsProcessing] = useState(false); 
//   const [hasAccess, setHasAccess] = useState(false);
//   const [cookies] = useCookies(["SSIDCE", "session_id"]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAccess();
//   }, []);

//   const checkAccess = async () => {
//     const session_id = cookies.session_id;

//     if (!session_id) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please log in to make a purchase.",
//         confirmButtonText: "Login Now",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/login'); // Redirect to login page
//         }
//       });
//       return;
//     }

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTyping`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           Authorization: `Bearer ${session_id}`,
//         },
//       });

//       if (response.ok) {
//         const { access } = await response.json();
//         setHasAccess(access === "access");
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Access Denied",
//           text: "You do not have access to make a purchase.",
//         });
//       }
//     } catch (error) {
//       console.error("Access check failed:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Unable to verify access at the moment.",
//       });
//     }
//   };

//   const doPayment = async (orderId, amount) => {
//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//       amount: amount * 100, // Amount in paise
//       currency: "INR",
//       order_id: orderId,
//       name: "TestDesk",
//       description: `Payment for ${examName}`,
//       handler: async function (response) {
//         // Payment successful
//         Swal.fire("Payment Successful!", "Thank you for your purchase!", "success");
  
//         // Make a call to the backend API to check payment status
//         try {
//           const body = {
//             razorpay_order_id: orderId,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           };
  
//           const validateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/validate`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(body),
//           });
  
//           const jsonResponse = await validateResponse.json();
  
//           // Display message based on validation response
//           if (jsonResponse.success) {
//             // Redirect after successful payment
//             window.location.href = jsonResponse.redirectUrl; 
//             console.log(jsonResponse.redirectUrl)
//         } else {
//           window.location.href = jsonResponse.redirectUrl;
//         }
//         } catch (error) {
//           console.error("Error validating payment:", error);
          
//         }
      
//       },
//       prefill: {
//         name: userDetails.fullName,
//         email: userDetails.email_id,
//         contact: userDetails.mobile_number,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
  
//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };
  
//   const payMe = async () => {
//     if (isProcessing) return;
//     setIsProcessing(true);

//     if (!hasAccess) {
//         Swal.fire({
//             icon: "error",
//             title: "Access Denied",
//             text: "Access not granted.",
//         });
//         setIsProcessing(false);
//         return;
//     }

//     const data = {
//         email_id: userDetails.email_id,
//         userName: userDetails.fullName,
//         userEmail: userDetails.email_id,
//         userMobileNo: userDetails.mobile_number,
//         userId: userDetails.id,
//         orderAmount: orderAmount,
//         subscriptionStartDate: subscriptionDates.startDate,
//         subscriptionExpiryDate: subscriptionDates.expiryDate,
//         exam,
//         examName,
//         paperCode,
//         selectedPlan,
//     };

//     try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing_payment`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         if (response.ok) {
//             const { razorpay_order_id, orderDetails } = await response.json();
//             doPayment(razorpay_order_id, orderAmount);
//         } else {
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Error creating order. Please try again.",
//             });
//         }
//     } catch (error) {
//         console.error("Payment error:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "An error occurred. Please try again later.",
//         });
//     } finally {
//         setIsProcessing(false);
//     }
//   };


//   return (
//     <button onClick={payMe} className={className} disabled={isProcessing}>
//       {isProcessing ? "Processing..." : buttonText}
//     </button>
//   );
// };

// export default BuyTyping;

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const BuyTyping = ({
  userDetails,
  orderAmount,
  selectedPlan,
  subscriptionDates,
  exam,
  examName,
  paperCode,
  buttonText = "Buy This Plan",
  className = "",
}) => {
  const [isProcessing, setIsProcessing] = useState(false); 
  const [hasAccess, setHasAccess] = useState(false);
  const [cookies] = useCookies(["SSIDCE", "session_id"]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const session_id = cookies.session_id;
    console.log("Session ID:", subscriptionDates);

    if (!session_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please log in to make a purchase.",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Redirect to login page
        }
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTyping`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${session_id}`,
        },
      });

      console.log("Access check response:", response);

      if (response.ok) {
        const { access } = await response.json();
        console.log("Access status:", access);
        setHasAccess(access === "access");
      } else {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You do not have access to make a purchase.",
        });
      }
    } catch (error) {
      console.error("Access check failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to verify access at the moment.",
      });
    }
  };

  const doPayment = async (orderId, amount) => {
    console.log("Initiating payment for Order ID:", orderId, "Amount:", amount);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100, // Amount in paise
      currency: "INR",
      order_id: orderId,
      name: "TestDesk",
      description: `Payment for ${examName}`,
      handler: async function (response) {
        // Payment successful
        console.log("Payment successful response:", response);
        Swal.fire("Payment Successful!", "Thank you for your purchase!", "success");

        // Make a call to the backend API to check payment status
        try {
          const body = {
            razorpay_order_id: orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const validateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/validate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const jsonResponse = await validateResponse.json();
          console.log("Validation response:", jsonResponse);

          // Display message based on validation response
          if (jsonResponse.success) {
            // Redirect after successful payment
            window.location.href = jsonResponse.redirectUrl; 
            console.log("Redirect URL:", jsonResponse.redirectUrl);
          } else {
            window.location.href = jsonResponse.redirectUrl;
          }
        } catch (error) {
          console.error("Error validating payment:", error);
        }
      },
      prefill: {
        name: userDetails.fullName,
        email: userDetails.email_id,
        contact: userDetails.mobile_number,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const payMe = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    console.log("Processing payment...");

    if (!hasAccess) {
        Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "Access not granted.",
        });
        setIsProcessing(false);
        return;
    }

    const data = {
        email_id: userDetails.email_id,
        userName: userDetails.fullName,
        userEmail: userDetails.email_id,
        userMobileNo: userDetails.mobile_number,
        userId: userDetails.id,
        orderAmount: orderAmount,
        subscriptionStartDate: subscriptionDates.startDate,
        subscriptionExpiryDate: subscriptionDates.expiryDate,
        exam,
        examName,
        paperCode,
        selectedPlan,
    };

    console.log("Payment data:", data);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing_payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log("Payment order creation response:", response);

        if (response.ok) {
            const { razorpay_order_id, orderDetails } = await response.json();
            console.log("Razorpay order details:", razorpay_order_id, orderDetails);
            doPayment(razorpay_order_id, orderAmount);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error creating order. Please try again.",
            });
        }
    } catch (error) {
        console.error("Payment error:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again later.",
        });
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <button onClick={payMe} className={className} disabled={isProcessing}>
      {isProcessing ? "Processing..." : buttonText}
    </button>
  );
};

export default BuyTyping;
