import React, { useEffect, useState } from 'react';
import { Typography, TextField, Paper, ListItem, ListItemText, FormControl, Select, MenuItem, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircularProgress, Box } from '@mui/material';
import ExportsaleCSV from "../Database/ExportSalesCSV"
const Sales = () => {
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editDialog, setEditDialog] = useState({ open: false, id: null, status: "" });
    const [selectedSale, setSelectedSale] = useState(null);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [newSale, setNewSale] = useState({ customerId: "", saleID: "", name: "", VendorID: "", price: "", status: "Pending" });

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch('http://localhost:4000/sales');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSales(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    const handleDeleteSale = async (id) => {
        try {
            await fetch(`http://localhost:4000/sales/${id}`, { method: 'DELETE' });
            setSales(sales.filter(sale => sale._id !== id));
        } catch (error) {
            console.error("Error deleting sale:", error);
        }
    };

    const handleEditStatus = (id) => {
        const sale = sales.find(sale => sale._id === id);
        setEditDialog({ open: true, id, status: sale.status });
    };

    const handleSaveStatus = async () => {
        try {
            const response = await fetch(`http://localhost:4000/sales/${editDialog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: editDialog.status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            const updatedSale = await response.json();
            setSales(sales.map(sale => sale._id === editDialog.id ? updatedSale.sale : sale));
            setEditDialog({ open: false, id: null, status: "" });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleViewSale = (sale) => {
        setSelectedSale(sale);
        setOpenViewDialog(true);
    };

    const filteredSales = sales.filter(sale =>
        (filterStatus === "All" || sale.status === filterStatus) &&
        sale.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddSale = async () => {
        try {
            const response = await fetch('http://localhost:4000/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSale),
            });

            if (!response.ok) throw new Error('Failed to create sale');

            const createdSale = await response.json();
            setSales([...sales, createdSale.sale]);
            setOpenAddDialog(false);
            setNewSale({ customerId: "", saleID: "", name: "", VendorID: "", price: "", status: "Pending" });
        } catch (error) {
            console.error('Error creating sale:', error);
        }
    };

    const handlePrintReceipt = (sale) => {
    const receiptContent = `
        -----------------------------------------------------------------------
        Landora Sale Receipt
        ------------------------------------------------------------------------
        Sale ID: ${sale.SaleId}
        Name: ${sale.name}
        Status: ${sale.status}
        Price: $${sale.price}
        Customer ID: ${sale.customerId}
        Vendor ID: ${sale.VendorID}
        ------------------------------------------------------------------------
        Thank you for your purchase!
        Visit Again Landora!
        ------------------------------------------------------------------------
        Receipt generated on: ${new Date().toLocaleString()}
        Receipt ID: LR${sale._id}
        ------------------------------------------------------------------------
        Landora Team @Amasha Nethmi
        ------------------------------------------------------------------------
        This is a computer-generated receipt and does not require a signature.
        ------------------------------------------------------------------------

    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<pre>${receiptContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
};
                            

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography variant="h6" color="error" align="center">Error: {error.message}</Typography>;
    }

    return (
        <div style={{ padding: "10px", backgroundColor: "rgb(253, 253, 227)", minHeight: "100vh" }}>
            {/* Add Search and Filter */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", justifyContent: "center" }}>
                <TextField sx={{ flexGrow: 1 }} label="Search by Name" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "250px" }} />
                <FormControl variant="outlined" style={{ minWidth: "150px" }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpenAddDialog(true)}>
                    Add Sale
                </Button>
                <ExportsaleCSV sales={sales} />
                
            </div>

            {/* Display Sales */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))", gap: "8px", padding: "16px" }}>
                {filteredSales.map((sale) => (

                    <Paper key={sale.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
                        <ListItem >
                            <ListItemText
                                primary={<Typography variant="h6">{sale.title}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="h6" style={{ fontWeight: "bold", color: "#0d47a1" }}>{sale.SaleId}</Typography>
                                        <Typography variant="body1" style={{ marginTop: "8px" }}><strong>Name:</strong> {sale.name}</Typography>
                                        <Typography variant="body2" style={{ fontWeight: "bold", color: sale.status === "Pending" ? "#d32f2f" : sale.status === "Completed" ? "#388e3c" : "#ffb300" }}>Status: {sale.status}</Typography>
                                    </>
                                }
                            />
                            <IconButton onClick={() => handleViewSale(sale)}>
                                <VisibilityIcon color="" />
                            </IconButton>
                            <IconButton onClick={() => handleEditStatus(sale._id)}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => setDeleteDialog({ open: true, id: sale._id })}>
                                <DeleteIcon color="error" />
                            </IconButton>
                            <IconButton onClick={() => handlePrintReceipt(sale)}>
                                <PrintIcon color="success" />
                            </IconButton>
                        </ListItem>
                    </Paper>
                ))}
            </div>

            {/* Edit Status Dialog */}
                        <Dialog open={editDialog.open} onClose={() => setEditDialog({ ...editDialog, open: false })}>
                            <DialogTitle>Update Sale</DialogTitle>
                            <DialogContent>
                                <FormControl variant="outlined" style={{ minWidth: "200px", marginBottom: "16px" }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={editDialog.status}
                                        onChange={(e) => setEditDialog({ ...editDialog, status: e.target.value })}
                                        label="Status"
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                        <MenuItem value="Archived">Archived</MenuItem>
                                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    margin="dense"
                                    value={editDialog.name || ""}
                                    onChange={(e) => setEditDialog({ ...editDialog, name: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Price"
                                    margin="dense"
                                    type="number"
                                    value={editDialog.price || ""}
                                    onChange={(e) => setEditDialog({ ...editDialog, price: e.target.value })}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setEditDialog({ ...editDialog, open: false })}>Cancel</Button>
                                <Button onClick={handleSaveStatus} color="primary">Save</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
                            <DialogTitle style={{ backgroundColor: "#0d47a1", color: "white" }}>Sale Details</DialogTitle>
                            <DialogContent style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
                                {selectedSale && (
                                    <Card style={{ padding: "16px", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
                                        <CardContent>
                                            <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "12px", color: "#0d47a1" }}>
                                                <strong>Sale ID:</strong> {selectedSale.SaleId}
                                            </Typography>
                                            <Typography variant="body1" style={{ marginBottom: "8px" }}>
                                                <strong>Name:</strong> {selectedSale.name}
                                            </Typography>
                                            <Typography variant="body1" style={{ marginBottom: "8px" }}>
                                                <strong>Status:</strong>{" "}
                                                <span style={{ fontWeight: "bold", color: selectedSale.status === "Pending" ? "#d32f2f" : selectedSale.status === "Completed" ? "#388e3c" : "#ffb300" }}>
                                                    {selectedSale.status}
                                                </span>
                                            </Typography>
                                            <Typography variant="body1" style={{ marginBottom: "8px" }}>
                                                <strong>Price:</strong> ${selectedSale.price}
                                            </Typography>
                                            <Typography variant="body1" style={{ marginBottom: "8px" }}>
                                                <strong>Customer ID:</strong> {selectedSale.customerId}
                                            </Typography>
                                            <Typography variant="body1" style={{ marginBottom: "8px" }}>
                                                <strong>sale ID:</strong> {selectedSale.saleID}
                                            </Typography>
                                            <Typography variant="body1" style={{ marginBottom: "8px" }}>
                                                <strong>Vendor ID:</strong> {selectedSale.VendorID}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )}
                            </DialogContent>
                            <DialogActions style={{ backgroundColor: "#f5f5f5" }}>
                                <Button onClick={() => setOpenViewDialog(false)} style={{ color: "#0d47a1", fontWeight: "bold" }}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* Add Sale Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add Sale</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Customer ID" margin="dense" value={newSale.customerId} onChange={(e) => setNewSale({ ...newSale, customerId: e.target.value })} />
                    <TextField fullWidth label="sale ID" margin="dense" value={newSale.saleID} onChange={(e) => setNewSale({ ...newSale, saleID: e.target.value })} />
                    <TextField fullWidth label="Name" margin="dense" value={newSale.name} onChange={(e) => setNewSale({ ...newSale, name: e.target.value })} />
                    <TextField fullWidth label="Vendor ID" margin="dense" value={newSale.VendorID} onChange={(e) => setNewSale({ ...newSale, VendorID: e.target.value })} />
                    <TextField fullWidth label="Price" margin="dense" type="number" value={newSale.price} onChange={(e) => setNewSale({ ...newSale, price: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddSale} color="primary">Add</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this sale?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleDeleteSale(deleteDialog.id);
                            setDeleteDialog({ open: false, id: null });
                        }}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Sales;