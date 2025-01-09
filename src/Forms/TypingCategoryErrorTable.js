import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const TypingCategoryErrorTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typingCategoryErrors`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Open the modal for Add/Edit
  const handleOpen = (row) => {
    setSelectedRow(row || { exam: '', category: '', error: 0, wpm: 0, status: 1 });
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  // Add or Update data
  const handleSave = async () => {
    try {
      const method = selectedRow._id ? 'PUT' : 'POST';
      const endpoint = selectedRow._id
        ? `${process.env.REACT_APP_API_URL}/api/typingCategoryErrors/${selectedRow._id}`
        : `${process.env.REACT_APP_API_URL}/api/typingCategoryErrors`;

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRow),
      });

      if (response.ok) {
        const updatedData = await response.json();
        if (method === 'POST') {
          setData([...data, updatedData]);
        } else {
          setData(data.map((row) => (row._id === updatedData._id ? updatedData : row)));
        }
        handleClose();
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Delete a row
  const handleDelete = async (rowId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typingCategoryErrors/${rowId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(data.filter((row) => row._id !== rowId));
      } else {
        console.error('Failed to delete row');
      }
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const columns = [
    { accessorKey: 'exam', header: 'Exam' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'error', header: 'Error' },
    { accessorKey: 'wpm', header: 'WPM' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'ts', header: 'Timestamp' },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box display="flex" gap={1}>
          <Button variant="outlined" onClick={() => handleOpen(row.original)}>
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(row.original._id)}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box className="container-for-edit-typing-paragraph">
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Typing Category Errors
      </Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: 2 }}
        onClick={() => handleOpen(null)} // Open modal for adding a new row
      >
        Add New Entry
      </Button>
      <MaterialReactTable columns={columns} data={data} enableSorting enablePagination />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" textAlign="center" marginBottom={2}>
            {selectedRow?._id ? 'Edit Entry' : 'Add New Entry'}
          </Typography>
          <TextField
            fullWidth
            label="Exam"
            variant="outlined"
            margin="normal"
            value={selectedRow?.exam || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, exam: e.target.value })}
          />
          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            margin="normal"
            value={selectedRow?.category || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, category: e.target.value })}
          />
          <TextField
            fullWidth
            label="Error"
            type="number"
            variant="outlined"
            margin="normal"
            value={selectedRow?.error || 0}
            onChange={(e) => setSelectedRow({ ...selectedRow, error: Number(e.target.value) })}
          />
          <TextField
            fullWidth
            label="WPM"
            type="number"
            variant="outlined"
            margin="normal"
            value={selectedRow?.wpm || 0}
            onChange={(e) => setSelectedRow({ ...selectedRow, wpm: Number(e.target.value) })}
          />
          <TextField
            fullWidth
            label="Status"
            type="number"
            variant="outlined"
            margin="normal"
            value={selectedRow?.status || 1}
            onChange={(e) => setSelectedRow({ ...selectedRow, status: Number(e.target.value) })}
          />
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ marginTop: 2, width: '100%' }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TypingCategoryErrorTable;
