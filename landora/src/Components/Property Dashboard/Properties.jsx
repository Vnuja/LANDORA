import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import Sidebar from "../Sidebar";

const Properties = () => {
  const properties = [
    { id: 1, title: "Luxury Villa", price: "$1,200,000", status: "For Sale" },
    { id: 2, title: "Downtown Apartment", price: "$850,000", status: "For Sale" },
    { id: 3, title: "Cozy Cottage", price: "$450,000", status: "Rented" },
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
              <Button variant="contained" color="secondary">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Properties;