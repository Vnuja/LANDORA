import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const maintenanceData = [
    { id: 1, date: '2023-01-01', description: 'New Faucet', cost: 50 },
    { id: 2, date: '2023-02-15', description: 'Window Replacement', cost: 200 },
    { id: 3, date: '2023-03-10', description: 'A/C System Inspection', cost: 75 },
    { id: 4, date: '2023-04-05', description: 'Roof Repair', cost: 500 },
    { id: 5, date: '2023-05-20', description: 'Plumbing Fix', cost: 120 },
    { id: 6, date: '2023-06-15', description: 'Electrical Work', cost: 300 },
    { id: 7, date: '2023-07-10', description: 'Painting', cost: 250 },
    { id: 8, date: '2023-08-01', description: 'Garden Maintenance', cost: 80 },
    { id: 9, date: '2023-09-12', description: 'Pest Control', cost: 150 },
    { id: 10, date: '2023-10-05', description: 'HVAC Repair', cost: 400 },
    { id: 11, date: '2023-11-18', description: 'Flooring Replacement', cost: 600 },
    { id: 12, date: '2023-12-02', description: 'Gutter Cleaning', cost: 90 },
    { id: 13, date: '2024-01-15', description: 'Fence Repair', cost: 200 },
];

const Cost = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Maintenance Costs
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Cost ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maintenanceData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.cost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Cost;