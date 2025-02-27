import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Property Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
