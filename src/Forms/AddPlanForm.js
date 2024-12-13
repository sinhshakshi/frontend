import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddPlanForm = () => {
  const [name, setName] = useState('');
  const [priceDrop, setPriceDrop] = useState('');
  const [savings, setSavings] = useState('');
  const [oldAmount, setOldAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  // Function to calculate price drop and savings
  const calculatePrices = () => {
    const old = parseFloat(oldAmount || 0);
    const drop = parseFloat(priceDrop || 0);

    const total = old - drop; // Calculate the total amount after applying the price drop
    const saved = old - total; // Savings is the difference between old and total

    setTotalAmount(`₹${total.toFixed(2)}`);
    setSavings(`₹${saved.toFixed(2)}`);
  };

  // Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlan = {
      name,
      priceDrop,
      savings,
      oldAmount,
      totalAmount,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addPlan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlan),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Plan added successfully!');
        // Clear the form after submission
        setName('');
        setPriceDrop('');
        setOldAmount('');
        setTotalAmount('');
        setSavings('');
      } else {
        alert('Failed to add the plan');
      }
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  useEffect(() => {
    if (oldAmount && priceDrop) {
      calculatePrices();
    }
  }, [oldAmount, priceDrop]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#ffffff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          marginBottom={2}
          sx={{ color: '#4a4a4a', fontWeight: 'bold' }}
        >
          Add New Subscription Plan
        </Typography>

        <TextField
          fullWidth
          label="Plan Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          fullWidth
          label="Old Amount (₹)"
          type="number"
          variant="outlined"
          margin="normal"
          value={oldAmount}
          onChange={(e) => setOldAmount(e.target.value)}
          required
        />

        <TextField
          fullWidth
          label="Price Drop (₹)"
          type="number"
          variant="outlined"
          margin="normal"
          value={priceDrop}
          onChange={(e) => setPriceDrop(e.target.value)}
          required
        />

        <TextField
          fullWidth
          label="Total Amount (₹)"
          variant="outlined"
          margin="normal"
          value={totalAmount}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          fullWidth
          label="Savings (₹)"
          variant="outlined"
          margin="normal"
          value={savings}
          InputProps={{
            readOnly: true,
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            marginTop: 3,
            padding: 1,
            backgroundColor: '#6a11cb',
            '&:hover': {
              backgroundColor: '#2575fc',
            },
          }}
        >
          Add Plan
        </Button>
      </Box>
    </Box>
  );
};

export default AddPlanForm;
