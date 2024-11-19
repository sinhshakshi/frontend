import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import quill styles for the editor
import './ExamTable.css'; // Import the CSS file

const ExamTable = () => {
  const [exams, setExams] = useState([]);
  const [editExam, setEditExam] = useState(null); // Track exam being edited
  const [open, setOpen] = useState(false); // Modal state
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null); // State to hold the image file

  // Fetch exams data
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/examsimagedata`);
        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setMessage('Error fetching exams.');
      }
    };

    fetchExams();
  }, []);

  // Open modal with exam data for editing
  const handleEditClick = (exam) => {
    setEditExam(exam);
    setImage(null); // Reset image selection when opening the modal
    setOpen(true);
  };

  // Handle file change (image selection)
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file in state
  };

  // Handle exam data update
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('govName', editExam.govName);
    if (image) {
      formData.append('image', image); // Append the image file if selected
    }
    formData.append('introduction', editExam.introduction);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/examsimagedata/${editExam._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedExam = await response.json();
        setExams((prevExams) =>
          prevExams.map((exam) =>
            exam._id === updatedExam._id ? updatedExam : exam
          )
        );
        setMessage('Exam updated successfully!');
      } else {
        setMessage('Error updating exam.');
      }
    } catch (error) {
      console.error('Error updating exam:', error);
      setMessage('Something went wrong.');
    }

    setOpen(false);
  };

  return (
    <div className="examtable-container">
      <h2 className="examtable-header">Exam List</h2>

      {/* Display success or error message */}
      {message && (
        <p className={message.includes('Error') ? 'examtable-message-error' : 'examtable-message'}>
          {message}
        </p>
      )}

      <MaterialReactTable
        columns={[
          { accessorKey: 'govName', header: 'Exam Name' },
          {
            accessorKey: 'imagePath',
            header: 'Image',
            Cell: ({ row }) => (
              <img
                src={`${process.env.REACT_APP_API_URL}/${row.original.imagePath}`} // Access imagePath from row.original
                alt="Exam"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Style for image
              />
            ),
          },
          { accessorKey: 'introduction', header: 'Introduction' },
          {
            accessorKey: 'edit',
            header: 'Actions',
            Cell: ({ row }) => (
              <Button
                variant="contained"
                className="examtable-button"
                onClick={() => handleEditClick(row.original)}
              >
                Edit
              </Button>
            ),
          },
        ]}
        data={exams}
        enableColumnFilter={false}
        enableSorting={true}
        className="examtable-table"
      />

      {/* Modal for editing exam */}
      <Dialog open={open} onClose={() => setOpen(false)} className="examtable-dialog">
        <DialogTitle>Edit Exam</DialogTitle>
        <DialogContent>
          <TextField
            label="Exam Name"
            fullWidth
            value={editExam?.govName || ''}
            onChange={(e) =>
              setEditExam({ ...editExam, govName: e.target.value })
            }
            margin="normal"
            className="examtable-textfield"
          />
          <TextField
            label="Image URL"
            fullWidth
            value={editExam?.imagePath || ''}
            onChange={(e) =>
              setEditExam({ ...editExam, imagePath: e.target.value })
            }
            margin="normal"
            className="examtable-textfield"
          />

          {/* File input for image */}
          <div className="examtable-file-input">
            <label className="examtable-label">Choose Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="examtable-image-input"
              accept="image/*"
            />
            {image && <p>{image.name}</p>} {/* Display selected image file name */}
          </div>

          {/* Display selected image in the modal */}
          {image && (
            <div className="examtable-selected-image">
              <img
                src={URL.createObjectURL(image)} // Show the selected image
                alt="Selected Exam"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="examtable-quill">
            <label className="examtable-label">Introduction:</label>
            <ReactQuill
              value={editExam?.introduction || ''}
              onChange={(value) =>
                setEditExam({ ...editExam, introduction: value })
              }
              placeholder="Write the introduction here..."
              theme="snow"
            />
          </div>
        </DialogContent>
        <DialogActions className="examtable-dialog-actions">
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExamTable;
