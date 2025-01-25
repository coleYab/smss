"use client";
import BookItem from "@components/BooksItem";
import {
  Container,
  Typography,
  Box,
  ListItem,
  List,
  Button,
  Divider,
  Link,
} from "@mui/material";

const RentBooksPage = () => {
  const rentInformation = [
    {
      book: {
        name: "Book name",
        author: "Book Author",
        genre: "Genre",
      },
      student: {
        name: "John Doe",
        id: "UGR/7514/15",
        penality: 15,
      },
    },
    {
      book: {
        name: "Book name",
        author: "Book Author",
        genre: "Genre",
      },
      student: {
        name: "John Doe",
        id: "UGR/7514/15",
        penality: 13,
      },
    },
  ];

  const handleStudentProfileClick = () => {};

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">
          Approve Rent Requests from Students
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Here you can approve or reject rent requests submitted by students for
          borrowing books.
        </Typography>

        <List sx={{ backgroundColor: "background.paper", mt: 4 }}>
          {rentInformation &&
            rentInformation.map((info, index) => (
              <div key={index}>
                <BookItem
                  key={index}
                  props={info}
                  isRentPage={true}
                  handleStudentClick={handleStudentProfileClick}
                />
                {index < rentInformation.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </div>
            ))}
        </List>
      </Container>
    </>
  );
};

export default RentBooksPage;
