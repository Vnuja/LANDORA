import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ flexGrow: .35 }}>
      <Drawer variant="permanent">
        <div style={{ padding: "16px", textAlign: "center" }}>
          <img src="/path/to/logo.png" alt="System Logo" style={{ width: "80%", height: "auto" }} />
        </div>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/properties">
            <ListItemText primary="Properties" />
          </ListItem>
          <ListItem button component={Link} to="/categories">
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button component={Link} to="/analytics">
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
