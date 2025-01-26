"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Container,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import ClassroomImage from "@public/images/classroom.png";
import CloseIcon from "@mui/icons-material/Close";

const EvaluateStudentPage = ({
  activeSection,
  handleActiveSection,
  studentId,
}) => {
  const [viewImage, setViewImage] = useState(false);
  const studentName = "John Doe";
  const grade = 85;
  const penality = 10;
  const status = "Unpaid";

  const handleViewImage = () => {
    setViewImage((prev) => !prev);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Evaluate Student</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
        <Typography variant="h6">Student Information</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            <TextField
              label="Student ID"
              value={studentId}
              slotProps={{ readOnly: true }}
            />
            <TextField
              label="Student Name"
              value={studentName}
              slotProps={{ readOnly: true }}
            />
            <TextField
              label="Grade"
              value={grade}
              slotProps={{ readOnly: true }}
            />
            <TextField
              label="Penality"
              value={penality}
              slotProps={{ readOnly: true }}
            />
          </Box>
          <div
            className="w-fit p-2 border-2 border-gray-200 rounded-md cursor-pointer"
            onClick={handleViewImage}
          >
            <Image
              src={ClassroomImage}
              alt="Classroom"
              width={300}
              height={300}
            />
          </div>

          <RadioGroup
            aria-labelledby="change-status"
            defaultValue={status}
            row
            name="change-status"
          >
            <FormControlLabel
              value="Unpaid"
              control={<Radio />}
              label="Unpaid"
            />
            <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
          </RadioGroup>
          <Button
            variant="contained"
            onClick={() => handleActiveSection("student_list")}
          >
            Submit
          </Button>
        </Box>
      </Box>
      {viewImage && <ViewImage handleViewImage={handleViewImage} />}
    </Container>
  );
};

export default EvaluateStudentPage;

const ViewImage = ({ handleViewImage }) => {
  return (
    <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-black/80 z-10">
      <div className="relative w-fit p-2 border-2 border-gray-200 rounded-md cursor-pointer">
        <Image
          src={ClassroomImage}
          alt="Classroom"
          width={1024}
          height={1024}
        />
        <div className="absolute right-0 -top-10" onClick={handleViewImage}>
          <CloseIcon fontSize="large" color="success" />
        </div>
      </div>
    </div>
  );
};
