import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Link to="/profile">
          <Avatar alt="User Profile" />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
