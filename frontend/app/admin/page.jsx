"use client"
import AdminSideBar from "@components/AdminSidebar";
import AdminHomePage from "@components/AdminHomePage";
import styled from 'styled-components';

const Admin = () => {
  return (
    <Container>
      <Sidebar>
        <AdminSideBar />
      </Sidebar>
      <MainContent>
        <AdminHomePage />
      </MainContent>
    </Container>
  );
}

export default Admin;

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

