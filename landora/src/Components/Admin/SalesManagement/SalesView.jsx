import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Box, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Paper, List as MuiList, ListItem, ListItemText, IconButton } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SalesData } from '../Database/Data';


function Sales() {
    const [sales, setSales] = useState(SalesData);
    const [openDialog, setOpenDialog] = useState(false);
    const [openModifyDialog, setOpenModifyDialog] = useState(false);
    const [openNewTransactionDialog, setOpenNewTransactionDialog] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);


    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');


    const filteredSales = sales.filter((sale) =>
        sale.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterStatus === "All" || sale.status === filterStatus)
    );


    // State for new transaction form
    const [newTransaction, setNewTransaction] = useState({
        name: "",
        location: "",
        price: "",
        status: "Active",
    });

    const handleOpenNewTransaction = () => {
        setOpenNewTransactionDialog(true);
    };

    const handleCloseNewTransaction = () => {
        setOpenNewTransactionDialog(false);
        setNewTransaction({ name: "", location: "", price: "", status: "Active" });
    };

    const handleSaveNewTransaction = () => {
        if (!newTransaction.name || !newTransaction.location || !newTransaction.price) {
            alert("Please fill in all fields!");
            return;
        }

        const newSale = {
            id: sales.length + 1,
            ...newTransaction,
            price: `$${newTransaction.price}`,
        };

        setSales([...sales, newSale]);
        handleCloseNewTransaction();
    };

    const handleViewTransaction = (sale) => {
        setSelectedSale(sale);
        setOpenDialog(true);
    };

    const handleModifyPayment = (sale) => {
        setSelectedSale(sale);
        setOpenModifyDialog(true);
    };

    const handleArchiveTransaction = (id) => {
        setSales(sales.map((sale) => (sale.id === id ? { ...sale, status: "Archived" } : sale)));
    };
    
    const handleUnarchiveTransaction = (id) => {
        setSales(sales.map((sale) => (sale.id === id ? { ...sale, status: "Active" } : sale)));
    };

    return (
        <div style={{ padding: "10px", backgroundColor: "rgb(253, 253, 227)", minHeight: "100vh" }}>
            <Container>
                <Box textAlign="left" my={4}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ px: 3, py: 1, borderRadius: 2, fontSize: "1rem", mx: 2, my: 1 }}
                        onClick={handleOpenNewTransaction}
                    >
                        Add Transaction
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ px: 3, py: 1, borderRadius: 2, fontSize: "1rem", mx: 2, my: 1 }}
                        onClick={() => setFilterStatus('Archived')}
                    >
                        View Archive
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ px: 3, py: 1, borderRadius: 2, fontSize: "1rem", mx: 2, my: 1 }}
                        onClick={() => setFilterStatus('All')}
                    >
                        View All
                    </Button>
                
                    <TextField
                        marginRight={2}
                        variant="outlined"
                        placeholder="Search Sale..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
                        }}
                        sx={{ mx: 2, my: 1 }}
                    />
                    <TextField
                        select
                        variant="outlined"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        sx={{ mx: 2, my: 1 }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                    </TextField>
                </Box>
                <MuiList sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
                    {filteredSales.map((sale) => (
                        <Paper
                            key={sale.id}
                            elevation={4}
                            sx={{
                                margin: "12px 0",
                                padding: 2,
                                borderRadius: 3,
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.2s ease-in-out",
                                "&:hover": { transform: "scale(1.02)" }
                            }}
                        >
                            <Grid container spacing={2} alignItems="center">
                                {/* Sale Details */}
                                <Grid item xs={12} sm={8}>
                                    
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" fontWeight="bold" color="info">
                                                {sale.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    color={sale.status === "Active" ? "success.main" :sale.status === "Completed" ? "info.main" : sale.status === "Archived" ? "warning.main" : sale.status === "Pending" ? "error.main" : "textSecondary"}

                                                    fontWeight="bold"
                                                >
                                                    🔹 Status: {sale.status}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </Grid>

                                {/* Action Buttons */}
                                <Grid item xs={12} sm={4}>
                                    <Box display="flex" justifyContent={{ xs: "center", sm: "flex-end" }} gap={1} flexWrap="wrap">
                                        <IconButton color="primary" size="medium" onClick={() => handleViewTransaction(sale)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton color="secondary" size="medium" onClick={() => handleModifyPayment(sale)}>
                                            <EditIcon />
                                        </IconButton>
                                        {sale.status !== "Archived" && (
                                            <IconButton color="warning" size="medium" onClick={() => handleArchiveTransaction(sale.id)}>
                                                <ArchiveIcon />
                                            </IconButton>
                                        )}
                                        {sale.status == "Archived" && (
                                            <IconButton color="success" size="medium" onClick={() => handleUnarchiveTransaction(sale.id)}>
                                                <UnarchiveIcon />
                                            </IconButton>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </MuiList>

                {/* New Transaction Dialog */}
                <Dialog open={openNewTransactionDialog} onClose={handleCloseNewTransaction}>
                    <DialogTitle>New Transaction</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Name"
                            value={newTransaction.name}
                            onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Location"
                            value={newTransaction.location}
                            onChange={(e) => setNewTransaction({ ...newTransaction, location: e.target.value })}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            type="number"
                            value={newTransaction.price}
                            onChange={(e) => setNewTransaction({ ...newTransaction, price: e.target.value })}
                            margin="dense"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewTransaction} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveNewTransaction} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* View Transaction Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogContent>
                        {selectedSale && (
                            <>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold">📍 Location: {selectedSale.location}</Typography>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold">💲 Price: {selectedSale.price}</Typography>
                                <Typography
                                    variant="body2"
                                    color={selectedSale.status === "Active" ? "success.main" : "textSecondary"}
                                    fontWeight="bold"
                                >
                                    🔹 Status: {selectedSale.status}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold"> 🔹Property: {selectedSale.propertyID}</Typography>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold"> 🔹Buyer: {selectedSale.buyerID}</Typography>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold"> 🔹Vendor: {selectedSale.VendorID}</Typography>

                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Modify Payment Dialog */}
                <Dialog open={openModifyDialog} onClose={() => setOpenModifyDialog(false)}>
                    <DialogTitle>Modify Transaction Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Name"
                            value={selectedSale?.name || ''}
                            onChange={(e) => setSelectedSale({ ...selectedSale, name: e.target.value })}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Location"
                            value={selectedSale?.location || ''}
                            onChange={(e) => setSelectedSale({ ...selectedSale, location: e.target.value })}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            value={selectedSale?.price || ''}
                            onChange={(e) => setSelectedSale({ ...selectedSale, price: e.target.value })}
                            margin="dense"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Status"
                            value={selectedSale?.status || ''}
                            onChange={(e) => setSelectedSale({ ...selectedSale, status: e.target.value })}
                            margin="dense"
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModifyDialog(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onClick={() => {
                                setSales(sales.map((sale) => (sale.id === selectedSale.id ? selectedSale : sale)));
                                setOpenModifyDialog(false);
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}

export default Sales;
