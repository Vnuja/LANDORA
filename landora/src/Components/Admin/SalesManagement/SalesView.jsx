import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Typography, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Container, List as MuiList, Paper } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faDollarSign, faUsers, faSackDollar, faHammer, faSignOutAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';





const initialSales = [
    { id: 1, name: "Sale 1", location: "Location 1", price: "$1000", status: "Active" },
    { id: 2, name: "Sale 2", location: "Location 2", price: "$2000", status: "Active" },
    { id: 3, name: "Sale 3", location: "Location 3", price: "$3000", status: "Active" },
    { id: 4, name: "Sale 4", location: "Location 4", price: "$2500", status: "Completed" },
];

function Sales() {
    const [sales, setSales] = useState(initialSales);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [editData, setEditData] = useState({ name: "", location: "", price: "" });

    const handleNewTransaction = () => {
        const newSale = {
            id: sales.length + 1,
            name: `Sale ${sales.length + 1}`,
            location: `Location ${sales.length + 1}`,
            price: `$${1000 * (sales.length + 1)}`,
            status: "Active",
        };
        setSales([...sales, newSale]);
    };

    const handleModifyPayment = (id) => {
        setSales(
            sales.map((sale) =>
                sale.id === id ? { ...sale, price: `$${parseInt(sale.price.replace("$", "")) + 500}` } : sale
            )
        );
    };

    const handleArchiveTransaction = (id) => {
        setSales(sales.map((sale) => (sale.id === id ? { ...sale, status: "Archived" } : sale)));
    };

    const handleViewTransaction = (sale) => {
        setSelectedSale(sale);
        setOpenDialog(true);
    };

    const handleEditTransaction = (sale) => {
        setSelectedSale(sale);
        setEditData({ name: sale.name, location: sale.location, price: sale.price });
        setOpenEditDialog(true);
    };

    const handleSaveEdit = () => {
        setSales(
            sales.map((sale) =>
                sale.id === selectedSale.id ? { ...sale, ...editData } : sale
            )
        );
        setOpenEditDialog(false);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Sales Management
            </Typography>

            <Button variant="contained" color="primary" onClick={handleNewTransaction} style={{ marginBottom: "10px" }}>
                Initialize New Transaction
            </Button>

            <MuiList>
                {sales.map((sale) => (
                    <Paper key={sale.id} elevation={3} style={{ margin: "10px 0", padding: "10px" }}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h6">{sale.name}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2">Location: {sale.location}</Typography>
                                        <Typography variant="body2">Price: {sale.price}</Typography>
                                        <Typography variant="body2">Status: {sale.status}</Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        <Button variant="outlined" color="info" onClick={() => handleViewTransaction(sale)} style={{ marginRight: "10px" }}>
                            View Transaction
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => handleModifyPayment(sale.id)} style={{ marginRight: "10px" }}>
                            Modify Payment Terms
                        </Button>
                        <Button variant="outlined" color="success" onClick={() => handleEditTransaction(sale)} style={{ marginRight: "10px" }}>
                            Edit Transaction
                        </Button>
                        {sale.status !== "Archived" && (
                            <Button variant="outlined" color="error" onClick={() => handleArchiveTransaction(sale.id)}>
                                Archive Transaction
                            </Button>
                        )}
                    </Paper>
                ))}
            </MuiList>

            {/* View Transaction Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Transaction Details</DialogTitle>
                {selectedSale && (
                    <Typography variant="body1" style={{ padding: "20px" }}>
                        <strong>Name:</strong> {selectedSale.name} <br />
                        <strong>Location:</strong> {selectedSale.location} <br />
                        <strong>Price:</strong> {selectedSale.price} <br />
                        <strong>Status:</strong> {selectedSale.status}
                    </Typography>
                )}
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Transaction Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Location"
                        value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Sales;
