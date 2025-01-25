import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";

const LibrarianSidebar = ({ activeSection, handleActiveSection }) => {
  const pathname = usePathname();
  return (
    <>
      <React.Fragment>
        <div onClick={() => handleActiveSection("home")}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon
                color={
                  activeSection === "home" && pathname === "/librarian"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </div>

        <div onClick={() => handleActiveSection("rent_books")}>
          <ListItemButton>
            <ListItemIcon>
              <LocalLibraryIcon
                color={
                  activeSection === "rent_books" && pathname === "/librarian"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Rent books" />
          </ListItemButton>
        </div>

        <div onClick={() => handleActiveSection("rented_books")}>
          <ListItemButton>
            <ListItemIcon>
              <LibraryBooksIcon
                color={
                  activeSection === "rented_books" && pathname === "/librarian"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Rented books" />
          </ListItemButton>
        </div>

        <div onClick={() => handleActiveSection("add_new_book")}>
          <ListItemButton>
            <ListItemIcon>
              <PlaylistAddCheckRoundedIcon
                color={
                  activeSection === "add_new_book" && pathname === "/librarian"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Add new Book" />
          </ListItemButton>
        </div>
      </React.Fragment>

      <Divider sx={{ my: 1 }} />

      {/* Profile Pages */}
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>

        <div onClick={() => handleActiveSection("profile")}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleRoundedIcon
                color={
                  activeSection === "profile" && pathname === "/librarian"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </div>

        <div onClick={() => handleActiveSection("student_profile")}>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxRoundedIcon
                color={
                  activeSection === "student_profile" &&
                  pathname === "/librarian"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Student Profile" />
          </ListItemButton>
        </div>

        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon
              color={pathname.startsWith("/logout") ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default LibrarianSidebar;
