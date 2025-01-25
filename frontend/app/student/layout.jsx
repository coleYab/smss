"use client";
import { useState } from "react";
import StudentSideBar from "@components/StudentSideBar";
import { Container, Sidebar, MainContent } from "@components/StyledComponents";

const StudentLayout = ({ home, borrow_books, submit_grade, profile }) => {
  const [activeSection, setActiveSection] = useState("home");

  const handleActiveSection = (active) => {
    setActiveSection(active);
  };

  return (
    <Container>
      <Sidebar>
        <StudentSideBar
          activeSection={activeSection}
          handleActiveSection={handleActiveSection}
        />
      </Sidebar>
      <MainContent>
        {activeSection === "home" && home}
        {activeSection === "borrow_books" && borrow_books}
        {activeSection === "submit_grade" && submit_grade}
        {activeSection === "profile" && profile}
      </MainContent>
    </Container>
  );
};

export default StudentLayout;
