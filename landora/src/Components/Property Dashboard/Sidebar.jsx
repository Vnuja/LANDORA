import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, "& .MuiDrawer-paper": { width: 165, boxSizing: "border-box", backgroundColor: "#000000", color: "#ffffff" } }}>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <img src="https://github.com/Vnuja/LANDORA/blob/main/Assets/Landora.png?raw=true" alt="Landora Logo" style={{ width: 150 }} />
      </div>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: "#ecf0f1" }}><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "#ffffff" }} />
        </ListItem>
        <ListItem button component={Link} to="/properties">
          <ListItemIcon sx={{ color: "#ecf0f1" }}><HomeWorkIcon /></ListItemIcon>
          <ListItemText primary="Properties" sx={{ color: "#ffffff" }} />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemIcon sx={{ color: "#ecf0f1" }}><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Categories" sx={{ color: "#ffffff" }} />
        </ListItem>
        <ListItem button component={Link} to="/analytics">
          <ListItemIcon sx={{ color: "#ecf0f1" }}><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Analytics" sx={{ color: "#ffffff" }} />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon sx={{ color: "#ecf0f1" }}><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" sx={{ color: "#ffffff" }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
