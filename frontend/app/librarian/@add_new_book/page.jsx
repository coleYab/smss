"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { set } from "@node_modules/date-fns/set";

const AddNewBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishingDate, setPublishingDate] = useState(null);
  const [edition, setEdition] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
  };
  const handlePublishingDateChange = (newValue) => {
    setPublishingDate(newValue);
  };
  const handleEditionChange = (e) => {
    setEdition(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddBook = () => {
    console.log("Add book clicked");
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublisher("");
    setPublishingDate(null);
    setEdition("");
    setDescription("");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Add New Book</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Add new books to the library
      </Typography>

      <Grid2 container spacing={3} sx={{ mt: 4 }}>
        <Grid2 container size={12}>
          <Grid2 size={6}>
            <TextField
              fullWidth
              label="Book Title"
              variant="outlined"
              value={title}
              onChange={(e) => handleTitleChange(e)}
            />
          </Grid2>
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => handleAuthorChange(e)}
          />
          <TextField
            label="Genre"
            variant="outlined"
            value={genre}
            onChange={(e) => handleGenreChange(e)}
          />
        </Grid2>

        <Grid2 container size={12}>
          <Grid2 size={4}>
            <TextField
              fullWidth
              label="Publisher"
              variant="outlined"
              value={publisher}
              onChange={(e) => handlePublisherChange(e)}
            />
          </Grid2>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ pt: 0 }}>
              <DatePicker
                label="Publishing Date"
                value={publishingDate}
                onChange={handlePublishingDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ mb: 2 }} />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            label="Edition"
            variant="outlined"
            value={edition}
            onChange={(e) => handleEditionChange(e)}
          />
        </Grid2>
      </Grid2>

      <Box sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => handleDescriptionChange(e)}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleAddBook}
        >
          Add Book
        </Button>
      </Box>
    </Container>
  );
};

export default AddNewBookPage;
