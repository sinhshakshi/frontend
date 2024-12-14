


import React, { useState, useEffect } from 'react';
import './ExamResult.css';
import TypingHeader from '../component/Header';
import MainFooter from '../Footermain/Footer';

const ExamResult = () => {
  const [examDropdownData, setExamDropdownData] = useState({});
  const [selectedExamName, setSelectedExamName] = useState('');
  const [selectedPaperCode, setSelectedPaperCode] = useState(null);
  const [examResults, setExamResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch exam list


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/exams-papercode-for-result`);
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
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

  // Handle selection of an exam name
  const handleExamNameSelect = (examName) => {
    setSelectedExamName(examName);

    const paperCode = Object.values(examDropdownData)
      .flat()
      .find((item) => item.examName === examName)?.paper_code;

    setSelectedPaperCode(paperCode);

    if (paperCode) {
      fetchResults(paperCode);
    } else {
      setExamResults([]);
      setFilteredResults([]);
    }
  };

  // Fetch results based on paper code
  const fetchResults = async (paper_code) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getResultsByPaperCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paper_code }),
      });

      if (!response.ok) throw new Error('Failed to fetch results');

      const data = await response.json();
      setExamResults(data);
      setFilteredResults(data); // Initialize filtered results
    } catch (error) {
      console.error('Error fetching results:', error);
      setExamResults([]);
      setFilteredResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = examResults.filter((result) =>
      result.full_name.toLowerCase().includes(query)
    );
    setFilteredResults(filtered);
  };

  return (
    <>
      <TypingHeader />
      <div className="exam-result-container">
        <h2 className='myhead'>Today Live Typing Test Results</h2>
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

        {selectedPaperCode && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by full name..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        )}

        <div className="exam-results">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : selectedExamName && !selectedPaperCode ? (
            <p>No results available for the selected exam name.</p>
          ) : selectedPaperCode && filteredResults.length === 0 ? (
            <p>No results found for this exam.</p>
          ) : selectedPaperCode && filteredResults.length > 0 ? (
            <table className="result-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Full Name</th>
                  <th>Speed</th>
                  <th>Accuracy</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.rank}</td>
                    <td>{result.full_name}</td>
                    <td>{result.speed} WPM</td>
                    <td>{result.accuracy}%</td>
                    <td className={result.status === 'Pass' ? 'pass' : 'fail'}>{result.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Select an exam and exam name to see results.</p>
          )}
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ExamResult;