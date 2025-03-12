import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { maintenanceData } from '../Database/Data';

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