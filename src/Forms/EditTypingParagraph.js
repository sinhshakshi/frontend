

import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import './EditTypingParagraph.css';

const EditTypingParagraph = () => {
  const [typingParagraphs, setTypingParagraphs] = useState([]);
  const [filteredParagraphs, setFilteredParagraphs] = useState([]);
  const [editData, setEditData] = useState({
    id: '',
    exam: '',
    examName: '',
    testName: '',
    type: '',
    date: '',
    paper_code: '',
    title: '',
    paragraph: '',
    time: '',
    status: '1'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(['myadmin']);
  
  // States for filters
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedExamName, setSelectedExamName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch typing paragraphs from the API
  useEffect(() => {
    const fetchTypingParagraphs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typingParagraphs`, {
          headers: {
            'Authorization': `Bearer ${cookies.myadmin}`
          }
        });
        if (response.ok) {
          const paragraphs = await response.json();
          setTypingParagraphs(paragraphs);
          setFilteredParagraphs(paragraphs); // Set the initial filtered data to all paragraphs
        } else {
          console.error('Failed to fetch typing paragraphs');
        }
      } catch (error) {
        console.error('Error fetching typing paragraphs:', error);
      }
    };
    fetchTypingParagraphs();
  }, [cookies.myadmin]);

  // Define columns for the Material React Table
  const columns = useMemo(() => [
    { accessorKey: 'exam', header: 'Exam' },
    { accessorKey: 'examName', header: 'Exam Name' },
    { accessorKey: 'testName', header: 'Test Name' },
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'paper_code', header: 'Paper Code' },
    {
      id: 'edit',
      header: 'Edit',
      Cell: ({ row }) => (
        <Button variant="contained" color="primary" onClick={() => handleEditClick(row.original)}>
          Edit
        </Button>
      ),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: filteredParagraphs, // Use the filtered paragraphs
  });

  // Handle the click event for editing a paragraph
  const handleEditClick = (paragraph) => {
    const formattedDate = new Date(paragraph.date).toISOString().split('T')[0];
    setEditData({
      ...paragraph,
      date: formattedDate,
    });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close the modal and reset edit data
  const closeModal = () => {
    setIsModalOpen(false);
    setEditData({
      id: '',
      exam: '',
      examName: '',
      testName: '',
      type: '',
      date: '',
      paper_code: '',
      title: '',
      paragraph: '',
      time: '',
      status: '1'
    });
    document.body.style.overflow = '';
  };

  // Handle the submission of edited paragraph data
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/updateTypingParagraph`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.myadmin}`
        },
        body: JSON.stringify({
          id: editData.id,
          exam: editData.exam || undefined,
          examName: editData.examName || undefined,
          testName: editData.testName || undefined,
          type: editData.type || undefined,
          date: editData.date || undefined,
          paper_code: editData.paper_code || undefined,
          title: editData.title || undefined,
          paragraph: editData.paragraph || undefined,
          time: editData.time || undefined,
          status: editData.status || undefined
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: result.message,
        });
        setTypingParagraphs((prev) =>
          prev.map((item) => (item.id === editData.id ? result.updatedParagraph : item))
        );
        closeModal();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.error || 'An error occurred while updating typing paragraph.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting the edit. Please try again later.',
      });
    }
  };

  // Handle paragraph deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/deleteTypingParagraph/${editData.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${cookies.myadmin}`
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Typing paragraph deleted successfully!',
        });
        setTypingParagraphs(typingParagraphs.filter((item) => item.id !== editData.id));
        closeModal();
      } else {
        throw new Error('Failed to delete typing paragraph');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting typing paragraph. Please try again later.',
      });
    }
  };

  // Filter function based on selected exam, exam name, and date
  useEffect(() => {
    let filteredData = typingParagraphs;

    // Apply exam filter
    if (selectedExam) {
      filteredData = filteredData.filter((item) => item.exam === selectedExam);
    }

    // Apply exam name filter
    if (selectedExamName) {
      filteredData = filteredData.filter((item) => item.examName === selectedExamName);
    }

    // Apply date filter
    if (selectedDate) {
      filteredData = filteredData.filter((item) => item.date === selectedDate);
    }

    // Log the selected filters and the filtered data
    console.log('Selected Filters:', { selectedExam, selectedExamName, selectedDate });
    console.log('Filtered Data:', filteredData);

    setFilteredParagraphs(filteredData);
  }, [selectedExam, selectedExamName, selectedDate, typingParagraphs]); // Re-run filter when any of these values change

  // Handle exam change to load corresponding exam names
  const getExamNames = () => {
    const examNames = typingParagraphs
      .filter((item) => item.exam === selectedExam)
      .map((item) => item.examName);
    return [...new Set(examNames)]; // Remove duplicates
  };

  const examNames = getExamNames();

  return (
    <>
      <div className="container-for-edit-typing-paragraph">
        <h1 className="edit-typing-paragraph-title">Edit Typing Paragraph</h1>

        {/* Filter Controls */}
        <div className="filters-container">
          <FormControl variant="outlined" className="filter-select">
            <InputLabel>Exam</InputLabel>
            <Select
              value={selectedExam}
              onChange={(e) => {
                setSelectedExam(e.target.value);
                setSelectedExamName('');  // Reset Exam Name when Exam changes
                setSelectedDate('');  // Reset Date when Exam changes
              }}
              label="Exam"
            >
              {[...new Set(typingParagraphs.map(item => item.exam))].map((exam) => (
                <MenuItem key={exam} value={exam}>{exam}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className="filter-select">
            <InputLabel>Exam Name</InputLabel>
            <Select
              value={selectedExamName}
              onChange={(e) => setSelectedExamName(e.target.value)}
              label="Exam Name"
              disabled={!selectedExam}
            >
              {examNames.map((examName) => (
                <MenuItem key={examName} value={examName}>{examName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <MaterialReactTable
          table={table}
          columns={columns}
          data={filteredParagraphs}
        />
      </div>

      {/* Modal for editing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Typing Paragraph Modal"
        className="modal-container-for-editing-typing-paragraph"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header-for-editing-typing-paragraph">
          <h1>Edit Typing Paragraph</h1>
          <button className="modal-close" onClick={closeModal}>&times;</button>
        </div>
        <form className="modal-form-for-editing-typing-paragraph" onSubmit={handleEditSubmit}>
          {/* Form fields for editing (same as before) */}
          <Button type="submit" variant="contained" color="primary" className="modal-submit">Update</Button>
          <Button variant="contained" color="secondary" className="modal-delete" onClick={handleDelete}>Delete</Button>
        </form>
      </Modal>
    </>
  );
};

export default EditTypingParagraph;



