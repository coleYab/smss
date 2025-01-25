import { ListItem, Box, Typography, Link, Button } from "@mui/material";

const BookItem = ({ props, handleStudentClick, isRentPage }) => {
  return (
    <ListItem>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6">{props.book.name}</Typography>
          <Typography variant="body1">{props.book.author}</Typography>
          <Typography variant="body2">{props.book.genre}</Typography>
        </Box>

        <Box>
          <Link component="button" variant="body1" onClick={handleStudentClick}>
            {props.student.name}
          </Link>
          <Typography variant="body2">{props.student.id}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">Penality:</Typography>
            <Typography
              variant="body2"
              color={props.student.penality >= 15 ? "red" : "green"}
            >
              {props.student.penality}
            </Typography>
          </Box>
        </Box>

        {!isRentPage && (
          <Typography variant="body1">Due Date: {props.dueDate}</Typography>
        )}

        {isRentPage ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained">Accept</Button>
            <Button variant="outlined" color="error">
              Reject
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained">Returned</Button>
            <Button variant="outlined" color="error">
              Not returned
            </Button>
          </Box>
        )}
      </Box>
    </ListItem>
  );
};

export default BookItem;
