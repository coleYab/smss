"use client";
import { useState } from "react";
import LibrarianSidebar from "@components/LibrarianSidebar";
import { Container, Sidebar, MainContent } from "@components/StyledComponents";

const LibrarianLayout = ({
  home,
  rent_books,
  rented_books,
  profile,
  student_profile,
  add_new_book,
}) => {
  const [activeSection, setActiveSection] = useState("home");

  const handleActiveSection = (active) => {
    setActiveSection(active);
  };

  return (
    <Container>
      <Sidebar>
        <LibrarianSidebar
          activeSection={activeSection}
          handleActiveSection={handleActiveSection}
        />
      </Sidebar>
      <MainContent>
        {activeSection === "home" && home}
        {activeSection === "rent_books" && rent_books}
        {activeSection === "rented_books" && rented_books}
        {activeSection === "profile" && profile}
        {activeSection === "student_profile" && student_profile}
        {activeSection === "add_new_book" && add_new_book}
      </MainContent>
    </Container>
  );
};

export default LibrarianLayout;
