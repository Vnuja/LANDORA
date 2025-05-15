const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();


router.post("/export-csv", (req, res) => {
  const properties = req.body.properties; // Get properties from frontend

  if (!properties || properties.length === 0) {
    return res.status(400).json({ message: "No property data provided" });
  }

  // Convert data to CSV format
  const csvContent = [
    ["property ID", "images", "name", "size", "address", "price", "status"], // Header
    ...properties.map(property => [
      property.PropertyId,
      property.images,
      property.name,
      property.size,
      property.address,
      property.price,
      property.status,
    ]),
  ]
    .map(e => e.join(","))
    .join("\n");

  // Define file path
  const filePath = path.join(__dirname, "../../../landora/src/Components/Admin/Database/property-details.csv");

  // Ensure directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write CSV file
  fs.writeFile(filePath, csvContent, "utf8", (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).json({ message: "Error saving CSV file" });
    }
    res.status(200).json({ message: "Server Refreshed successfully", filePath });
  });
});

module.exports = router;
