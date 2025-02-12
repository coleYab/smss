"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
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
  Backdrop,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "@public/images/designlogin.jpg";
import { LightPurpleButton } from "@components/ButtonStyles";
import styled from "styled-components";
import Popup from "@components/Popup";

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { email, password };

    try {
      setLoader(true); 
      await setTimeout(() => {
        console.log("test")
      }, 1000)
      const url = "http://localhost:8080/api/v1/login";
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
      toast.success("Login successful!", {
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
      toast.error(err.message || "Login failed. Please try again.", {
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
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-row-reverse overflow-hidden">
      <ToastContainer /> {/* Add this to render toast notifications */}
      <div className="mr-[350px] hidden lg:block">
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
                  {role} Login
                </Typography>
                <Typography variant="h7">
                  Welcome back! Please enter your details
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
                    id="email"
                    label="Enter your email"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <StyledLink href="#">Forgot password?</StyledLink>
                  </Grid>
                  <LightPurpleButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    {loader ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </LightPurpleButton>
                  <Grid container>
                    <Grid>Don't have an account?</Grid>
                    <Grid container sx={{ ml: 2 }}>
                      <StyledLink href="/signup">Sign up</StyledLink>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={guestLoader}
          >
            <CircularProgress color="primary" />
            Please Wait
          </Backdrop>
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

export default LoginPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #7f56da;
`;