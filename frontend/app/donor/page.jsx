"use client";
import { useState } from "react";
import styled from "styled-components";
import DonorDashboard from "@components/AdminDashboard";
import AdminSideBar from "@components/AdminSidebar";
import DonorSideBar from "@components/DonorSidebar";
import UserProfile from "@components/UserProfile";
import DonationsList from "@components/DonationsTable";
import SeeNotice from "@components/SeeNotice";
import { Container, Sidebar, MainContent } from "@components/StyledComponents";

export default function TeachersLayout() {
  const [activeSection, setActiveSection] = useState("home"); // Default to "home"

  const handleActive = (section) => {
    setActiveSection(section); // Update the active section
  };

  return (
    <Container>
      <Sidebar>
        <DonorSideBar
          handleActive={handleActive}
          activeSection={activeSection}
        />
      </Sidebar>
      <MainContent>
        {activeSection === "home" && <DonorDashboard />}
        {activeSection === "donations" && <DonationsList />}
        {activeSection === "profile" && <UserProfile />}
        {activeSection === "notices" && <SeeNotice />}
      </MainContent>
    </Container>
  );
}
