"use client";
import React from "react";
import { Typography, Button, Divider } from "@mui/material";
// import { Email, Phone } from "@mui/icons-material";
// import Grid from "@mui/material/Grid2";
import {
  ProfileContainer,
  ProfileCard,
  StyledAvatar,
  RoleBadge,
} from "@components/StyledProfile";

const StudentProfile = () => {
  const user = {
    name: "John Doe",
    bio: "Software Engineer | Open Source Enthusiast | Tech Blogger",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    avatarUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    role: "student", // Can be 'student', 'admin', 'donor', 'staff', or 'librarian'
    registrationDate: "2023-01-15",
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
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1" gutterBottom>
          <strong>Registration Date:</strong> {user.registrationDate}
        </Typography>
        {/* <Grid container spacing={2} justifyContent="center">
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
        </Grid> */}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default StudentProfile;
