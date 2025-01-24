"use client";
import { useRouter } from "next/navigation";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authLogout } from '../redux/userRelated/userSlice';
import { Container, Typography, Button, Box } from "@mui/material";
import styled from "styled-components";

const Logout = () => {
  const router = useRouter();
  const currentUser = { name: "John Doe" };
  // const currentUser = useSelector(state => state.user.currentUser);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(authLogout());
    // navigate('/');
    router.push("/");
  };

  const handleCancel = () => {
    router.push(-1);
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#eee",
      }}
    >
      <LogoutContainer maxWidth="sm">
        <Typography variant="h3">{currentUser.name}</Typography>
        <Typography variant="h6">Are you sure you want to log out?</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <LogoutButton
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Log Out
          </LogoutButton>
          <LogoutButton variant="outlined" onClick={handleCancel}>
            Cancel
          </LogoutButton>
        </Box>
      </LogoutContainer>
    </Container>
  );
};

export default Logout;

const LogoutContainer = styled(Container)`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #fff;
  gap: 20px;
  box-shadow: 10px 0 20px 10px rgba(0, 0, 0, 0.2);
`;

const LogoutButton = styled(Button)`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: none;

  &:hover {
    box-shadow: 0 7px 7px rgba(0, 0, 0, 0.2);
  }

  &:active {
    box-shadow: none;
  }
`;
