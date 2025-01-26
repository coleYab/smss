"use client";
import { useState } from "react";
import { Container, Sidebar, MainContent } from "@components/StyledComponents";
import StaffSidebar from "@components/StaffSidebar";
import EvaluateStudentPage from "./@evaluate_student/page";
import StudentList from "./@student_list/page";

const StaffLayout = ({ student_list, profile, evaluate_student }) => {
  const [activeSection, setActiveSection] = useState("student_list");
  const [studentId, setStudentId] = useState(null);

  const handleActiveSection = (active) => {
    setActiveSection(active);
  };

  return (
    <Container>
      <Sidebar>
        <StaffSidebar
          handleActiveSection={handleActiveSection}
          activeSection={activeSection}
        />
      </Sidebar>
      <MainContent>
        {activeSection === "student_list" && (
          <StudentList
            handleActiveSection={handleActiveSection}
            setStudentId={setStudentId}
          />
        )}
        {activeSection === "profile" && profile}
        {activeSection === "evaluate_student" && (
          <EvaluateStudentPage
            activeSection={activeSection}
            handleActiveSection={handleActiveSection}
            studentId={studentId}
          />
        )}
      </MainContent>
    </Container>
  );
};

export default StaffLayout;
