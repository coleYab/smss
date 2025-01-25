"use client";
import { StyledPaper, Title, Data } from "@components/StyledComponents";
import { Container, Divider, Grid2, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import Image from "next/image";

import BookImage from "@/public/images/books.jpg";
import BookImage2 from "@/public/images/subjects.svg";

const LibrarianHomePage = () => {
  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">Welcome to the Librarian Home Page</Typography>
        <Typography sx={{ mt: 4 }} variant="h6">
          Weekly Activity Report
        </Typography>
        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          <StyledPaper>
            <Image src={BookImage} alt="Books" width={100} height={100} />
            <Title variant="h6">Total books Borrowed</Title>
            <Data color="#4287f5" start={0} end={30} duration={2.5} />
          </StyledPaper>

          <StyledPaper>
            <Image src={BookImage} alt="Books" width={100} height={100} />
            <Title variant="h6">Total Books Returned</Title>
            <Data start={0} end={16} duration={2.5} />
          </StyledPaper>

          <StyledPaper>
            <Image src={BookImage} alt="Books" width={100} height={100} />
            <Title variant="h6">Total Books Not Returned</Title>
            <Data color="red" start={0} end={16} duration={2.5} />
          </StyledPaper>

          <StyledPaper>
            <Title variant="h6">Books Activity</Title>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 16, label: "Returned" },
                    { id: 1, value: 14, label: "Not Returned" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </StyledPaper>
        </Grid2>

        <Divider sx={{ mt: 4 }} />

        {/* Weekly Rent Activity */}
        <Typography sx={{ mt: 4 }} variant="h6">
          Weekly Rent Activity
        </Typography>
        <Grid2 container spacing={3} sx={{ mt: 2 }}>
          <StyledPaper>
            <Image src={BookImage2} alt="Books" width={100} height={100} />
            <Title variant="h6">Total Rent Request</Title>
            <Data start={0} end={15} duration={2.5} />
          </StyledPaper>

          <StyledPaper>
            <Image src={BookImage2} alt="Books" width={100} height={100} />
            <Title variant="h6">Total Rent Request Pending</Title>
            <Data start={0} end={5} duration={2.5} />
          </StyledPaper>

          <StyledPaper>
            <Image src={BookImage2} alt="Books" width={100} height={100} />
            <Title variant="h6">Available Books</Title>
            <Data color="#4287f5" start={0} end={174} duration={2.5} />
          </StyledPaper>

          <StyledPaper>
            <Title variant="h6">Rent Request Activity</Title>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 174, label: "Available" },
                    { id: 1, value: 10, label: "Rented" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </StyledPaper>
        </Grid2>
      </Container>
    </>
  );
};

export default LibrarianHomePage;
