"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { CustomBlackButton } from "@components/StyledComponents";
import StudentItem from "@components/StudentItem";

const StudentList = ({ handleActiveSection, setStudentId }) => {
  const [studentClicked, setStudentClicked] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});

  const students = [
    {
      name: "John Doe",
      id: "123456",
      school: "School Name",
      status: "Paid",
    },
    {
      name: "Jane Doe",
      id: "654321",
      school: "School Name",
      status: "Payment Pending",
    },
    {
      name: "John Doe",
      id: "123456",
      school: "School Name",
      status: "Paid",
    },
    {
      name: "Jane Doe",
      id: "654321",
      school: "School Name",
      status: "Unpaid",
    },
  ];

  const handleItemClick = (student) => {
    setStudentClicked((prev) => !prev);
    setSelectedStudent(student);
  };

  const handleEvaluateStudent = (student) => {
    handleActiveSection("evaluate_student");
    setStudentId(student.id);
    //   router.push("/staff/evaluate_student");
    //   // router.push({
    //   //   pathname: "/staff/evaluate_student",
    //   //   query: {
    //   //     studentId: student.id,
    //   //     studentName: student.name,
    //   //   },
    //   // });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Student List</Typography>

      <Typography variant="body1">This is the student list page.</Typography>

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

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ width: "150px" }}>
            Student Profile
          </Typography>
          <Typography variant="h6" sx={{ width: "150px" }}>
            School Name
          </Typography>
          <Typography variant="h6" sx={{ width: "150px" }}>
            Payment Status
          </Typography>
        </ListItem>

        {students.map((student, index) => (
          <div key={index}>
            <StudentItem student={student} handleItemClick={handleItemClick} />
          </div>
        ))}
      </List>
      {studentClicked && (
        <StudentControl
          handleItemClick={handleItemClick}
          student={selectedStudent}
          handleEvaluateStudent={handleEvaluateStudent}
        />
      )}
    </Container>
  );
};

export default StudentList;

const StudentControl = ({
  handleItemClick,
  student,
  handleEvaluateStudent,
}) => {
  return (
    <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-black/70">
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            id="outlined-read-only-input"
            label="Student Name"
            defaultValue={student.name}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            id="outlined-read-only-input"
            label="ID"
            defaultValue={student.id}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            id="outlined-read-only-input"
            label="School"
            defaultValue={student.school}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Status"
            defaultValue={student.status}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleEvaluateStudent(student)}
          >
            Evaluate Student
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleItemClick(student)}
          >
            Close
          </Button>
        </Box>
      </Box>
    </div>
  );
};
