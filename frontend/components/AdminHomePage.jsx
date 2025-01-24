"use client";

import { Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SeeNotice from "@components/SeeNotice";
import Image from "next/image"; // Use Next.js Image component
import styled from "styled-components";
import CountUp from "react-countup";

// Import images using Next.js's static assets best practices
import Students from "@/public/images/img1.png";
import Classes from  "@/public/images/img2.png";
import Teachers from "@/public/images/img3.png";
import Fees from "@/public/images/img4.png";
import StudentsTable from "./StudentList";

const AdminHomePage = () => {
  const numberOfStudents = 50;
  const numberOfClasses = 50;
  const numberOfTeachers = 50;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Card: Total Students */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Students} alt="Students" width={100} height={100} />
              <Title>Total Students</Title>
              <Data start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>

          {/* Card: Total Classes */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Classes} alt="Classes" width={100} height={100} />
              <Title>Total Classes</Title>
              <Data start={0} end={numberOfClasses} duration={5} />
            </StyledPaper>
          </Grid>

          {/* Card: Total Teachers */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Teachers} alt="Teachers" width={100} height={100} />
              <Title>Total Teachers</Title>
              <Data start={0} end={numberOfTeachers} duration={2.5} />
            </StyledPaper>
          </Grid>

          {/* Card: Fees Collection */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Fees} alt="Fees" width={100} height={100} />
              <Title>Fees Collection</Title>
              <Data start={0} end={23000} duration={2.5} prefix="$" />
            </StyledPaper>
          </Grid>

          {/* Notices Section */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <StudentsTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// Styled components
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default AdminHomePage;
