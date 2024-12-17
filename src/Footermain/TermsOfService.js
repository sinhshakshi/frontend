import React from 'react';
import './TermsOfService.css';
import MainFooter from '../Footermain/Footer';
import TypingHeader from '../component/Header';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Testdesk</title>
        <meta 
          name="description" 
          content="Read the terms and conditions of using Testdesk's typing test platform. Understand your rights and responsibilities while using our service for exam preparation." 
        />
        <meta 
          name="keywords" 
          content="Terms and Conditions, typing test platform, Testdesk, SSC typing, CGL typing, RRB typing, typing test, online typing practice" 
        />
        <meta property="og:title" content="Terms and Conditions - Testdesk" />
        <meta 
          property="og:description" 
          content="Read the terms and conditions of using Testdesk's typing test platform. Understand your rights and responsibilities while using our service for exam preparation." 
        />
        <meta property="og:image" content="https://testdesk.in/logo.png" />
        <meta property="og:url" content="https://testdesk.in/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms and Conditions - Testdesk" />
        <meta name="twitter:description" content="Read the terms and conditions of using Testdesk's typing test platform. Understand your rights and responsibilities while using our service for exam preparation." />
        <meta name="twitter:image" content="https://testdesk.in/logo.png" />
      </Helmet>

      <TypingHeader />
      <div className="terms-container">
        <h1>Terms and Conditions for Testdesk</h1>

        <p>
          Welcome to Testdesk ("Website"), operated by Testdesk Pvt. Ltd. ("Testdesk", "us", "we", or "our"). By accessing or using any part of our services (collectively referred to as the "Service"), you agree to follow these Terms and Conditions ("Terms"). If you do not accept these Terms, we kindly ask you to refrain from using the Service.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our Service, you confirm that you have read, understood, and agree to comply with these Terms, including any future amendments. Testdesk reserves the right to modify these Terms at any time by updating this page, effective immediately. We encourage you to check this page regularly for updates.
        </p>

        <h2>2. Service Overview</h2>
        <p>
          Testdesk provides online typing assessments designed to aid users in preparing for government exams. Our Service includes, but is not limited to:
        </p>
        <ul>
          <li>Typing Test Modules</li>
          <li>Practice Assessments</li>
          <li>Performance Evaluation Services</li>
        </ul>
        <p>
          We retain the right to modify, suspend, or discontinue any aspect of the Service at our discretion and without prior notice.
        </p>

        <h2>3. Registration and User Obligations</h2>
        <p>
          To access certain features of our Service, you may be required to create an account. By registering, you agree to:
        </p>
        <ul>
          <li>Provide accurate, current, and complete information during the registration process.</li>
          <li>Keep your password and account details confidential.</li>
          <li>Promptly update your registration information to ensure its accuracy.</li>
          <li>Assume full responsibility for all activities conducted under your account.</li>
        </ul>
        <p>
          By creating an account, you also agree to receive communications from us regarding our services and promotions.
        </p>

        <h2>4. Subscriptions and Payments</h2>
        <p>
          Testdesk offers various subscription options for accessing our typing assessments. By subscribing, you acknowledge the following terms:
        </p>
        <ul>
          <li>Payments will be processed through third-party payment processors.</li>
          <li>All subscription fees are non-refundable and will automatically renew unless canceled.</li>
          <li>Free trial offers may be available and will transition to paid subscriptions if not canceled prior to the trial's conclusion.</li>
        </ul>

        <h2>5. Your Responsibilities</h2>
        <p>
          You affirm that your access and use of the Service comply with these Terms and all applicable laws. Furthermore, you confirm that you have the rights to any content you submit to Testdesk.
        </p>

        <h2>6. Prohibited Conduct</h2>
        <p>
          You agree not to upload or share any content that is illegal, harmful, threatening, abusive, or otherwise objectionable. Testdesk reserves the right to remove any content that violates these Terms or is deemed inappropriate at our sole discretion.
        </p>

        <h2>7. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Testdesk and its affiliates from any claims, losses, damages, or expenses, including legal fees, arising from your use of the Service or your violation of these Terms.
        </p>

        <h2>8. Disclaimer of Warranties</h2>
        <p>
          The Service is provided on an "as is" basis. Testdesk does not guarantee the accuracy, reliability, or availability of the Service and disclaims all implied warranties, including those of merchantability and suitability for a particular purpose.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent allowed by law, Testdesk shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use the Service.
        </p>

        <h2>10. Termination Rights</h2>
        <p>
          Testdesk reserves the right to terminate or suspend your access to the Service at any time, for any reason, and without prior notice. You may also terminate your account at any time through your account settings.
        </p>

        <h2>11. Intellectual Property Rights</h2>
        <p>
          All content available through the Service, including text, graphics, logos, and software, is owned by Testdesk or its licensors and is protected by copyright and other intellectual property laws. You may not use any content from the Service without obtaining prior written consent.
        </p>

        <h2>12. Privacy Policy</h2>
        <p>
          Your use of the Service is also governed by our Privacy Policy, which explains how we collect and utilize your personal information. By using the Service, you agree to the terms set forth in the Privacy Policy.
        </p>

        <h2>13. Cancellation Policy</h2>
        <p>
          Cancellations are accepted within 24 hours of placing an order for a subscription or service. To initiate a cancellation, please contact our customer service team.
        </p>

        <h2>14. Refund Policy</h2>
        <p>
          Refunds will only be provided for services that have not been accessed or used. Please submit your refund request along with your order number, and we will process it within 14 business days.
        </p>

        <h2>15. Governing Law</h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with the laws of [Your Jurisdiction].
        </p>

        <h2>16. Contact Information</h2>
        <p>
          If you have any questions or concerns regarding these Terms, please reach out to us at:
        </p>
        <p>
          <strong>Testdesk Pvt. Ltd.</strong><br />
          Email: <a href="mailto:testdesktyping@gmail.com">support@testdesk.com</a><br />
          Phone: [Your Contact Number]
        </p>
      </div>
      <MainFooter/>
    </>
  );
};

export default TermsAndConditions;
