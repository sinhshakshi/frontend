

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBolt } from 'react-icons/fa';
import { GoClock } from 'react-icons/go';
import { HiBolt } from 'react-icons/hi2';
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import './AfterBanner.css';
import { useCookies } from 'react-cookie';

const AfterBanner = () => {
  const [tests, setTests] = useState([]);
  const [accessStatus, setAccessStatus] = useState({});
  const [selectedExam, setSelectedExam] = useState('CHSL'); // Default selection for CHSL
  const navigate = useNavigate();
  const [cookies] = useCookies(['session_id']);
  const [isStartButtonEnabled, setIsStartButtonEnabled] = useState(false);
  const selectedExamCategory = 'ssc'; // Fixed selected category as 'ssc'

  useEffect(() => {
    const fetchSSCData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get-ssc-data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ exam: 'SSC' })
        });
        const data = await response.json();
        setTests(data);
        handleUnlock();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSSCData();
  }, []);

  // Check access to a specific product
  const checkProductAccess = async (para) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTypingProduct`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${cookies.session_id}`,
        },
        body: JSON.stringify({ product_id: '999' }) // Use dynamic paper code if necessary
      });

      if (response.ok) {
        const { access } = await response.json();
        const isAccessible = access === "access";
        setAccessStatus(prevStatus => ({
          ...prevStatus,
          [para.paper_code]: isAccessible
        }));
       
        // Navigate based on access status
        if (isAccessible) {
          navigate(`/exam/${selectedExamCategory}/${para.examName}/${para.paper_code}/testselect`);
        } else {
          navigate(`/exam/${selectedExamCategory}/${para.examName}/${para.paper_code}/payment`);
        }
      } else {
        navigate(`/exam/${selectedExamCategory}/${para.examName}/${para.paper_code}/payment`);
      }
    } catch (error) {
      navigate(`/exam/${selectedExamCategory}/${para.examName}/${para.paper_code}/payment`);
    }
  };

  const handleUnlock = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTypingProduct`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${cookies.session_id}`,
        },
        body: JSON.stringify({ product_id: '999' }) // Static product_id
      });

      if (response.ok) {
        const { access } = await response.json();
        const isAccessible = access === "access";
        
        // Optionally, you could navigate to a specific page if the access is granted
        if (isAccessible) {
          setIsStartButtonEnabled(isAccessible);
        } else {
          console.log("Access denied for unlocking.");
        }
      } else {
        console.log("Failed to check access.");
      }
    } catch (error) {
      console.error("Error checking unlock access:", error);
    }
  };


  // Filter tests based on the selected exam type
  const filteredTests = tests.filter(test => test.examName === selectedExam);

    // Count unique testNames for each paper_code
    const testNameCountByPaperCode = filteredTests.reduce((acc, test) => {
      if (!acc[test.paper_code]) {
        acc[test.paper_code] = new Set();
      }
      acc[test.paper_code].add(test.testName);
      return acc;
    }, {});

  return (
    <div className="after-banner-container">
      <div className="content-wrapper">
        <div className="test-section">
          <div className="header-section">
            <div className="title-wrapper">
              <h2>Typing Test for All SSC Exams</h2>
            </div>
            <div className="mock-tests">
              <span 
                className={`mock-tests-para1 ${selectedExam === 'CHSL' ? 'active' : ''}`} 
                onClick={() => setSelectedExam('CHSL')}
              >
                SSC CHSL ({tests.filter(test => test.examName === 'CHSL').length})
              </span>
              <span 
                className={`mock-tests-para1 ${selectedExam === 'CGL' ? 'active' : ''}`} 
                onClick={() => setSelectedExam('CGL')}
              >
                SSC CGL ({tests.filter(test => test.examName === 'CGL').length})
              </span>
            </div>
          </div>
          
          <div className="test-list">
            {filteredTests.map((test, index) => (
              <div key={index} className="test-item">
                <div className="test-list-user">
                  <div className="test-list-user-number">
                    <h5>{test.paper_code}</h5>
                    <div className="test-list-user-bolt">  
                      <FaBolt className="icon-bolt" /> 
                      <p>49.3k Users</p>
                    </div>
                  </div>
                  <div className="test-list-user-duration">
                    <div className="AiOutlineQuestionCircle"> 
                      <HiBolt className="icon-question" />
                      <p>{testNameCountByPaperCode[test.paper_code]?.size || 0} Question(s)</p>
                    </div>
                    <div className="GoClock"> 
                      <GoClock className="icon-clock"/>
                      <p>10 Mins</p>
                    </div>
                  </div>
                </div>
                <button 
                  className="unlock-button"
                  onClick={() => checkProductAccess(test)}
                >
                  {isStartButtonEnabled ? (
                    <>
                    <FaUnlockAlt className="unlock-icon" /> Start
                     
                    </>
                  ) : (
                    <>
                       <FaLock className="unlock-icon" /> Unlock Now
                    </>
                  )}
                </button>
              </div>
            ))}  
          </div>
        </div>

        <div className="results-section">
          <h4>Live Typing Results Today</h4>
          {['Railway Exam Results', 'SSC Exam Results', 'High Court Exam Results'].map((result, index) => (
            <div key={index} className="result-item">
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AfterBanner;

