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
  Typography,
  Pagination,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const donationsData = [
  { id: 1, donorName: 'John Doe', donationDate: '2023-01-15', amount: 500 },
  { id: 2, donorName: 'Jane Smith', donationDate: '2023-02-10', amount: 1000 },
  { id: 3, donorName: 'Alice Johnson', donationDate: '2023-03-05', amount: 750 },
  { id: 4, donorName: 'Bob Brown', donationDate: '2023-04-20', amount: 300 },
  { id: 5, donorName: 'Charlie Davis', donationDate: '2023-05-12', amount: 1200 },
  { id: 6, donorName: 'Eve White', donationDate: '2023-06-18', amount: 600 },
  { id: 7, donorName: 'Frank Wilson', donationDate: '2023-07-22', amount: 900 },
  { id: 8, donorName: 'Grace Lee', donationDate: '2023-08-30', amount: 1500 },
  { id: 9, donorName: 'Hank Green', donationDate: '2023-09-25', amount: 200 },
  { id: 10, donorName: 'Ivy Black', donationDate: '2023-10-05', amount: 800 },
  { id: 11, donorName: 'John Smith', donationDate: '2023-11-01', amount: 400 },
  { id: 12, donorName: 'Jane Doe', donationDate: '2023-12-12', amount: 1300 },
  { id: 13, donorName: 'Alice Brown', donationDate: '2023-01-20', amount: 950 },
  { id: 14, donorName: 'Bob Johnson', donationDate: '2023-02-25', amount: 250 },
  { id: 15, donorName: 'Charlie White', donationDate: '2023-03-30', amount: 1100 },
];

const DonationsList = () => {
  const [donations, setDonations] = useState(donationsData);
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'amount'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Handle sorting
  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
    setPage(1); // Reset to the first page when sorting changes
  };

  // Sort donations
  const sortedDonations = donations.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.donationDate);
      const dateB = new Date(b.donationDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  // Paginate donations
  const paginatedDonations = sortedDonations.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle pagination change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Donations List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Donor Name</TableCell>
              <TableCell>
                <IconButton onClick={() => handleSort('date')}>
                  Donation Date
                  {sortBy === 'date' && (
                    sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleSort('amount')}>
                  Donation Amount
                  {sortBy === 'amount' && (
                    sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.donorName}</TableCell>
                <TableCell>{donation.donationDate}</TableCell>
                <TableCell>${donation.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(sortedDonations.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default DonationsList;