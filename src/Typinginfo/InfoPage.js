import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./InfoPage.css";
import TypingHeader from "../component/Header";
import { IoIosArrowDropleft  } from "react-icons/io";
import Paymentmodalbutton from '../CheckPayment/PaymentModalButton';
import Swal from 'sweetalert2';
import { useAuth } from "../AuthContext/AuthContext";
import { useCookies } from 'react-cookie';
import { Helmet } from "react-helmet-async"; // Import Helmet
import MainFooter from "../Footermain/Footer";

const InfoPage = () => {
  const { paramLink } = useParams(); // Get paramLink from URL
  const [infoData, setInfoData] = useState(null);
  const navigate = useNavigate();


  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
 
  const { userDetails, isLoggedIn } = useAuth();
  const [cookies] = useCookies(['session_id']);
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getPlans`, {
          method: 'GET',  // The HTTP method (GET is typically used for fetching data)
      
        });
  
        if (response.ok) {
          const data = await response.json();
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
            "Accept": "application/json",
            "Authorization": `Bearer ${cookies.session_id}`,
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
  }, [isLoggedIn, cookies.session_id]);

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



  useEffect(() => {
    const fetchInfoData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing-info/${paramLink}`);
        const data = await response.json();
        if (response.ok) {
          setInfoData(data);
        } else {
          console.error("Error fetching data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInfoData();
  }, [paramLink]);

  if (!infoData) {
    return (
      
        <div className="loader"></div>
      
    );
  }

  const { examName, image, introduction, metaTag, youtubeVideoLink } = infoData;

  return (
    <>
    <TypingHeader/>

    <Helmet>
        <title>{examName.trim()} - Typing Test Preparation</title>
        <meta
          name="description"
          content={`Prepare for ${examName.trim()} with Testdesk. Learn typing skills and practice with real-world examples to improve speed and accuracy.`}
        />
        <meta name="keywords" content={metaTag} />
        <meta property="og:title" content={`${examName.trim()} Typing Test`} />
        <meta
          property="og:description"
          content={`Get ready for ${examName.trim()} Typing Test. Prepare with Testdesk's courses, tips, and practice materials.`}
        />
           <meta property="og:image" content="https://testdesk.in/logo.png?v=1" />
        <meta property="og:url" content={`https://testdesk.in/course-page/${paramLink}`} />
        <meta name="twitter:image" content="https://testdesk.in/logo.png?v=1"  />

        <link
    rel="canonical"
    href={`https://testdesk.in/course-page/${paramLink}`} // Replace with the actual URL
  />

      </Helmet>
    <div className="info-container">
    <button className="info-back-button" onClick={() => navigate(-1)}>
  <IoIosArrowDropleft size={25} /> Go Back
</button>
      <h1 className="info-title">{examName}</h1>
      <div className="info-content">
        <img className="info-image" src={`${process.env.REACT_APP_API_URL}/${image}`} alt={examName} />
        <p className="info-introduction">{introduction}</p>
      </div>
      <div className="info-meta-tags">
        {metaTag.split(",").map((tag, index) => (
          <span key={index} className="info-meta-tag">
            {tag.trim()}
          </span>
        ))}
      </div>

      <div className="plans-display-info">
        {plans.map((plan, index) => (
          <div className="small-plan-card-info" key={index}>
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

      <div className="info-video">
      <h3>YouTube Videos</h3>
  <p className="subscribe-prompt">
    Subscribe to the channel for more typing test tips and tutorials!
  </p>
  <div className="video-grid">
    {youtubeVideoLink &&
      youtubeVideoLink.split(",").map((link, index) => {
        const embedUrl = `https://www.youtube.com/embed/${
          link.trim().split("v=")[1]?.split("&")[0] || link.trim().split("youtu.be/")[1]
        }`;

        return (
          <div key={index} className="video-item">
          <iframe
            className="info-iframe"
            src={embedUrl}
            title={`YouTube Video ${index + 1} - ${examName}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            aria-label={examName} // Adding for better accessibility
          ></iframe>
        </div>
        
      
        );
      })}
  </div>
</div>

    </div>
    <MainFooter/>
    </>
  );
};

export default InfoPage;
