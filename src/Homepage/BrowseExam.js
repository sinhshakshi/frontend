import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BrowseExam.css';
import abc from "../i/buy.png";

const BrowseExam = () => {
  const navigate = useNavigate();

  const handleBrowseClick = () => {
    navigate('/choose-exam');
  };

  return (
    <div className="browse-exam-container">
      <div className="browse-content">
        <h2 className="title-for"> Click here to view available exams for typing tests</h2>
        <img 
          src={abc}
          alt="Browse Exams" 
          className="video-container" 
        />
         <button className="tut-button-sign" onClick={handleBrowseClick}>
          Browse Exams
        </button>
      </div>
    
    </div>
  );
};

export default BrowseExam;
