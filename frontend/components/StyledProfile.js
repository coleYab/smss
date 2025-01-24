import { Avatar, Paper } from "@mui/material";
import styled from "styled-components";

// Styled components
export const ProfileContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

export const ProfileCard = styled(Paper)`
  padding: 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
`;

export const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border: 4px solid #3f51b5;
`;

export const RoleBadge = styled.div`
  display: inline-block;
  padding: 5px 15px;
  margin: 10px 0;
  background-color: ${(props) =>
    props.role === "admin"
      ? "#f44336"
      : props.role === "student"
      ? "#4caf50"
      : props.role === "staff"
      ? "#2196f3"
      : props.role === "librarian"
      ? "#9c27b0"
      : "#ff9800"};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
`;
