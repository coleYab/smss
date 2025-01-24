"use client"
import React from 'react';
import {
  Avatar,
  Typography,
  Paper,
  Button,
  Divider,
} from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import Grid from "@mui/material/Grid2"
import styled from 'styled-components';

// Styled components
const ProfileContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const ProfileCard = styled(Paper)`
  padding: 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
`;

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border: 4px solid #3f51b5;
`;

const RoleBadge = styled.div`
  display: inline-block;
  padding: 5px 15px;
  margin: 10px 0;
  background-color: ${(props) =>
    props.role === 'admin'
      ? '#f44336'
      : props.role === 'student'
      ? '#4caf50'
      : props.role === 'staff'
      ? '#2196f3'
      : props.role === 'librarian'
      ? '#9c27b0'
      : '#ff9800'};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
`;

const UserProfile = () => {
  const user = {
    name: 'John Doe',
    bio: 'Software Engineer | Open Source Enthusiast | Tech Blogger',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    avatarUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    role: 'student', // Can be 'student', 'admin', 'donor', 'staff', or 'librarian'
    registrationDate: '2023-01-15',
  };

  return (
    <ProfileContainer>
      <ProfileCard elevation={3}>
        <StyledAvatar alt={user.name} src={user.avatarUrl} />
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        <RoleBadge role={user.role}>{user.role.toUpperCase()}</RoleBadge>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {user.bio}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1" gutterBottom>
          <strong>Registration Date:</strong> {user.registrationDate}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<Email />}
              href={`mailto:${user.email}`}
            >
              Email
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<Phone />}
              href={`tel:${user.phone}`}
            >
              Call
            </Button>
          </Grid>
        </Grid>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;