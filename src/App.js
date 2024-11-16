import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './Login';
import AddTypingParagraph from './Forms/AddTypingParagraph';
import Typing from './Typing/Typing';
import TypingModule from './Typing/TypingModule';
import TypingPerformance from './Typing/Result';
import TypingPerformanceTest from './Typing/TypingPerformanceTest';

import ExamSelect from './Typing/ExamSelect';
 
import NewTyping from './NewTyping';
import LoginAdminTyping from './login-Admin/Login';
import RegisterAdminTyping from './login-Admin/Register';
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

const App = () => {

  // useEffect(() => {
  //   // Function to prevent right-click
  //   const disableRightClick = (event) => {
  //     event.preventDefault();
  //   };

  //   // Function to prevent cut, copy, and paste
  //   const disableCutCopyPaste = (event) => {
  //     if (event.ctrlKey || event.metaKey) {
  //       // Allow Ctrl or Command key
  //       return;
  //     }

  //     event.preventDefault();
  //   };

  
  //   const disableKeyCombinations = (event) => {
  //     if (
  //       (event.ctrlKey && event.shiftKey && event.code === "KeyI") ||
  //       (event.ctrlKey && event.shiftKey && event.code === "KeyC") ||
  //       (event.ctrlKey && event.shiftKey && event.code === "KeyJ") ||
  //       (event.ctrlKey && event.shiftKey && event.code === "KeyS") ||
  //       (event.keyCode === 121 && event.shiftKey === true) ||
  //       (event.ctrlKey && event.code === "KeyU") ||
  //       (event.ctrlKey && event.code === "KeyP") // Add Ctrl+P check
  //     ) {
  //       event.preventDefault();
  //     }
  //   };

  //   // Add event listeners when the component mounts
  //   document.addEventListener("contextmenu", disableRightClick);
  //   document.addEventListener("cut", disableCutCopyPaste);
  //   document.addEventListener("copy", disableCutCopyPaste);
  //   document.addEventListener("paste", disableCutCopyPaste);
  //   document.addEventListener("keydown", disableKeyCombinations);

  //   // Remove event listeners when the component unmounts
  //   return () => {
  //     document.removeEventListener("contextmenu", disableRightClick);
  //     document.removeEventListener("cut", disableCutCopyPaste);
  //     document.removeEventListener("copy", disableCutCopyPaste);
  //     document.removeEventListener("paste", disableCutCopyPaste);
  //     document.removeEventListener("keydown", disableKeyCombinations);
  //   };
  // }, []);

  return (
    <AuthProvider> 
    <Router>
      <Routes>
      <Route path='/help' element={<ContactUs />} />  
      <Route path='/acceptable-use-policy' element={<AcceptableUsePolicy />} />  
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />  
      <Route path='/terms-of-service' element={<TermsAndConditions />} /> 

      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path='/buy-now' element={<PlansDisplay />} />  
      <Route path='/pay' element={<PaymentModal />} />  

      <Route path='/' element={<HomePage />} />  
      <Route path="/hometyping" element={<HomePage />} />
      <Route path="/admin_dashboard" element={<AdminTyping />} />
      <Route path='/user-dashboard' element={<DashboardContainer />} /> 
      <Route
                        path="/admintype-for-register"
                        element={<RegisterAdminTyping />}
                      />
                      <Route
                        path="/admintype-for-login"
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
        
        <Route path='/:actualdep/:speed/:testcode/:accuracy/:exam/:wrongper/:testname/form' element={<CandidateForm />} />                
       
        <Route path='/:actualdep/:speed/:testcode/:accuracy/:exam/:wrongper/result' element={<TypingPerformance />} />  
        <Route path='/typingperformancetest/:accuracy/:wrongper/:actualdep/:speed/:testcode/:exam/:category' element={<TypingPerformanceTest />} /> 
        {/* Add other routes here */}
      </Routes>
    </Router>
    </AuthProvider> 
  );
};

export default App;
