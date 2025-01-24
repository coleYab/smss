import React from "react";
import { Link } from "next/link";
import { usePathname } from "next/navigation";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import GradingIcon from "@mui/icons-material/Grading";

const StudentSideBar = ({ activeSection, handleActiveSection }) => {
  const pathname = usePathname();
  return (
    <>
      <React.Fragment>
        <div onClick={() => handleActiveSection("home")}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon
                color={
                  activeSection === "home" && pathname === "/student"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </div>

        <div onClick={() => handleActiveSection("borrow_books")}>
          <ListItemButton>
            <ListItemIcon>
              <LocalLibraryIcon
                color={
                  activeSection === "borrow_books" && pathname === "/student"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Burrow books" />
          </ListItemButton>
        </div>

        <div onClick={() => handleActiveSection("submit_grade")}>
          <ListItemButton>
            <ListItemIcon>
              <GradingIcon
                color={
                  activeSection === "submit_grade" && pathname === "/student"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Submit Grade" />
          </ListItemButton>
        </div>
      </React.Fragment>

      <Divider sx={{ my: 1 }} />

      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>

        <div onClick={() => handleActiveSection("profile")}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                color={
                  activeSection === "profile" && pathname === "/student"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Profile" />
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

export default StudentSideBar;
