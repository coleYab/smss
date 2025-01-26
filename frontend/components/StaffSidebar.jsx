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
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const StaffSidebar = ({ handleActiveSection, activeSection }) => {
  const pathname = usePathname();
  return (
    <>
      <React.Fragment>
        <div onClick={() => handleActiveSection("student_list")}>
          <ListItemButton>
            <ListItemIcon>
              <FormatListBulletedRoundedIcon
                color={
                  activeSection === "student_list" && pathname === "/staff"
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
            <ListItemText primary="Student List" />
          </ListItemButton>
        </div>
      </React.Fragment>

      <Divider sx={{ my: 2 }} />

      {/* Profile  */}
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>

        <div onClick={() => handleActiveSection("profile")}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleRoundedIcon
                color={
                  activeSection === "profile" && pathname === "/staff"
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

export default StaffSidebar;
