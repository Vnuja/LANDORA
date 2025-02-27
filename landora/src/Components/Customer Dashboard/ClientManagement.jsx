import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const clients = [
  { id: 1, name: 'John Doe', contact: 'johndoe@example.com', status: 'Active', progress: 'Completed', lastContact: '01/25/2025' },
  { id: 2, name: 'Jane Smith', contact: 'janesmith@example.com', status: 'Inactive', progress: 'Pending', lastContact: '02/10/2025' },
];

const ClientManagement = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Application Progress</TableCell>
            <TableCell>Last Contact</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.contact}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell>{client.progress}</TableCell>
              <TableCell>{client.lastContact}</TableCell>
              <TableCell>
                <Button>View</Button>
                <Button>Update</Button>
                <Button>Archive</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientManagement;
