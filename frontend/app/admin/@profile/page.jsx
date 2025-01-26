"use client";
import React from "react";
import { Avatar, Typography, Paper, Button, Divider } from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import UserProfileCard from "@components/UserProfileCard";

const Profile = () => {
  const user = {
    name: "John Doe",
    bio: "Software Engineer | Open Source Enthusiast | Tech Blogger",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    avatarUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    role: "student", // Can be 'student', 'admin', 'donor', 'staff', or 'librarian'
    registrationDate: "2023-01-15",
  };

  return <UserProfileCard user={user} currentUser={false} />;
};

export default Profile;
