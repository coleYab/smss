import { Box, ListItemButton, Typography } from "@mui/material";

const StudentItem = ({ student, handleItemClick }) => {
  return (
    <ListItemButton
      sx={{ display: "flex", justifyContent: "space-between" }}
      onClick={() => handleItemClick(student)}
    >
      <Box sx={{ width: "150px" }}>
        <Typography variant="body1">{student.name}</Typography>
        <Typography variant="body1">{student.id}</Typography>
      </Box>
      <Typography variant="body1" sx={{ width: "150px" }}>
        {student.school}
      </Typography>

      <Box sx={{ width: "150px" }}>
        <Typography
          variant="body1"
          sx={
            student.status === "Paid"
              ? { color: "green" }
              : student.status === "Payment Pending"
              ? { color: "#4287f5" }
              : { color: "red" }
          }
        >
          {student.status}
        </Typography>
      </Box>
    </ListItemButton>
  );
};

export default StudentItem;
