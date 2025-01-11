


import React, { useState, useEffect } from 'react';
import './UserResults.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UserResults = () => {
  const [examDropdownData, setExamDropdownData] = useState({});
  const [selectedExamName, setSelectedExamName] = useState('');
  const [selectedPaperCode, setSelectedPaperCode] = useState(null);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['session_id', 'SSIDCE']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // Fetch exams data from the API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/exams-user-for-result`);
        if (!response.ok) {
          throw new Error(`Failed to fetch exams: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        // Process the data to group by exam and collect paper codes for each examName
        const dropdownData = data.reduce((acc, item) => {
          if (!acc[item.exam]) {
            acc[item.exam] = {}; // Initialize an empty object for each exam
          }

          // Add paper codes for each examName
          if (!acc[item.exam][item.examName]) {
            acc[item.exam][item.examName] = [];
          }

          // Add paper_code only if it's not already included for this examName
          if (!acc[item.exam][item.examName].includes(item.paper_code)) {
            acc[item.exam][item.examName].push(item.paper_code);
          }

          return acc;
        }, {});

        setExamDropdownData(dropdownData);

      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleExamNameSelect = (examName, exam) => {
    setSelectedExamName(examName);
  
    // Get all paper codes for the selected examName within the selected exam
    const paperCodes = examDropdownData[exam][examName] || [];
  
    // Set the paper codes for the selected examName
    setSelectedPaperCode(paperCodes); // Storing the array of paper codes
  
    // Ensure selectedExamName is valid before making the request
    if (examName && paperCodes.length > 0) {
      fetchUserResults(paperCodes, examName);
    } else {
      setUserResults([]);
    }
  };
  
  const fetchUserResults = async (paper_codes, exam) => {
    setLoading(true);
    try {
      // Log paper codes and exam to ensure correct format
      // console.log('Paper Codes:', paper_codes);
      // console.log('Exam:', exam);
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.session_id}`,
        },
        body: JSON.stringify({
          paper_code: paper_codes,  // Sending the correct key: paper_code
          email_id: cookies.SSIDCE, // Sending the email_id
          exam: exam,  // Pass exam to backend
          category: 'UR', // Pass category to backend
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user results');
      }
  
      const data = await response.json();
      // console.log('Backend response:', data);
  
      // Format the results received from the backend
      const formattedResults = data.map((item) => ({
        date: item.date, // Use the date directly from the backend response
        testname: item.testname,
        accuracy: item.accuracy ? parseFloat(item.accuracy).toFixed(2) : 'N/A', // Safe conversion
        paper_code: item.paper_code,
        status: item.status, // Use the status returned from backend
      }));
      
  
      if (formattedResults.length === 0) {
        // console.log('No results found for selected exam.');
      }
  
      setUserResults(formattedResults);
    } catch (error) {
      console.error('Error fetching user results:', error);
      setUserResults([]); // No results available
    } finally {
      setLoading(false);
    }
  };
  


  

  const handleViewResult = (testname, paper_code) => {
    navigate(`/${paper_code}/${selectedExamName}/${testname}/typing-test-result`);
  };

  return (
    <div className="user-results-container">
      <h2>Select an Exam and View Results</h2>
      <nav className="horizontal-nav">
        {Object.keys(examDropdownData).map((exam, index) => (
          <div className="horizontal-nav-item" key={index}>
            <button className="nav-btn">{exam}</button>
            <div className="dropdown-menu">
              {Object.keys(examDropdownData[exam]).map((examName, subIndex) => (
                <span
                  key={subIndex}
                  onClick={() => handleExamNameSelect(examName, exam)} // Pass the examName and exam
                  className="dropdown-item"
                >
                  {examName}
                </span>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="results-list">
        {loading ? (
          <p className="loader">Loading...</p>
        ) : !selectedExamName ? (
          <p className="select-exam-message">Please select an exam to view results.</p>
        ) : userResults.length === 0 ? (
          <p className="no-results-message">No results available for the selected exam name.</p>
        ) : (
          userResults.map((result, index) => (
            <div
              className={`result-card ${result.status === 'Pass' ? 'pass' : 'fail'}`}
              key={index}
            >
              <div className="result-info">
                <p><strong>Date:</strong> {result.date}</p>
                <p><strong>Test Name:</strong> {result.testname}</p>
                <p><strong>Accuracy:</strong> {result.accuracy}%</p>
                <p className={result.status === 'Pass' ? 'pass-user' : 'fail-user'}>
                  <strong>Status:</strong> {result.status}
                </p>
              </div>
              <div className="result-action">
                <button
                  className="view-button"
                  onClick={() => handleViewResult(result.testname, result.paper_code)}
                >
                  View Results
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserResults;
