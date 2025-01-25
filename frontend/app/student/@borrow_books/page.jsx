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
import { CustomBlackButton } from "@components/StyledComponents";

const Borrow_Books = () => {
  const alreadyBorrowedBook = true;
  const returnDatePassed = true;
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
          label="Search books..."
          type="search"
          sx={{ width: "75%", backgroundColor: "#fff" }}
        />
        <CustomBlackButton variant="contained">Search</CustomBlackButton>
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
                <Typography variant="body2" sx={{ color: "#0a6b24" }}>
                  Already Borrowed
                </Typography>
              ) : (
                <CustomBlackButton variant="contained">
                  Borrow Book
                </CustomBlackButton>
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
              <CustomBlackButton variant="contained">
                Borrow Book
              </CustomBlackButton>
            </Box>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h4">Borrowed Books</Typography>
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
              {returnDatePassed ? (
                <Typography variant="body2" sx={{ color: "red" }}>
                  Return Date Passed!!
                </Typography>
              ) : (
                <Typography variant="body2">Due Date: 2021-12-31</Typography>
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
              <Typography variant="body2">Due Date: 2021-12-31</Typography>
            </Box>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default Borrow_Books;
