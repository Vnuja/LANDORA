import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Dashboard from "./Dashboard";
import Properties from "./Properties";
import PropertyDetails from "./PropertyDetails";
import AddEditProperty from "./AddEditProperty";
import Categories from "./Categories";
import Analytics from "./Analytics";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import theme from "./theme";

function PropertyDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Sidebar />
        <div style={{ marginLeft: 160, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <TopBar />
          <div style={{ padding: "16px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/add-property" element={<AddEditProperty />} />
              <Route path="/edit-property/:id" element={<AddEditProperty />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default PropertyDashboard;
