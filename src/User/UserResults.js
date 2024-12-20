
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/exams-user-for-result`);
        if (!response.ok) throw new Error('Failed to fetch exams');
        const data = await response.json();

        const dropdownData = data.reduce((acc, item) => {
          if (!acc[item.exam]) acc[item.exam] = [];
          if (!acc[item.exam].some((entry) => entry.examName === item.examName)) {
            acc[item.exam].push({ examName: item.examName, paper_code: item.paper_code });
          }
          return acc;
        }, {});

        setExamDropdownData(dropdownData);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams();
  }, []);

  const handleExamNameSelect = (examName) => {
    setSelectedExamName(examName);

    const paperCode = Object.values(examDropdownData)
      .flat()
      .find((item) => item.examName === examName)?.paper_code;

    setSelectedPaperCode(paperCode);

    if (paperCode) fetchUserResults(paperCode);
    else setUserResults([]);
  };

  const fetchUserResults = async (paper_code) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user-results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.session_id}`,
        },
        body: JSON.stringify({
          paper_code,
          email_id: cookies.SSIDCE,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch user results');

      const data = await response.json();
      const formattedResults = data.map((item) => ({
        date: new Date(item.ts).toLocaleDateString(),
        testname: item.testname,
        accuracy: item.accuracy.toFixed(2),
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

  const handleViewResult = (testname) => {
    navigate(`/${selectedPaperCode}/${selectedExamName}/${testname}/typing-test-result`);
  };

  return (
    <div className="user-results-container">
      <h2>Select an Exam and View Results</h2>
      <nav className="horizontal-nav">
        {Object.keys(examDropdownData).map((exam, index) => (
          <div className="horizontal-nav-item" key={index}>
            <button className="nav-btn">{exam}</button>
            <div className="dropdown-menu">
              {examDropdownData[exam].map((item, subIndex) => (
                <span
                  key={subIndex}
                  onClick={() => handleExamNameSelect(item.examName)}
                  className="dropdown-item"
                >
                  {item.examName}
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
                  onClick={() => handleViewResult(result.testname)}
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
