import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';
import './ManageStatusTypingParagraph.css';

const ManageStatusTypingParagraph = () => {
  const [typingParagraphs, setTypingParagraphs] = useState([]);
  const [filteredParagraphs, setFilteredParagraphs] = useState([]);
  const [editData, setEditData] = useState({ id: '', status: '1' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(['myadmin']);

  // Fetch typing paragraphs from the API
  useEffect(() => {
    const fetchTypingParagraphs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typingParagraphs`, {
          headers: {
            'Authorization': `Bearer ${cookies.myadmin}`,
          },
        });
        if (response.ok) {
          const paragraphs = await response.json();
          setTypingParagraphs(paragraphs);
          setFilteredParagraphs(paragraphs); // Initialize filtered data
        } else {
          console.error('Failed to fetch typing paragraphs');
        }
      } catch (error) {
        console.error('Error fetching typing paragraphs:', error);
      }
    };
    fetchTypingParagraphs();
  }, [cookies.myadmin]);

  // Define columns for Material React Table
  const columns = useMemo(() => [
    { accessorKey: 'exam', header: 'Exam' },
    { accessorKey: 'examName', header: 'Exam Name' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'status', header: 'Status' },
    {
      id: 'toggleStatus',
      header: 'Toggle Status',
      Cell: ({ row }) => (
        <Button
          variant="contained"
          color={row.original.status === 1 ? 'secondary' : 'primary'}
          onClick={() => handleToggleStatus(row.original)}
        >
          {row.original.status === 1 ? 'Deactivate' : 'Activate'}
        </Button>
      ),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: filteredParagraphs, // Use the filtered paragraphs
  });

  // Toggle status functionality
  const handleToggleStatus = async (paragraph) => {
    try {
      const newStatus = paragraph.status === 1 ? 0 : 1;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/updateTypingParagraph-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.myadmin}`,
        },
        body: JSON.stringify({ id: paragraph.id, status: newStatus }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `Paragraph status has been ${newStatus === 1 ? 'activated' : 'deactivated'}.`,
        });
        setTypingParagraphs((prev) =>
          prev.map((item) => (item.id === paragraph.id ? { ...item, status: newStatus } : item))
        );
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating status. Please try again.',
      });
    }
  };

  // Filter paragraphs by status
  const [selectedStatus, setSelectedStatus] = useState('');
  useEffect(() => {
    let filteredData = typingParagraphs;

    // Apply status filter
    if (selectedStatus !== '') {
      filteredData = filteredData.filter((item) => item.status === parseInt(selectedStatus));
    }

    setFilteredParagraphs(filteredData);
  }, [selectedStatus, typingParagraphs]); // Re-run filter when any of these values change

  return (
    <div className="container-for-manage-status">
      <h1 className="manage-status-title">Manage Typing Paragraph Status</h1>

      {/* Filter Controls */}
      <div className="filters-container">
        <FormControl variant="outlined" className="filter-select">
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="0">Inactive</MenuItem>
          </Select>
        </FormControl>
      </div>

      <MaterialReactTable
        table={table}
        columns={columns}
        data={filteredParagraphs}
      />
    </div>
  );
};

export default ManageStatusTypingParagraph;
