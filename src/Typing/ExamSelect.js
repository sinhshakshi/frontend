

import React, { useState, useEffect } from 'react';
import './ExamSelect.css';
import { useNavigate } from 'react-router-dom';
import pic1 from '../i/sscLogo.webp';
import TypingHeader from '../component/Header';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { MdKeyboardArrowRight } from "react-icons/md";
import ssc from "../i/examselect/ssc.png";
import MainFooter from '../Footermain/Footer';

const ExamSelect = () => {
  const [examList, setExamList] = useState([]);
  const [allTypingData, setAllTypingData] = useState([]);
  const [selectedExamCategory, setSelectedExamCategory] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  console.log("all data", allTypingData);
  console.log("selectedExamCategory", selectedExamCategory);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/exams`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const groupedExams = data.reduce((acc, item) => {
          if (!acc[item.exam]) {
            acc[item.exam] = {
              exam: item.exam,
              examNames: [],
            };
          }
          acc[item.exam].examNames.push(item.examName);
          return acc;
        }, {});

        const exams = Object.values(groupedExams);
        setExamList(exams);

        // Set default exam to SSC if available
        const defaultExam = exams.find((exam) => exam.exam === 'SSC') || exams[0];
        if (defaultExam) {
          setSelectedExamCategory(defaultExam);
          fetchParagraphs(defaultExam.examNames[0]);
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    const fetchAllTypingData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing/getalltypingdata`);
        const data = await response.json();
        setAllTypingData(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching all typing data:", error);
      }
    };
    fetchExams();
    fetchAllTypingData();
  }, []);

  const fetchParagraphs = (examName) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/typingParagraphs-exam`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ examName }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setParagraphs(data)) // Assuming data contains the mapped response
    .catch(error => console.error('Error fetching paragraphs:', error.message));
  };

  const handleExamHover = (examCategory) => {
    setSelectedExamCategory(examCategory);
  };

  // Update: Now passes examCategory and clicked examName
  const handleExamClick = (examCategory, examName) => {
    setSelectedExamCategory(examCategory);
    fetchParagraphs(examName); // Fetch paragraphs based on clicked examName
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const checkProductAccess = async (para) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkAccessTypingProduct`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({ product_id: '999' }) // Replace with actual product ID
      });

      if (response.ok) {
        const { access } = await response.json();
        if (access === "access") {
          // Redirect to TypingTestSelector if access is granted
          navigate(`/exam/${selectedExamCategory.exam}/${para.examName}/${para.paper_code}/testselect`);
        } else {
          // Redirect to payment if access is not granted
          navigate(`/exam/${selectedExamCategory.exam}/${para.examName}/${para.paper_code}/payment`);
        }
      } else {
        console.error("Failed to check product access", response.statusText);
        navigate(`/exam/${selectedExamCategory.exam}/${para.examName}/${para.paper_code}/payment`);
      }
    } catch (error) {
      console.error("Error checking product access", error);
      navigate(`/exam/${selectedExamCategory.exam}/${para.examName}/${para.paper_code}/payment`);
    }
  };

  const handleParagraphClick = (para) => {
    checkProductAccess(para); // Call the access check before navigating
  };

  // Function to count occurrences of each examName
  const countExamNames = () => {
    const counts = {};
    allTypingData.forEach(item => {
      const { examName } = item;
      counts[examName] = (counts[examName] || 0) + 1;
    });
    return counts;
  };

  // Get counts of exam names for the selected exam category
  const examNameCounts = countExamNames();

  return (
    <>
      <TypingHeader />
      <div className='container-exam-selection'>
        <div className="exam-select-search">
          <div className="exam-select-search-and-input">
            <input 
              type="text" 
              placeholder="Search for your exam..." 
              className="search-input"
            />
            <button className="search-button">
              <FaSearch className='search-tag-exam' />
            </button>
          </div>
        </div>
        <div className='heading-exam-select'>
          <h2>Explore all exams</h2>
          <p>Get exam-ready with structured typing practice, skill-building exercises, and real-time feedback.</p>
        </div>
        <div className="layout-section-exam">
          <div className="layout-section">
            <div className="exam-categories">
              <div className='new-category-select'>
                <div className="category-list">
                  {examList.map((item, index) => (
                    <div key={index} className="div-exam-name-image">
                      <img
                        width="31"
                        height="31"
                        alt="Profile"
                        className="examselectimage"
                        src={ssc}
                      />
                      <div 
                        className="category-item" 
                        onMouseEnter={() => handleExamHover(item)}
                      >
                        {item.exam} Exams
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="exam-details">
              <div className="exam-cards">
                {selectedExamCategory && 
                  Array.from(new Set(selectedExamCategory.examNames)).map((examName, idx) => (
                    <div 
                      key={idx} 
                      className="exam-card" 
                      onClick={() => handleExamClick(selectedExamCategory, examName)} // Pass the examName
                    >
                      <div className="exam-cards-img">
                        <img className="myexamnameimg" src={pic1} alt="Candidate" />
                      </div>
                      <div className="exam-cards-count-test">
                      <div className="exam-cards-para">
                        <p>{selectedExamCategory.exam}</p>
                        <p className='examname'>{examName}</p>
                        {/* Display the count of the exam name */}
                       
                      </div>
                      <p className='exam-count'>{examNameCounts[examName] || 0} typing tests</p>
                    </div>
                    <MdKeyboardArrowRight className='right-exam-arrow'/>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`examselectmodal ${modalIsOpen ? 'open' : ''}`}>
        <div className="modal-content-review">
          <button className="close-button" onClick={closeModal}>
            <FaTimes />
          </button>
          <h2 className="exam-header header-highlight">
            {selectedExamCategory?.exam}
          </h2>
          <div className="modal-content">
            {paragraphs.length > 0 ? (
              // Use a Set to ensure unique paper codes
              Array.from(new Set(paragraphs.map(para => para.paper_code))).map((uniqueCode, idx) => {
                const para = paragraphs.find(p => p.paper_code === uniqueCode);
                return (
                  <div
                    key={idx}
                    className="paragraph-item"
                    onClick={() => handleParagraphClick(para)}
                  >
                    <p>Paper Code: {para.paper_code}</p>
                  </div>
                );
              })
            ) : (
              <p>No paragraphs available for this exam.</p>
            )}
          </div>
        </div>
      </div>
      <MainFooter/>
    </>
  );
};

export default ExamSelect;
