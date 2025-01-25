"use client";
import { useState } from "react";
import AdminSideBar from "@components/AdminSidebar";
import styled from "styled-components";

export default function TeachersLayout({ 
  donations, donor, home, librarians, profile, teacher, student, notices 
}) {
    const [activeSection, setActiveSection] = useState("home"); // Default to "home"

    const handleActive = (section) => {
        setActiveSection(section); // Update the active section
    };

    return (
        <Container>
            <Sidebar>
                <AdminSideBar handleActive={handleActive} activeSection={activeSection} />
            </Sidebar>
            <MainContent>
                {activeSection === "donations" && donations}
                {activeSection === "donors" && donor}
                {activeSection === "home" && home}
                {activeSection === "student" && student}
                {activeSection === "librarians" && librarians}
                {activeSection === "profile" && profile}
                {activeSection === "teacher" && teacher}
                {activeSection === "notices" && notices}
            </MainContent>
        </Container>
    );
}

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Sidebar = styled.div`
background-color: white;
  width: 240px;
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