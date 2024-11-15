import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button } from '@mui/material';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import './EditTypingParagraph.css';

const EditTypingParagraph = () => {
  const [typingParagraphs, setTypingParagraphs] = useState([]);
  const [editData, setEditData] = useState({
    id: '',
    exam: '',
    examName: '',
    testName: '',
    type: '',
    date: '', // Keep date as an empty string for now
    paper_code: '',
    title: '',
    paragraph: '',
    time: '',
    status: '1'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(['myadmin']);

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
          console.log('Fetched paragraphs:', paragraphs);
          setTypingParagraphs(paragraphs);
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
    data: typingParagraphs,
  });

  // Handle the click event for editing a paragraph
  const handleEditClick = (paragraph) => {
    // Format the date to YYYY-MM-DD for input compatibility
    const formattedDate = new Date(paragraph.date).toISOString().split('T')[0];

    setEditData({
      ...paragraph,
      date: formattedDate, // Set the formatted date here
    });
    console.log('Editing paragraph:', paragraph);
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
      date: '', // Reset date to empty string
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
          exam: editData.exam || undefined, // Send undefined for empty values
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
        console.error('Error:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.error || 'An error occurred while updating typing paragraph.',
        });
      }
    } catch (error) {
      console.error('Error submitting edit:', error);
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

  return (
    <>
      <div className="container-for-edit-typing-paragraph">
        <h1 className="edit-typing-paragraph-title">Edit Typing Paragraph</h1>
        <MaterialReactTable
          table={table}
          columns={columns}
          data={typingParagraphs}
        />
      </div>

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
          <label htmlFor="exam">Exam:</label>
          <input
            type="text"
            id="exam"
            value={editData.exam}
            onChange={(e) => setEditData({ ...editData, exam: e.target.value })}
            required
          />
          <label htmlFor="examName">Exam Name:</label>
          <input
            type="text"
            id="examName"
            value={editData.examName}
            onChange={(e) => setEditData({ ...editData, examName: e.target.value })}
            required
          />
          <label htmlFor="testName">Test Name:</label>
          <input
            type="text"
            id="testName"
            value={editData.testName}
            onChange={(e) => setEditData({ ...editData, testName: e.target.value })}
            required
          />
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
            required
          />
          <label htmlFor="date">Date:</label>
          <input
            type="date" // Use date input type
            id="date"
            value={editData.date} // This will be in 'YYYY-MM-DD' format
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            required
          />
          <label htmlFor="paper_code">Paper Code:</label>
          <input
            type="text"
            id="paper_code"
            value={editData.paper_code}
            onChange={(e) => setEditData({ ...editData, paper_code: e.target.value })}
            required
          />
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            required
          />
          <label htmlFor="paragraph">Paragraph:</label>
          <textarea
            id="paragraph"
            value={editData.paragraph}
            onChange={(e) => setEditData({ ...editData, paragraph: e.target.value })}
            required
          />
          <label htmlFor="time">Time:</label>
          <input
            type="number"
            id="time"
            value={editData.time}
            onChange={(e) => setEditData({ ...editData, time: e.target.value })}
            required
          />
 <Button type="submit" variant="contained" color="primary" className="modal-submit">Update</Button>
 <Button variant="contained" color="secondary" className="modal-delete" onClick={handleDelete}>Delete</Button>
        </form>
      </Modal>
    </>
  );
};

export default EditTypingParagraph;
