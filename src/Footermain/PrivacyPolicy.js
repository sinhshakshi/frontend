import React from 'react';
import './PrivacyPolicy.css';
import MainFooter from '../Footermain/Footer';
import TypingHeader from '../component/Header';

const PrivacyPolicy = () => {
  return (
    <>
    <TypingHeader/>
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>

      <h2>General</h2>
      <p>
        By accessing or using our services at Testdesk.in, you agree to the terms outlined in this Privacy Policy (the "Policy"). 
        Any terms not defined here have the meanings specified in our Terms and Conditions. 
        We retain the authority to change this Policy at any moment.
        Changes will be communicated through a notice on our website, which will remain visible for a minimum of 7 days following the update. 
        The revised Policy will take effect at the end of this period or at the first instance you access the services after changes are made. 
        If you do not agree with the terms of this Policy, you are not authorized to use our services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you utilize our services, we collect two primary types of information: (i) information you voluntarily provide and (ii) 
        information automatically collected regarding your interaction with our services.
      </p>
      <p>
        Upon entering our website, we gather data such as your browser type and IP address, applicable to all visitors. 
        We also utilize "cookies" to store certain information on your device. 
        Cookies are small data files that enhance your experience by remembering your preferences. 
        We use session cookies to verify user logins. If you prefer not to allow cookies, you can adjust your browser settings; 
        however, some features may be affected.
      </p>
      <p>
        During the registration process, you may provide us with details including your name, phone number, email address, and location, 
        among other requested information. Your interactions with the services, including profile submissions and activity data generated 
        from educational tasks, are stored to enable personalized service features.
      </p>

      <h2>Use of Your Information</h2>
      <p>
        We may use your contact information to send you updates about new services that we believe may interest you. 
        You may opt out of promotional emails; however, we may still send important notices related to your account, 
        even if you unsubscribe from other communications.
      </p>
      <p>
        Your profile information is mainly utilized to provide you with access to your account and to facilitate interactions with other users. 
        In some instances, other users may be allowed to add comments or feedback to your profile.
      </p>
      <p>
        We may use aggregated or anonymous data collected through our services for various purposes, including sharing this information 
        with third parties. If you would like to remove your data, please reach out to us at support@testdesk.com.
      </p>

      <h2>Sharing Your Information</h2>
      <p>
        We share personally identifiable information only when necessary for providing the services, complying with legal obligations, 
        or with your consent.
      </p>
      <p>
        For example:
      </p>
      <ul>
        <li>
          We may share your information with service providers who assist us in delivering our services, 
          such as hosting or communication services. These providers are bound by contractual obligations to protect your information 
          and limit its use to the services we provide.
        </li>
        <li>
          We may collaborate with partners who use software development kits (SDKs) for collecting information that assists in delivering 
          personalized notifications. This data may include personally identifiable information and, depending on your permissions, 
          precise location and app usage data.
        </li>
      </ul>

      <h2>User Control & Opt-Out Options</h2>
      <p>
        <strong>Push Notifications:</strong> You can manage your push notification preferences through your device settings.
      </p>
      <p>
        <strong>Interest-Based Advertising:</strong> You can opt out of personalized advertising by accessing the settings on your mobile device.
      </p>
      <p>
        We may be required to disclose your information in response to lawful requests, such as subpoenas or court orders, 
        or as necessary to protect our rights and prevent fraud. Additionally, if there is a change in ownership of our business, 
        your information may be transferred as part of that transaction, but will continue to be protected under this Policy.
      </p>

      <h2>Use of Third-Party Services</h2>
      <p>
        We utilize third-party analytics to understand and improve our services. For instance, we may share limited information 
        with analytics providers such as Intercom, which helps us track user engagement and enhance your experience. 
        Intercom may also facilitate our communication with you through various channels.
      </p>

      <h2>Links to Other Websites</h2>
      <p>
        Our services may contain links to external websites. We are not liable for the privacy practices of those websites, and we recommend that you examine their privacy policies before sharing any personal information. 
        This Policy applies only to information collected by testdesktypingtest@gmail.com.
      </p>

      <h2>Disclaimer</h2>
      <p>
        We are an independent educational technology company focused on providing exam preparation services for various government exams. 
        We do not represent any government department or private organization.
      </p>
    </div>
    <MainFooter/>
    </>
  );
};

export default PrivacyPolicy;
