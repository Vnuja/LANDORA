const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/export-csv", (req, res) => {
  const requests = req.body.requests; // Get requests from frontend

  if (!requests || requests.length === 0) {
    return res.status(400).json({ message: "No request data provided" });
  }

  // Convert data to CSV format
  const csvContent = [
    ["request ID", "customerId", "propertyId", "issue", "status"],
    ...requests.map(request => [
      request.mRequestId,
      request.customerId,
      request.propertyId,
      request.issue,
      request.status,
     ]),
  ]
    .map(e => e.join(","))
    .join("\n");

  // Define file path
  const filePath = path.join(__dirname, "../../../landora/src/Components/Admin/Database", "request-details.csv");

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
