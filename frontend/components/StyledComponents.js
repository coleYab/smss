import styled from "styled-components";
import { Paper, Button } from "@mui/material";
import CountUp from "react-countup";

// Student layout
export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const Sidebar = styled.div`
  width: 240px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
`;

export const MainContent = styled.div`
  margin-left: 240px;
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

// Student home page
export const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const Title = styled.p`
  font-size: 1.25rem;
`;

export const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

// Student borrow books page

export const CustomBlackButton = styled(Button)`
  && {
    font-size: 18px;
    text-transform: none;
    padding: 12px 32px;
    background-color: #000000;
    border-radius: 4px;
    box-shadow: none;
    color: white;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: 10px 10px 5px rgb(0 0 0 / 30%);
    }
    &:active {
      box-shadow: none;
    }
  }
`;
