"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "@public/images/designlogin.jpg";
import { LightPurpleButton } from "@components/ButtonStyles";
import styled from "styled-components";
import Popup from "@components/Popup";
import { toast, ToastContainer } from "react-toastify";

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userName = event.target.userName.value;
    const role = event.target.role.value;

    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { email, password, userName, role };

    try {
      setLoader(true); 
      const url = "http://localhost:8080/api/v1/register";
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(`HTTP error! Status: ${res.status} and with message ${body["message"]}`);
      }

      const data = await res.json();
      console.log(data);

      // Show success toast
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect or perform other actions on successful login
      // Example: router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoader(false); // Hide loader after processing
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "userName") setAdminNameError(false);
  };

  return (
    <div className="w-screen h-screen  bg-gray-100 flex flex-row-reverse overflow-hidden">
      <ToastContainer />  
      <div className="hidden lg:block">
        <Image src={bgpic} alt="bgpic" width="100%" height="100%" />
      </div>

      <div className="flex-grow">
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              container
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                  Register
                </Typography>
                <Typography variant="h7">
                  Please fill in the form below to register as a student or
                  staff member, <br />
                  please contact your administrator for the appropriate
                  registration link.
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 2 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Enter your name"
                    name="userName"
                    autoComplete="name"
                    autoFocus
                    error={adminNameError}
                    helperText={adminNameError && "Name is required"}
                    onChange={handleInputChange}
                  />
                
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                    helperText={emailError && "Email is required"}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={toggle ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={passwordError}
                    helperText={passwordError && "Password is required"}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setToggle(!toggle)}>
                            {toggle ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Grid
                    container
                    sx={{
                      mt: 2,
                    }}
                  >
                    <RadioGroup
                      row
                      aria-label="role"
                      name="role"
                      defaultValue="student"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FormLabel component="legend">Register as:</FormLabel>
                      <FormControlLabel
                        value="student"
                        control={<Radio />}
                        label="Student"
                      />
                      <FormControlLabel
                        value="staff"
                        control={<Radio />}
                        label="Staff"
                      />
                      <FormControlLabel
                        value="librarian"
                        control={<Radio />}
                        label="Librarian"
                      />
                      <FormControlLabel
                        value="donor"
                        control={<Radio />}
                        label="Donor"
                      />
                    </RadioGroup>
                  </Grid>

                  <Grid
                    container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                  <LightPurpleButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {loader ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Register"
                    )}
                  </LightPurpleButton>
                  <Grid container>
                    <Grid>Already have an account?</Grid>
                    <Grid container sx={{ ml: 2 }}>
                      <StyledLink href="/login">Log in</StyledLink>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #7f56da;
`;
