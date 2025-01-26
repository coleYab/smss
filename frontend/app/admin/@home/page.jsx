"use client";

import { Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SeeNotice from "@components/SeeNotice";
import Image from "next/image"; // Use Next.js Image component
import { StyledPaper, Title, Data } from "@components/StyledComponents";

// Import images using Next.js's static assets best practices
import Students from "@/public/images/img1.png";
import Classes from "@/public/images/img2.png";
import Teachers from "@/public/images/img3.png";
import Fees from "@/public/images/img4.png";
import StudentsTable from "@components/StudentList";
import DonationsTable from "@components/DonationsTable";

const AdminHomePage = () => {
  const numberOfStudents = 50;
  const numberOfClasses = 50;
  const numberOfTeachers = 50;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Card: Total Students */}
          <Grid xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Students} alt="Students" width={100} height={100} />
              <Title>Total Students</Title>
              <Data start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>

          {/* Card: Total Classes */}
          <Grid xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Classes} alt="Classes" width={100} height={100} />
              <Title>Total Classes</Title>
              <Data start={0} end={numberOfClasses} duration={5} />
            </StyledPaper>
          </Grid>

          {/* Card: Total Teachers */}
          <Grid xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Teachers} alt="Teachers" width={100} height={100} />
              <Title>Total Teachers</Title>
              <Data start={0} end={numberOfTeachers} duration={2.5} />
            </StyledPaper>
          </Grid>

          {/* Card: Fees Collection */}
          <Grid xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Fees} alt="Fees" width={100} height={100} />
              <Title>Total Donations</Title>
              <Data start={0} end={23000} duration={2.5} prefix="$" />
            </StyledPaper>
          </Grid>

          {/* Notices Section */}
          <Grid xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <StudentsTable />
            </Paper>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <DonationsTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminHomePage;
