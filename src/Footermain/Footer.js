import React from 'react';
import './Footer.css'; // Ensure the CSS file is updated with class name changes
import logo from "../i/newlogo.gif";
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO

const MainFooter = () => {
  return (
    <>
      <Helmet>
        <title>Testdesk - Typing Test Platform for SSC, CGL, RRB, IBPS & More</title>
        <meta 
          name="description" 
          content="Testdesk offers specialized typing tests tailored to each exam format such as SSC CGL, CHSL, RRB, IBPS, and more to improve typing speed and accuracy." 
        />
        <meta 
          name="keywords" 
          content="typing tests, SSC CGL typing test, IBPS PO typing test, RRB NTPC typing test, typing practice, speed test, online typing tests" 
        />
        <meta property="og:title" content="Testdesk - Typing Test Platform for SSC, CGL, RRB, IBPS & More" />
        <meta 
          property="og:description" 
          content="Testdesk offers specialized typing tests tailored to each exam format such as SSC CGL, CHSL, RRB, IBPS, and more to improve typing speed and accuracy." 
        />
        <meta property="og:image" content="https://testdesk.in/logo.png" />
        <meta property="og:url" content="https://testdesk.in" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Testdesk - Typing Test Platform for SSC, CGL, RRB, IBPS & More" />
        <meta name="twitter:description" content="Testdesk offers specialized typing tests tailored to each exam format such as SSC CGL, CHSL, RRB, IBPS, and more to improve typing speed and accuracy." />
        <meta name="twitter:image" content="https://testdesk.in/logo.png" />
      </Helmet>

      <footer className="mainfooter">
        <div className="mainfooter-container">
          <div className="mainfooter-section mainfooter-about">
            <img src={logo} alt="Company Logo" className="mainfooter-logo" />
            <p>Email: testdesktyping@gmail.com</p>
          </div>

          <div className="mainfooter-section mainfooter-links">
            <h4>Company</h4>
            <ul>
              <li><a href="/">About us</a></li>
            </ul>
          </div>

          <div className="mainfooter-section mainfooter-links">
            <h4>Products</h4>
            <ul>
              <li><a href="/choose-exam">SSC CGL Typing Test</a></li>
              <li><a href="/choose-exam">SSC CHSL Typing Test</a></li>
              <li><a href="/choose-exam">IBPS PO Typing Test</a></li>
              <li><a href="/choose-exam">RRB NTPC Typing Test</a></li>
              <li><a href="/choose-exam">State Police Typing Test</a></li>
              <li><a href="/choose-exam">Railway Typing Test</a></li>
              <li><a href="/choose-exam">Bank Clerk Typing Test</a></li>
              <li><a href="/choose-exam">Teacher Eligibility Typing Test</a></li>
            </ul>
          </div>

          <div className="mainfooter-section mainfooter-apps">
            <h4>Follow us on</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-quora"></i></a>
            </div>
          </div>
        </div>
        
        <div className="mainfooter-bottom">
          <p>Copyright © 2014-2024 Testdesk Edu Solutions Pvt. Ltd.: All rights reserved</p>
          <div className="mainfooter-policies">
            <a href="/acceptable-use-policy">User Policy</a>
            <a href="/terms-of-service">Terms</a>
            <a href="/privacy-policy">Privacy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
