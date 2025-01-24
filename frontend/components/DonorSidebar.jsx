
"use client";

import React from "react";
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

const DonorSideBar = ({ handleActive, activeSection }) => {
    const handleLogout = () => { }

    return (
        <>
            <React.Fragment>
                <ListItemButton
                    onClick={() => handleActive("home")}
                    selected={activeSection === "home"}
                >
                    <ListItemIcon>
                        <HomeIcon color={activeSection === "home" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => handleActive("donations")}
                    selected={activeSection === "donations"}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon color={activeSection === "donations" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Donations" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => handleActive("notices")}
                    selected={activeSection === "notices"}
                >
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={activeSection === "notices" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton
                    onClick={() => handleActive("profile")}
                    selected={activeSection === "profile"}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={activeSection === "profile" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                    onClick={handleLogout}
                    selected={activeSection === "logout"}
                >
                    <ListItemIcon>
                        <ExitToAppIcon color={activeSection === "logout" ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    );
};

export default DonorSideBar;