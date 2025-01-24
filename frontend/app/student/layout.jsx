"use client";
import { useState } from "react";
import StudentSideBar from "@components/StudentSideBar";
import styled from "styled-components";

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

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
`;

const MainContent = styled.div`
  margin-left: 240px;
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
  background-color: #f5f5f5;
  min-height: 100vh;
`;
