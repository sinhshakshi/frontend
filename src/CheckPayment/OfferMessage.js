import React from 'react';
import './OfferMessage.css'; // Updated CSS for the new golden/purple look

const OfferMessage = () => {
  return (
    <div className="offer-message">
      <div className="offer-message-content">
        <h2 className="offer-heading">
          <span className="celebration-icon">🎉</span> Limited Time Offer! <span className="celebration-icon">🎉</span>
        </h2>
        <p className="offer-description">
          Our prices are at an all-time low! Enroll before <strong>10th January</strong> to grab this amazing deal and start improving your typing skills for exams like SSC, CGL, DSSSB, and more!
        </p>
       
      </div>
    </div>
  );
};

export default OfferMessage;
