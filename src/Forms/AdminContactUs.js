import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AdminContactUs = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  // Fetch messages from the server using fetch API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact-us-admin`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data); // Store the fetched messages
      } catch (error) {
        setError('Error fetching messages');
      }
    };

    fetchMessages();
  }, []);

  // Handle status change
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact-us-admin/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedMessage = await response.json();
      setMessages(messages.map(msg => msg._id === id ? updatedMessage : msg)); // Update the status in state
    } catch (error) {
      setError('Error updating status');
    }
  };

  return (
    <div className="container-for-edit-typing-paragraph">
       <h1 className="add-ebook-form">
        Admin Contact Messages
      </h1>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Message</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg._id}>
                <TableCell>{msg.fullName}</TableCell>
                <TableCell>{msg.email}</TableCell>
                <TableCell>{msg.message}</TableCell>
                <TableCell>
                  <Typography 
                    style={{
                      color: msg.status === 'completed' ? 'green' : 'orange',
                      fontWeight: 'bold'
                    }}
                  >
                    {msg.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color={msg.status === 'completed' ? 'secondary' : 'primary'} 
                    onClick={() => handleStatusChange(msg._id, msg.status)}
                  >
                    Mark as {msg.status === 'completed' ? 'Pending' : 'Completed'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminContactUs;
