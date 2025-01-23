"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
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
// import { registerUser } from "../../redux/userRelated/userHandle";
import styled from "styled-components";
import Popup from "@components/Popup";

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const { status, currentUser, response, error, currentRole } = useSelector(
  //     (state) => state.user
  //   );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);

  const handleSubmit = (event) => {};

  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     const name = event.target.adminName.value;
  //     const schoolName = event.target.schoolName.value;
  //     const email = event.target.email.value;
  //     const password = event.target.password.value;

  //     if (!name || !schoolName || !email || !password) {
  //       if (!name) setAdminNameError(true);
  //       if (!schoolName) setSchoolNameError(true);
  //       if (!email) setEmailError(true);
  //       if (!password) setPasswordError(true);
  //       return;
  //     }

  //     const fields = { name, email, password, role, schoolName };
  //     setLoader(true);
  //     dispatch(registerUser(fields, role));
  //   };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "adminName") setAdminNameError(false);
    if (name === "schoolName") setSchoolNameError(false);
  };

  //   useEffect(() => {
  //     if (
  //       status === "success" ||
  //       (currentUser !== null && currentRole === "Admin")
  //     ) {
  //       navigate("/Admin/dashboard");
  //     } else if (status === "failed") {
  //       setMessage(response);
  //       setShowPopup(true);
  //       setLoader(false);
  //     } else if (status === "error") {
  //       console.log(error);
  //     }
  //   }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <div className="w-screen h-screen  bg-gray-100 flex flex-row-reverse overflow-hidden">
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
                    id="adminName"
                    label="Enter your name"
                    name="adminName"
                    autoComplete="name"
                    autoFocus
                    error={adminNameError}
                    helperText={adminNameError && "Name is required"}
                    onChange={handleInputChange}
                  />
                  {/* <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="schoolName"
                    label="Create your school name"
                    name="schoolName"
                    autoComplete="off"
                    error={schoolNameError}
                    helperText={schoolNameError && "School name is required"}
                    onChange={handleInputChange}
                  /> */}
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
                      defaultValue="Student"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FormLabel component="legend">Register as:</FormLabel>
                      <FormControlLabel
                        value="Student"
                        control={<Radio />}
                        label="Student"
                      />
                      <FormControlLabel
                        value="Staff"
                        control={<Radio />}
                        label="Staff"
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
