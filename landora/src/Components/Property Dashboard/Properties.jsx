import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

const Properties = () => {
  const properties = [
    { id: 1, title: "Luxury Villa", price: "$1,200,000", status: "For Sale" },
    { id: 2, title: "Downtown Apartment", price: "$850,000", status: "For Sale" },
    { id: 3, title: "Cozy Cottage", price: "$450,000", status: "For Rent" },
    { id: 4, title: "Beach House", price: "$2,500,000", status: "For Sale" },
    { id: 5, title: "Mountain Cabin", price: "$600,000", status: "For Rent" },
    { id: 6, title: "Suburban Home", price: "$750,000", status: "For Sale" },
    { id: 7, title: "Penthouse Suite", price: "$3,000,000", status: "For Sale" },
    { id: 8, title: "Country Estate", price: "$1,800,000", status: "For Sale" },
    { id: 9, title: "City Loft", price: "$900,000", status: "For Sale" },
    { id: 10, title: "Historic Mansion", price: "$5,000,000", status: "For Sale" },
    { id: 11, title: "Modern Condo", price: "$700,000", status: "For Sale" },
    { id: 12, title: "Ranch Property", price: "$1,200,000", status: "For Sale" },
    { id: 13, title: "Lake House", price: "$1,500,000", status: "For Sale" }
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.title}</TableCell>
            <TableCell>{property.price}</TableCell>
            <TableCell>{property.status}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary">Edit</Button>
              <> </>
              <Button variant="contained" color="secondary">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Properties;