import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const PlansTable = () => {
  const [plans, setPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Fetch all plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/plans`);
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  // Handle opening modal and selecting the plan to edit
  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedPlan(null);
  };

  // Handle plan update
  const handleUpdate = async () => {
    if (!selectedPlan) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/updatePlan/${selectedPlan._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedPlan),
      });

      if (response.ok) {
        alert('Plan updated successfully!');
        handleClose(); // Close modal after successful update
        setPlans(plans.map(plan => (plan._id === selectedPlan._id ? selectedPlan : plan))); // Update the plan in the table
      } else {
        alert('Failed to update plan');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Plan Name',
    },
    {
      accessorKey: 'oldAmount',
      header: 'Old Amount (₹)',
    },
    {
      accessorKey: 'priceDrop',
      header: 'Price Drop (₹)',
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total Amount (₹)',
    },
    {
      accessorKey: 'savings',
      header: 'Savings (₹)',
    },
    {
      id: 'edit',
      header: 'Edit',
      Cell: ({ row }) => (
        <Button variant="outlined" onClick={() => handleEdit(row.original)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box className="container-for-edit-typing-paragraph">
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Subscription Plans
      </Typography>

      <MaterialReactTable columns={columns} data={plans} enableSorting enablePagination />

      {/* Edit Plan Modal */}
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
            maxHeight: '80vh', // Maximum height for responsiveness
            overflowY: 'auto', // Enable vertical scrolling
          }}
        >
          <Typography variant="h5" textAlign="center" marginBottom={2}>
            Edit Plan
          </Typography>

          {selectedPlan && (
            <>
              <TextField
                fullWidth
                label="Plan Name"
                variant="outlined"
                margin="normal"
                value={selectedPlan.name}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
              />

              <TextField
                fullWidth
                label="Old Amount (₹)"
                type="number"
                variant="outlined"
                margin="normal"
                value={selectedPlan.oldAmount}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, oldAmount: e.target.value })}
              />

              <TextField
                fullWidth
                label="Price Drop (₹)"
                type="number"
                variant="outlined"
                margin="normal"
                value={selectedPlan.priceDrop}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, priceDrop: e.target.value })}
              />

              <TextField
                fullWidth
                label="Total Amount (₹)"
                variant="outlined"
                margin="normal"
                value={selectedPlan.totalAmount}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, totalAmount: e.target.value })}
              />

              <TextField
                fullWidth
                label="Savings (₹)"
                variant="outlined"
                margin="normal"
                value={selectedPlan.savings}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, savings: e.target.value })}
              />

              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  marginTop: 3,
                  padding: 1,
                  backgroundColor: '#6a11cb',
                  '&:hover': {
                    backgroundColor: '#2575fc',
                  },
                }}
              >
                Update Plan
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PlansTable;
