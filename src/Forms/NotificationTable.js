import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const NotificationTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch data from the backend (assuming the notifications are stored in the database)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications`);
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
    setSelectedRow(row || { number: '', notification: '' }); // Set default empty values for new entry
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  // Add or Update notification data
  const handleSave = async () => {
    try {
      const method = selectedRow._id ? 'PUT' : 'POST';
      const endpoint = selectedRow._id
        ? `${process.env.REACT_APP_API_URL}/api/notifications/${selectedRow._id}`
        : `${process.env.REACT_APP_API_URL}/api/notifications`;

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

  // Delete a notification
  const handleDelete = async (rowId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/${rowId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(data.filter((row) => row._id !== rowId));
      } else {
        console.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const columns = [
    { accessorKey: 'number', header: 'Number' },
    { accessorKey: 'notification', header: 'Notification' },
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
        Notifications
      </Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: 2 }}
        onClick={() => handleOpen(null)} // Open modal for adding a new notification
      >
        Add New Notification
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
            {selectedRow?._id ? 'Edit Notification' : 'Add New Notification'}
          </Typography>
          <TextField
            fullWidth
            label="Number"
            variant="outlined"
            margin="normal"
            value={selectedRow?.number || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, number: e.target.value })}
          />
          <TextField
            fullWidth
            label="Notification"
            variant="outlined"
            margin="normal"
            value={selectedRow?.notification || ''}
            onChange={(e) => setSelectedRow({ ...selectedRow, notification: e.target.value })}
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

export default NotificationTable;
