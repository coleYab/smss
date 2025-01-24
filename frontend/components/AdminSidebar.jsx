"use client";

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use next/navigation for App Router
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const AdminSideBar = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} href="/" passHref>
          <ListItemIcon>
            <HomeIcon color={pathname === '/' || pathname === '/Admin/dashboard' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} href="/Admin/classes" passHref>
          <ListItemIcon>
            <ClassOutlinedIcon color={pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItemButton>
        <ListItemButton component={Link} href="/Admin/subjects" passHref>
          <ListItemIcon>
            <AssignmentIcon color={pathname.startsWith('/Admin/subjects') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItemButton>
        <ListItemButton component={Link} href="/Admin/teachers" passHref>
          <ListItemIcon>
            <SupervisorAccountOutlinedIcon color={pathname.startsWith('/Admin/teachers') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItemButton>
        <ListItemButton component={Link} href="/Admin/students" passHref>
          <ListItemIcon>
            <PersonOutlineIcon color={pathname.startsWith('/Admin/students') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton component={Link} href="/Admin/notices" passHref>
          <ListItemIcon>
            <AnnouncementOutlinedIcon color={pathname.startsWith('/Admin/notices') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Notices" />
        </ListItemButton>
        <ListItemButton component={Link} href="/Admin/complains" passHref>
          <ListItemIcon>
            <ReportIcon color={pathname.startsWith('/Admin/complains') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Complains" />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} href="/Admin/profile" passHref>
          <ListItemIcon>
            <AccountCircleOutlinedIcon color={pathname.startsWith('/Admin/profile') ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} href="/logout" passHref>
          <ListItemIcon>
            <ExitToAppIcon color={pathname === '/logout' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default AdminSideBar;
