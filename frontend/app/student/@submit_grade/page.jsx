import { Box, Container, Typography } from "@mui/material";
// import { UploadButton } from "../../../components/uploadthing";

const SubmitGrade = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2">Submit School Grade</Typography>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Submit Your School Grade to the School Admin
      </Typography>

      <Box>
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
      </Box>
    </Container>
  );
};

export default SubmitGrade;
