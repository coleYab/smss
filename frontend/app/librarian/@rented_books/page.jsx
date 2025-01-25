"use client";
import BookItem from "@components/BooksItem";
import { Container, Divider, List, Typography } from "@mui/material";

const RentedBooksPage = () => {
  const handleStudentProfileClick = () => {};

  const rentedInformation = [
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
      dueDate: "25-01-2025",
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
      dueDate: "26-01-2025",
    },
  ];

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">Rented Books Return</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Here you can manage the books that have been rented out and their
          return status.
        </Typography>

        <List sx={{ backgroundColor: "background.paper", mt: 4 }}>
          {rentedInformation &&
            rentedInformation.map((Info, index) => (
              <div key={index}>
                <BookItem
                  key={index}
                  props={Info}
                  handleStudentClick={handleStudentProfileClick}
                />
                {index < rentedInformation.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </div>
            ))}
        </List>
      </Container>
    </>
  );
};

export default RentedBooksPage;
