import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialReactTable } from 'material-react-table';
import './StudentTable.css'; // Import your custom CSS

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // MaterialReactTable uses 0-based index
  const [pageSize, setPageSize] = useState(100); // Number of records per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [search, setSearch] = useState('');
  const [rowCount, setRowCount] = useState(0); // Total number of rows
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/students-for-table?page=${page + 1}&limit=${pageSize}&search=${search}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data.students);
        setRowCount(data.total); // Set total row count for pagination
        setTotalPages(Math.ceil(data.total / pageSize)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, pageSize, search]);

  const handleNameClick = (studentId) => {
    navigate(`/students-for-purchase/${studentId}`);
  };

  const handleEdit = (studentId) => {
    // Logic for editing the student
  };

  const handleDelete = (studentId) => {
    // Logic for deleting the student
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'full_name',
      header: 'Full Name',
      Cell: ({ row }) => (
        <span 
          className="clickable-name" 
          onClick={() => handleNameClick(row.original._id)}
        >
          {row.original.full_name}
        </span>
      ),
    },
    { accessorKey: 'email_id', header: 'Email ID' },
    { accessorKey: 'mobile_number', header: 'Mobile Number' },
    { accessorKey: 'ts', header: 'Date', Cell: ({ row }) => new Date(row.original.ts).toLocaleDateString() },
    {
      id: 'actions',
      header: 'Action',
      Cell: ({ row }) => (
        <div>
          <button onClick={() => handleEdit(row.original._id)} className="edit-btn">Edit</button>
          <button onClick={() => handleDelete(row.original._id)} className="delete-btn">Delete</button>
        </div>
      ),
    },
  ], []);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="student_table_info">
      <h2>Student Table</h2>

      <div className="searchbar-student-table">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <MaterialReactTable
            columns={columns}
            data={students}
            manualPagination
            manualFiltering
            enablePagination={false}
            enableGlobalFilter={false}
            state={{
              pagination: { pageIndex: page, pageSize },
              globalFilter: search,
            }}
          />

          <div className="pagination-controls-student">
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page >= totalPages - 1}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentTable;
