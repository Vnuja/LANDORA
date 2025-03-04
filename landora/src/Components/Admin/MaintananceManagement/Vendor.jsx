import React from 'react';
import { Container, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VendorManagement = () => {
    const [vendors, setVendors] = React.useState([]);
    const [newVendor, setNewVendor] = React.useState('');

    const handleAddVendor = () => {
        if (newVendor.trim()) {
            setVendors([...vendors, newVendor]);
            setNewVendor('');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Vendor Management
            </Typography>
            <TextField
                label="New Vendor"
                value={newVendor}
                onChange={(e) => setNewVendor(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddVendor}>
                Add Vendor
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendor Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendors.map((vendor, index) => (
                            <TableRow key={index}>
                                <TableCell>{vendor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default VendorManagement;