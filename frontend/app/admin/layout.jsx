"use client";
import { useState } from "react";
import AdminSideBar from "@components/AdminSidebar";
import styled from "styled-components";
import { MainContent, Container, Sidebar } from "@components/StyledComponents";

export default function TeachersLayout({
  donations,
  donor,
  home,
  librarians,
  profile,
  teacher,
  student,
  notices,
}) {
  const [activeSection, setActiveSection] = useState("home"); // Default to "home"

  const handleActive = (section) => {
    setActiveSection(section); // Update the active section
  };

  return (
    <Container>
      <Sidebar>
        <AdminSideBar
          handleActive={handleActive}
          activeSection={activeSection}
        />
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
