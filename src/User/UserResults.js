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
        // console.log("Fetching exams from API...");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/exams-user-for-result`);

        if (!response.ok) {
          throw new Error(`Failed to fetch exams: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // console.log("Fetched Exams Data:", data);

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

        // console.log("Processed Dropdown Data:", dropdownData);

        // Set the grouped data in state
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

    // Optionally: Perform an action with the paper codes (like fetching user results)
    if (paperCodes.length > 0) {
      fetchUserResults(paperCodes);
    } else {
      setUserResults([]);
    }
  };

  const fetchUserResults = async (paper_codes) => {
    setLoading(true);
    try {
  
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.session_id}`,
        },
        body: JSON.stringify({
          paper_code: paper_codes,  // Sending the correct key: paper_code
          email_id: cookies.SSIDCE, // Sending the email_id
        }),
      });
  
      if (!response.ok) throw new Error('Failed to fetch user results');
  
      const data = await response.json();
     
      const formattedResults = data.map((item) => ({
        date: new Date(item.ts).toLocaleDateString(),
        testname: item.testname,
        accuracy: item.accuracy.toFixed(2),
        paper_code: item.paper_code,
        status: item.accuracy >= 95 ? 'Pass' : 'Fail', // Pass if accuracy >= 95%
      }));
      setUserResults(formattedResults);
    } catch (error) {
      console.error('Error fetching user results:', error);
      setUserResults([]);
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
