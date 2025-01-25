"use client";
import { useState } from "react";
import Image from "next/image";
import { Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
// import { useDispatch, useSelector } from "react-redux";
// import { calculateOverallAttendancePercentage } from "../../components/attendanceCalculator";
import CustomPieChart from "@components/CustomPieChart";
// import { getUserDetails } from "../../redux/userRelated/userHandle";
import SeeNotice from "@components/SeeNotice";
import Subject from "@/public/images/subjects.svg";
import Fees from "@public/images/img4.png";
// import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import {
  ChartContainer,
  StyledPaper,
  Title,
  Data,
} from "@components/StyledComponents";

const StudentHomePage = () => {
  //   const dispatch = useDispatch();

  //   const { userDetails, currentUser, loading, response } = useSelector(
  //     (state) => state.user
  //   );
  //   const { subjectsList } = useSelector((state) => state.sclass);

  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const booksBorrowed = [
    {
      bookName: "The Alchemist",
      Genre: "Fiction",
      value: 50,
    },
    {
      bookName: "The Alchemist",
      Genre: "Fiction",
      value: 30,
    },
    {
      bookName: "The Alchemist",
      Genre: "Fiction",
      value: 20,
    },
  ];

  const numberOfBooks = 15;

  //   const classID = currentUser.sclassName._id;

  //   useEffect(() => {
  //     dispatch(getUserDetails(currentUser._id, "Student"));
  //     dispatch(getSubjectList(classID, "ClassSubjects"));
  //   }, [dispatch, currentUser._id, classID]);

  //   const numberOfSubjects = subjectsList && subjectsList.length;

  //   useEffect(() => {
  //     if (userDetails) {
  //       setSubjectAttendance(userDetails.attendance || []);
  //     }
  //   }, [userDetails]);

  //   const overallAttendancePercentage =
  //     calculateOverallAttendancePercentage(subjectAttendance);
  //   const overallAbsentPercentage = 100 - overallAttendancePercentage;

  // const chartData = [
  //   { name: "Present", value: overallAttendancePercentage },
  //   { name: "Absent", value: overallAbsentPercentage },
  // ];
  return (
    <>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Subject} alt="Subjects" width={100} height={100} />
              <Title>Total books Borrowed</Title>
              <Data start={0} end={numberOfBooks} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Fees} alt="Fees" width={100} height={100} />
              <Title>Available Payment</Title>
              <Data start={0} end={23000} duration={2.5} prefix="$" />
            </StyledPaper>
          </Grid>
          <Grid xs={12} md={4} lg={3}>
            <ChartContainer>
              {booksBorrowed.length > 0 && Array.isArray(booksBorrowed) ? (
                <CustomPieChart data={booksBorrowed} />
              ) : (
                <>
                  <Typography variant="h6">No Books Borrowed</Typography>
                </>
              )}
            </ChartContainer>
          </Grid>
          <Grid xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default StudentHomePage;
