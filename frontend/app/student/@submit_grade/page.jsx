import {
  Box,
  Container,
  FormControlLabel,
  Grid2,
  RadioGroup,
  Radio,
  Typography,
  TextField,
} from "@mui/material";
// import { UploadButton } from "../../../components/uploadthing";

const SubmitGrade = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2">Submit School Grade</Typography>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Submit Your School Grade to the School Admin
      </Typography>

      <Container
        sx={{
          mt: 4,
          backgroundColor: "background.paper",
          p: 4,
          border: "1px solid #615e5e",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Typography variant="h5">Upload Your Grade</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Upload your grade here. The file should be in <b>jpg</b>, <b>png</b>
            , or <b>pdf</b> format.
          </Typography>
        </Box>
        <Grid2 container spacing={2} sx={{ mt: 4 }}>
          <RadioGroup
            row
            aria-labelledby="select-semester"
            name="select-semester-group"
            defaultValue="Semester 1"
          >
            <FormControlLabel
              value="Semester 1"
              control={<Radio />}
              label="Semester 1"
              defaultChecked
            />
            <FormControlLabel
              value="Semester 2"
              control={<Radio />}
              label="Semester 2"
            />
          </RadioGroup>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">Enter Grade:</Typography>
            <TextField id="grade" label="Grade" variant="outlined" />
          </Box>
        </Grid2>
        {/* <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        /> */}
      </Container>
    </Container>
  );
};

export default SubmitGrade;
