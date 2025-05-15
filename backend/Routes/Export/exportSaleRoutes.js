const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();


router.post("/export-csv", (req, res) => {
  const sales = req.body.sales; // Get sales from frontend

  if (!sales || sales.length === 0) {
    return res.status(400).json({ message: "No sale data provided" });
  }

  // Convert data to CSV format
  const csvContent = [
    ["Sale ID", "CustomerId", "PropertyID", "Name", "VendorID", "Price", "Status"],
    ...sales.map(sale => [
      sale.SaleId,
      sale.customerId,
      sale.propertyID,
      sale.name,
      sale.VendorID,
      sale.price,
      sale.status,
    ]),
  ]
    .map(e => e.join(","))
    .join("\n");

  // Define file path
  const filePath = path.join(__dirname, "../../../landora/src/Components/Admin/Database/sale-details.csv");

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
