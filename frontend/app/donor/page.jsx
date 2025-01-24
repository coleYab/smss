"use client";
import { useState } from "react";
import styled from "styled-components";
import DonorDashboard from "@components/AdminDashboard";
import AdminSideBar from "@components/AdminSidebar";
import DonorSideBar from "@components/DonorSidebar";
import UserProfile from "@components/UserProfile";
import DonationsList from "@components/DonationsTable";
import SeeNotice from "@components/SeeNotice";

export default function TeachersLayout() {
    const [activeSection, setActiveSection] = useState("home"); // Default to "home"

    const handleActive = (section) => {
        setActiveSection(section); // Update the active section
    };

    return (
        <Container>
            <Sidebar>
                <DonorSideBar handleActive={handleActive} activeSection={activeSection} />
            </Sidebar>
            <MainContent>
                { activeSection === "home" && <DonorDashboard />}
                { activeSection === "donations" && <DonationsList />}
                { activeSection === "profile" && <UserProfile />}
                { activeSection === "notices" && <SeeNotice />}
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