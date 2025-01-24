import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { Delete, Edit, CheckCircle } from '@mui/icons-material';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const studentsData = [
  { id: 1, name: 'John Doe', validated: true, registrationDate: '2023-01-15', role: 'student' },
  { id: 2, name: 'Jane Smith', validated: false, registrationDate: '2023-02-10', role: 'staff' },
  { id: 3, name: 'Alice Johnson', validated: true, registrationDate: '2023-03-05', role: 'librarian' },
  { id: 4, name: 'Bob Brown', validated: false, registrationDate: '2023-04-20', role: 'donor' },
  { id: 5, name: 'Charlie Davis', validated: true, registrationDate: '2023-05-12', role: 'student' },
  { id: 6, name: 'Eve White', validated: false, registrationDate: '2023-06-18', role: 'staff' },
  { id: 7, name: 'Frank Wilson', validated: true, registrationDate: '2023-07-22', role: 'librarian' },
  { id: 8, name: 'Grace Lee', validated: false, registrationDate: '2023-08-30', role: 'donor' },
  { id: 9, name: 'Hank Green', validated: true, registrationDate: '2023-09-25', role: 'student' },
  { id: 10, name: 'Ivy Black', validated: false, registrationDate: '2023-10-05', role: 'staff' },
];

const StudentsTable = () => {
  const [students, setStudents] = useState(studentsData);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValidated, setFilterValidated] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle filter by validation status
  const handleFilterValidatedChange = (event) => {
    setFilterValidated(event.target.value);
    setPage(1); // Reset to the first page when filter changes
  };

  // Handle filter by role
  const handleFilterRoleChange = (event) => {
    setFilterRole(event.target.value);
    setPage(1); // Reset to the first page when filter changes
  };

  // Handle sort by registration date
  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle delete student
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Handle edit student
  const handleEdit = (id) => {
    // Implement edit logic here
    console.log(`Edit student with id: ${id}`);
  };

  // Handle validate student
  const handleValidate = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, validated: !student.validated } : student
      )
    );
  };

  // Filter students based on validation status and role
  const filteredStudents = students.filter((student) => {
    const matchesValidation =
      filterValidated === 'all'
        ? true
        : filterValidated === 'validated'
        ? student.validated
        : !student.validated;
    const matchesRole = filterRole === 'all' ? true : student.role === filterRole;
    return matchesValidation && matchesRole;
  });

  // Sort students by registration date
  const sortedStudents = filteredStudents.sort((a, b) => {
    const dateA = new Date(a.registrationDate);
    const dateB = new Date(b.registrationDate);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Paginate students
  const paginatedStudents = sortedStudents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Students List
      </Typography>

      <FilterContainer>
        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={filterRole}
            onChange={handleFilterRoleChange}
            label="Role"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="librarian">Librarian</MenuItem>
            <MenuItem value="donor">Donor</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 150 }}>
          <InputLabel>Validated</InputLabel>
          <Select
            value={filterValidated}
            onChange={handleFilterValidatedChange}
            label="Validated"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="validated">Validated</MenuItem>
            <MenuItem value="non-validated">Non-Validated</MenuItem>
          </Select>
        </FormControl>

        <IconButton onClick={handleSort}>
          <Typography>
            Sort by Date {sortOrder === 'asc' ? '↑' : '↓'}
          </Typography>
        </IconButton>
      </FilterContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Validated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.registrationDate}</TableCell>
                <TableCell>{student.role}</TableCell>
                <TableCell>
                  {student.validated ? (
                    <CheckCircle color="success" />
                  ) : (
                    <IconButton onClick={() => handleValidate(student.id)}>
                      <CheckCircle color="disabled" />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(student.id)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(student.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(sortedStudents.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        style={{ marginTop: 20 }}
      />
    </Container>
  );
};

export default StudentsTable;