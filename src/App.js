import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import AddTypingParagraph from './Forms/AddTypingParagraph';
import Typing from './Typing/Typing';
import TypingModule from './Typing/TypingModule';
import TypingPerformance from './Typing/Result';
import TypingPerformanceTest from './Typing/TypingPerformanceTest';

import ExamSelect from './Typing/ExamSelect';
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import NewTyping from './NewTyping';
import LoginAdminTyping from './login-Admin/Login';
import RegisterAdminTyping from "./login-Admin/Register"
import AdminTyping from './AdminPanel/AdminEbook';
import HomePage from './Homepage/HomePage';
import Register from './PojectLogin/Register';

  import PaymentComponent from './CheckPayment/CheckRegistration';
import { AuthProvider } from './AuthContext/AuthContext';
import TypingTestSelector from './Typing/TypingTestSelector';
import Instruction from "./Typing/Instruction"
import CandidateForm from './Candidateform/CandidateForm';
import DashboardContainer from './UserDashboard/DashboardContainer';
import PaymentModal from './CheckPayment/PaymentModal';
import PlansDisplay from "./CheckPayment/PlansDisplay"
import PrivacyPolicy from './Footermain/PrivacyPolicy';
import TermsAndConditions from './Footermain/TermsOfService';
import AcceptableUsePolicy from './Footermain/AcceptableUsePolicy';
import ContactUs from './ContactUs/ContactUs';
import ForgetPassword from "./Password/ForgetPassword";
import ResetPassword from "./Password/ResetPassword";
import ExamResult from "./Exam Result/ExamResult";
import InfoPage from "./Typinginfo/InfoPage";
import { useCookies } from 'react-cookie';

const App = () => {

  // useEffect(() => {
  //   // Disable right-click
  //   const disableRightClick = (event) => {
  //     event.preventDefault();
  //   };
  
  //   // Disable specific key combinations
  //   const disableKeyCombinations = (event) => {
  //     if (
  //       (event.ctrlKey && event.shiftKey && event.code === "KeyI") || // Ctrl+Shift+I
  //       (event.ctrlKey && event.shiftKey && event.code === "KeyJ") || // Ctrl+Shift+J
  //       (event.ctrlKey && event.shiftKey && event.code === "KeyC") || // Ctrl+Shift+C
  //       (event.ctrlKey && event.code === "KeyU") ||                  // Ctrl+U
  //       (event.ctrlKey && event.code === "KeyP") ||                  // Ctrl+P
  //       (event.code === "F12")                                       // F12
  //     ) {
  //       event.preventDefault();
  //     }
  //   };
  
  //   // Disable cut, copy, paste
  //   const disableCutCopyPaste = (event) => {
  //     event.preventDefault();
  //   };
  
  //   // Add event listeners
  //   document.addEventListener("contextmenu", disableRightClick); // Disable right-click
  //   document.addEventListener("keydown", disableKeyCombinations); // Disable key combinations
  //   document.addEventListener("cut", disableCutCopyPaste); // Disable cut
  //   document.addEventListener("copy", disableCutCopyPaste); // Disable copy
  //   document.addEventListener("paste", disableCutCopyPaste); // Disable paste
  
  //   // Cleanup event listeners on component unmount
  //   return () => {
  //     document.removeEventListener("contextmenu", disableRightClick);
  //     document.removeEventListener("keydown", disableKeyCombinations);
  //     document.removeEventListener("cut", disableCutCopyPaste);
  //     document.removeEventListener("copy", disableCutCopyPaste);
  //     document.removeEventListener("paste", disableCutCopyPaste);
  //   };
  // }, []);
  
  

  const [cookies] = useCookies(['SSIDCE', 'session_id']); // Access the SSIDCE and session_id cookies



  //  console.log(cookies.SSIDCE)
  useEffect(() => {
    const checkSubscription = async () => {
      const email = cookies.SSIDCE; // Extract SSIDCE directly from cookies
      if (!email) {
        console.error("SSIDCE cookie is missing.");
        return;
      }

      try {
        // Send a POST request to the backend
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/check-subscription`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.session_id}` // Include all cookies as JSON in the headers
          },
          body: JSON.stringify({ email }), // Include SSIDCE (email) in the body
        });

        if (!response.ok) {
          throw new Error('Failed to check subscription');
        }

        const data = await response.json();

        if (data.message === 'Subscription expired and removed.') {
          // console.log('Your subscription has expired.');
        } else if (data.message === 'Subscription is active.') {
          // console.log('Subscription details:', data.data);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    // Call the function when the component mounts
    checkSubscription();
  }, [cookies]);



  if (process.env.NODE_ENV === "production") {
    console.log = () => {}; // Suppress console.log
    console.error = () => {}; // Suppress console.error
    console.warn = () => {}; // Suppress console.warn
  }
  

  return (
 
    <AuthProvider> 
       <HelmetProvider> {/* Wrap your app in HelmetProvider */}
    <Router>
      <Routes>
      <Route path='/register-admin' element={<RegisterAdminTyping />} />
      <Route path='/course-page/:paramLink' element={<InfoPage />} />
      <Route path='/typing-test-dest-results' element={<ExamResult />} /> 
      <Route path='/help' element={<ContactUs />} />  
      <Route path='/acceptable-use-policy' element={<AcceptableUsePolicy />} />  
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />  
      <Route path='/terms-of-service' element={<TermsAndConditions />} /> 

      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path='/ssc-typing-test/buy-now' element={<PlansDisplay />} />  
      <Route path='/pay' element={<PaymentModal />} />  

      <Route path='/' element={<HomePage />} />  
      <Route path="/hometyping" element={<HomePage />} />
      <Route path="/operator" element={<AdminTyping />} />
      <Route path='/user-dashboard' element={<DashboardContainer />} /> 

                      <Route
                        path="/operator-login"
                        element={<LoginAdminTyping />}
                      />

      <Route path="/type" element={<NewTyping />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Typing />} />
        <Route path="/add-typing-paragraph" element={<AddTypingParagraph />} />


        <Route path="/choose-exam" element={<ExamSelect />} />  
        <Route path="/exam/:exam/:examName/:paperCode/payment" element={<PaymentComponent />} />
        <Route path="/exam/:exam/:examName/:paperCode/testselect" element={<TypingTestSelector />} />
        <Route path='/instruction/:testcode/:exam/:testname' element={<Instruction />} />

        <Route path='/:testcode/:exam/:testname/typing' element={<TypingModule />} />
        
        <Route path='/:testcode/:exam/:testname/feedback' element={<CandidateForm />} />                
       
        <Route path='/:testcode/:exam/:testname/result' element={<TypingPerformance />} />  
        <Route path='/typingperformancetest/:accuracy/:wrongper/:actualdep/:speed/:testcode/:exam/:category' element={<TypingPerformanceTest />} /> 
        {/* Add other routes here */}
      </Routes>
    </Router>
    </HelmetProvider>
    </AuthProvider> 
  
  );
};

export default App;
