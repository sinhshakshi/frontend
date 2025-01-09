import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Typography, Chip, Grid, CardContent, Card } from '@mui/material';

const StudentPurchase = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch purchases from the API
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/studentPurchases`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching student purchases:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  // Function to calculate totals for each plan
  const calculatePlanTotals = (data) => {
    const totals = {};
    data.forEach((item) => {
      const plan = item.selectedPlan || 'No Plan';
      if (!totals[plan]) {
        totals[plan] = 0;
      }
      totals[plan] += 1;
    });
    return totals;
  };

  const planTotals = calculatePlanTotals(data);

  // Highlight row colors based on the selected plan
  const getRowColor = (plan) => {
    switch (plan) {
      case '180 Days':
        return '#80deea'; // Dark Cyan
      case 'No Plan':
        return '#e57373'; // Red
      case '30 Days':
        return '#ffb74d'; // Dark Orange
      case '15 Days':
        return '#ffccbc'; // Light Red
      case '90 Days':
        return '#81c784'; // Dark Green
      case '3 Days':
        return '#b2ebf2'; // Light Cyan
      case '25 Days':
        return '#9575cd'; // Purple
      default:
        return '#e0e0e0'; // Light Gray
    }
  };

  // Columns for MaterialReactTable
  const columns = [
    {
      accessorKey: 'serial',
      header: '#',
      size: 50,
      Cell: ({ row }) => row.index + 1,
    },
    { accessorKey: 'email_id', header: 'Email ID' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'product_id', header: 'Product ID' },
    {
      accessorKey: 'selectedPlan',
      header: 'Selected Plan',
      Cell: ({ cell }) => (
        <Chip
          label={cell.getValue()}
          sx={{
            background: `linear-gradient(45deg, ${getRowColor(cell.getValue())}, #ffffff)`,
            color: '#000',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            padding: '4px 8px',
          }}
        />
      ),
    },
    {
      accessorKey: 'subscriptionStartDate',
      header: 'Subscription Start Date',
      Cell: ({ cell }) => (cell.getValue() ? new Date(cell.getValue()).toLocaleDateString() : ''),
    },
    {
      accessorKey: 'subscriptionExpiryDate',
      header: 'Subscription Expiry Date',
      Cell: ({ cell }) => (cell.getValue() ? new Date(cell.getValue()).toLocaleDateString() : ''),
    },
  ];

  // Plan totals table columns
  const planColumns = [
    {
      accessorKey: 'plan',
      header: 'Plan',
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: 'count',
      header: 'Students Count',
      Cell: ({ cell }) => cell.getValue(),
    },
  ];

  // Plan totals data for the new table
  const planData = Object.entries(planTotals).map(([plan, count]) => ({
    plan,
    count,
  }));

  return (
    <>
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" textAlign="center" marginBottom={2} sx={{ fontWeight: 'bold', color: '#333' }}>
        Student Purchases
      </Typography>

      {/* Displaying plan totals in a table */}
      <Grid container spacing={3}>
        {planData.map(({ plan, count }) => (
          <Grid item xs={12} sm={6} md={4} key={plan}>
            <Card
              sx={{
                backgroundColor: getRowColor(plan),
                borderRadius: 2,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                  {plan}
                </Typography>
                <Chip
                  label={`${count} students`}
                  sx={{
                    marginTop: 1,
                    backgroundColor: '#fff',
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
  

      {/* Student data table */}
      <MaterialReactTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        enablePagination
        enableColumnFilters
        enableSorting
        initialState={{
          pagination: { pageSize: 100 },
        }}
        muiTableContainerProps={{
          sx: {
            maxHeight: '500px',
            border: '2px solid #bbb',
            borderRadius: 3,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          },
        }}
        muiTableBodyRowProps={({ row }) => ({
          sx: {
            backgroundColor: getRowColor(row.original.selectedPlan),
            borderBottom: '1px solid #aaa',
            // Removed hover effect from here
          },
        })}
        muiTableHeadCellProps={{
          sx: {
            fontWeight: 'bold',
            backgroundColor: '#757575',
            color: '#fff',
            borderBottom: '2px solid #ccc',
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            color: '#222',
            fontWeight: '600',
            borderBottom: '1px solid #ccc',
          },
        }}
        muiTableProps={{
          sx: {
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            '& tbody tr': {
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            },
          },
        }}
      />
    </Box></>
  );
};

export default StudentPurchase;
