
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { load } from "@cashfreepayments/cashfree-js";
// import { useCookies } from "react-cookie";
// import { useNavigate } from 'react-router-dom';

// const Paymentmodalbutton = ({
//   email,
//   fullName,
//   mobile,
//   selectedPlan,
//   startDate,
//   expiryDate,
//   userId,
//   orderAmount,
//   buttonText = "Buy This Plan",
//   className = "",
// }) => {
//   const [cashfree, setCashfree] = useState(null);
//   const [hasAccess, setHasAccess] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [cookies] = useCookies(["email_id", "session_id"]);
//   const navigate = useNavigate();

//   console.log( startDate)
//   console.log( expiryDate)
//   console.log(selectedPlan)

//   const numericOrderAmount = parseFloat(orderAmount.replace(/[^0-9.]/g, ''));
  
//   useEffect(() => {
//     const initializeSDK = async () => {
//       const cf = await load({ mode: "sandbox" });
//       setCashfree(cf);
//     };

//     initializeSDK();
//     // checkAccess();
//   }, []);

//   // const checkAccess = async () => {
//   //   const session_id = cookies.session_id;

//   //   if (!session_id) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Error",
//   //       text: "Please log in to make a purchase.",
//   //       confirmButtonText: "Login Now",
//   //     }).then((result) => {
//   //       if (result.isConfirmed) {
//   //         navigate('/login'); // Redirect to login page
//   //       }
//   //     });
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch("http://localhost:5000/api/checkAccessTyping", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         "Accept": "application/json",
//   //         Authorization: `Bearer ${session_id}`,
//   //       },
//   //     });

//   //     if (response.ok) {
//   //       const { access } = await response.json();
//   //       setHasAccess(access === "access");
//   //     } else {
//   //       Swal.fire({
//   //         icon: "error",
//   //         title: "Access Denied",
//   //         text: "You do not have access to make a purchase.",
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Access check failed:", error);
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Error",
//   //       text: "Unable to verify access at the moment.",
//   //     });
//   //   }
//   // };

//   const doPayment = async (id, orderId) => {
//     if (cashfree) {
//       cashfree.checkout({
//         paymentSessionId: id,
//         returnUrl: `${process.env.REACT_APP_API_URL}/api/typing_payment_status/${orderId}`,
//         redirectTarget: "_self",
//         onSuccess: (paymentResponse) => {
//           console.log("Payment successful", paymentResponse);
//           window.location.href = "/success"; 
//         },
//         onFailure: (paymentResponse) => {
//           console.error("Payment failed", paymentResponse);
//           Swal.fire({
//             icon: "error",
//             title: "Payment Failed",
//             text: "Your payment was not successful. Please try again.",
//           });
//         },
//       });
//     }
//   };

//   const payMe = async () => {
//     if (isProcessing) return; 
//     setIsProcessing(true);

//     // Check for required details
//     if (!email || !mobile || !fullName) {
//       Swal.fire({
//         icon: "error",
//         title: "Missing Information",
//         text: "Please enter your details to proceed with the payment.",
//       });
//       setIsProcessing(false);
//       return;
//     }

//     // if (!hasAccess) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Access Denied",
//     //     text: "Access not granted. Please log in.",
//     //   });
//     //   setIsProcessing(false);
//     //   return;
//     // }

//     if (!startDate || !expiryDate) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Subscription dates are missing.",
//       });
//       setIsProcessing(false);
//       return;
//     }

//     if (!orderAmount) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Order amount is required.",
//       });
//       setIsProcessing(false);
//       return;
//     }

//     // Prepare data for payment initiation
//     const data = {
//       email_id: email,
//       userName: fullName,
//       userMobileNo: mobile,
//       userId: userId,
//       orderAmount: numericOrderAmount,
//       subscriptionStartDate: startDate,
//       subscriptionExpiryDate: expiryDate,
//       selectedPlan,
//     };

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing_payment`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         if (responseData.error) {
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: responseData.error,
//           });
//         } else {
//           doPayment(responseData.cftoken, responseData.orderId);
//         }
//       } else {
//         const errorData = await response.json();
//         console.error("Payment initiation failed:", errorData);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to initiate payment. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "An error occurred during payment initiation. Please try again.",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <button onClick={payMe} className={`proceed-button ${className}`} disabled={isProcessing}>
//       {isProcessing ? "Processing..." : buttonText}
//     </button>
//   );
// };

// export default Paymentmodalbutton;
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Paymentmodalbutton = ({
  email,
  fullName,
  mobile,
  selectedPlan,
  startDate,
  expiryDate,
  userId,
  orderAmount,
  buttonText = "Buy This Plan",
  className = "",
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cookies] = useCookies(["SSIDCE", "session_id"]);
  const navigate = useNavigate();

  const numericOrderAmount = parseFloat(orderAmount.replace(/[^0-9.]/g, ""));

  const doPayment = async (orderId, amount) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100, // Amount in paise
      currency: "INR",
      order_id: orderId,
      name: "TestDesk",
      description: `Payment for ${selectedPlan}`,
      handler: async function (response) {
        // Payment successful
        Swal.fire("Payment Successful!", "Thank you for your purchase!", "success");

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

          if (jsonResponse.success) {
            window.location.href = jsonResponse.redirectUrl;
          } else {
            Swal.fire({
              icon: "error",
              title: "Validation Failed",
              text: "Payment validation failed. Please contact support.",
            });
          }
        } catch (error) {
          console.error("Error validating payment:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred during payment validation. Please try again.",
          });
        }
      },
      prefill: {
        name: fullName,
        email: email,
        contact: mobile,
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

    if (!email || !mobile || !fullName) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please enter your details to proceed with the payment.",
      });
      setIsProcessing(false);
      return;
    }

    if (!startDate || !expiryDate) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Subscription dates are missing.",
      });
      setIsProcessing(false);
      return;
    }

    if (!orderAmount) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Order amount is required.",
      });
      setIsProcessing(false);
      return;
    }

    const data = {
      email_id: email,
      userName: fullName,
      userMobileNo: mobile,
      userId,
      orderAmount: numericOrderAmount,
      subscriptionStartDate: startDate,
      subscriptionExpiryDate: expiryDate,
      selectedPlan,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing_payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { razorpay_order_id } = await response.json();
        doPayment(razorpay_order_id, numericOrderAmount);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error creating order. Please try again.",
        });
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during payment initiation. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button onClick={payMe} className={`proceed-button ${className}`} disabled={isProcessing}>
      {isProcessing ? "Processing..." : buttonText}
    </button>
  );
};

export default Paymentmodalbutton;
