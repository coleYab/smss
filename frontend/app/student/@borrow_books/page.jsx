"use client";
import {
  Box,
  Container,
  TextField,
  ListItem,
  List,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import styled from "styled-components";

const Borrow_Books = () => {
  const alreadyBorrowedBook = true;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2">Borrow Books</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 5,
        }}
      >
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          sx={{ width: "75%", backgroundColor: "#fff" }}
        />
        <BlackButton variant="contained">Search</BlackButton>
      </Box>

      <Box>
        <Typography variant="h4">Books</Typography>

        <List
          sx={{
            width: "100%",
            height: "500px",
            bgcolor: "background.paper",
            overflowY: "auto",
          }}
        >
          <ListItem>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ textWrap: "wrap" }}>
                  Book Title
                </Typography>
                <Typography variant="body1">Author</Typography>
                <Typography variant="body2">Genre</Typography>
              </Box>
              {alreadyBorrowedBook ? (
                <Typography variant="body2">Already Borrowed</Typography>
              ) : (
                <BlackButton variant="contained">Borrow Book</BlackButton>
              )}
            </Box>
          </ListItem>
          <Divider sx={{ marginY: 2 }} />
          <ListItem>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ textWrap: "wrap" }}>
                  Book Title
                </Typography>
                <Typography variant="body1">Author</Typography>
                <Typography variant="body2">Genre</Typography>
              </Box>
              <BlackButton variant="contained">Borrow Book</BlackButton>
            </Box>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Borrow_Books;

const BlackButton = styled(Button)`
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
