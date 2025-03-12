import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Box, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Paper, List as MuiList, ListItemText, IconButton, MenuItem } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';

const initialSales = [
    { id: 1, name: "Sale 1", location: "Location 1", price: "$1000", status: "Active" },
    { id: 2, name: "Sale 2", location: "Location 2", price: "$2000", status: "Active" },
    { id: 3, name: "Sale 3", location: "Location 3", price: "$3000", status: "Active" },
    { id: 4, name: "Sale 4", location: "Location 4", price: "$2500", status: "Completed" },
];

function Sales() {
    const [sales, setSales] = useState(initialSales);
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

    return (
        <Container>
            <Box textAlign="center" my={4}>
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
                    Sales Management
                </Typography>

                {/* Search & Filter */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mb={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search Sale..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
                        }}
                    />
                    <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                    </TextField>
                </Stack>

                {/* Buttons */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                    <Button variant="contained" color="success" onClick={() => setOpenNewTransactionDialog(true)}>
                        Add Transaction
                    </Button>
                    <Button variant="contained" color="primary">
                        View Archive
                    </Button>
                </Stack>
            </Box>

            {/* Sales List */}
            <MuiList sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
                {filteredSales.length > 0 ? (
                    filteredSales.map((sale) => (
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
                                <Grid item xs={12} sm={8}>
                                    <ListItemText
                                        primary={<Typography variant="h6" fontWeight="bold" color="primary">{sale.name}</Typography>}
                                        secondary={
                                            <Typography
                                                variant="body2"
                                                color={sale.status === "Active" ? "success.main" : "textSecondary"}
                                                fontWeight="bold"
                                            >
                                                🔹 Status: {sale.status}
                                            </Typography>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Box display="flex" justifyContent="flex-end" gap={1}>
                                        <IconButton color="primary" onClick={() => setOpenDialog(true)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => setOpenModifyDialog(true)}>
                                            <EditIcon />
                                        </IconButton>
                                        {sale.status !== "Archived" && (
                                            <IconButton color="error">
                                                <ArchiveIcon />
                                            </IconButton>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                ) : (
                    <Typography textAlign="center" color="textSecondary" mt={2}>
                        No sales found.
                    </Typography>
                )}
            </MuiList>

            {/* Dialogs for Transactions */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogContent>
                    {selectedSale && (
                        <>
                            <Typography variant="body2" color="textSecondary">📍 Location: {selectedSale.location}</Typography>
                            <Typography variant="body2" color="textSecondary">💲 Price: {selectedSale.price}</Typography>
                            <Typography
                                variant="body2"
                                color={selectedSale.status === "Active" ? "success.main" : "textSecondary"}
                                fontWeight="bold"
                            >
                                🔹 Status: {selectedSale.status}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openNewTransactionDialog} onClose={() => setOpenNewTransactionDialog(false)}>
                <DialogTitle>New Transaction</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Name" margin="dense" variant="outlined" />
                    <TextField fullWidth label="Location" margin="dense" variant="outlined" />
                    <TextField fullWidth label="Price" type="number" margin="dense" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenNewTransactionDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Sales;
