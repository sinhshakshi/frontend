import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal } from '@mui/material';

const TypingInfoUpdate = () => {
    const [typingInfoList, setTypingInfoList] = useState([]);
  const [selectedTypingInfo, setSelectedTypingInfo] = useState({
    metaTag: '',
    examName: '',
    image: '',
    introduction: '',
    paramLink: '',
    category: '',
    youtubeVideoLink: ''
  });
  const [open, setOpen] = useState(false); // Modal open state
  const [error, setError] = useState('');

  // Fetch all typing info from the server
  useEffect(() => {
    const fetchTypingInfoList = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing-info-admin`);
          if (!response.ok) {
            throw new Error('Failed to fetch typing info');
          }
          const data = await response.json();
          console.log('Fetched data:', data);  // Check the data structure here
          if (Array.isArray(data)) {
            setTypingInfoList(data); // Ensure data is an array
          } else {
            throw new Error('Fetched data is not an array');
          }
        } catch (error) {
          setError('Error fetching typing info');
          console.error(error);  // Log any error that occurs
        }
      };
      

    fetchTypingInfoList();
  }, []);

  // Open Modal for editing
  const handleEdit = (info) => {
    setSelectedTypingInfo(info);
    setOpen(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTypingInfo({ ...selectedTypingInfo, [name]: value });
  };

  // Handle form submission to update the typing info
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/put-typing-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedTypingInfo)
      });

      if (!response.ok) {
        throw new Error('Failed to update typing info');
      }

      const updatedInfo = await response.json();
      setTypingInfoList(typingInfoList.map(info => info._id === updatedInfo._id ? updatedInfo : info)); // Update the list
      setOpen(false); // Close the modal
      alert('Typing info updated successfully!');
    } catch (error) {
      setError('Error updating typing info');
    }
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-for-edit-typing-paragraph">
       <h1 className="edit-typing-paragraph-title">
        Typing Info List
      </h1>
      {error && <Typography color="error">{error}</Typography>}
      
      {/* Table to display all typing info */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Meta Tag</strong></TableCell>
              <TableCell><strong>Exam Name</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typingInfoList.map((info) => (
              <TableRow key={info._id}>
                <TableCell>{info.metaTag}</TableCell>
                <TableCell>{info.examName}</TableCell>
                <TableCell>{info.category}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(info)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing */}
      <Modal open={open} onClose={handleClose}
      
             
      
      
      >
        <div  className="modal-container-for-editing-typing-paragraph">
        <h1 className="edit-typing-paragraph-title">Edit Typing Info</h1>
          <button className="modal-close" onClick={handleClose}>&times;</button>
          <form onSubmit={handleSubmit}  overlayClassName="modal-overlay">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Meta Tag"
                  fullWidth
                  name="metaTag"
                  value={selectedTypingInfo.metaTag}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Exam Name"
                  fullWidth
                  name="examName"
                  value={selectedTypingInfo.examName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  fullWidth
                  name="image"
                  value={selectedTypingInfo.image}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Introduction"
                  fullWidth
                  name="introduction"
                  value={selectedTypingInfo.introduction}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Param Link"
                  fullWidth
                  name="paramLink"
                  value={selectedTypingInfo.paramLink}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Category"
                  fullWidth
                  name="category"
                  value={selectedTypingInfo.category}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="YouTube Video Link"
                  fullWidth
                  name="youtubeVideoLink"
                  value={selectedTypingInfo.youtubeVideoLink}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TypingInfoUpdate;
