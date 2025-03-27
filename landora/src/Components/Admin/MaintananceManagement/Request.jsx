import React, { useEffect, useState } from 'react';
import { Typography, TextField, FormControl, Select, MenuItem, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircularProgress, Box } from '@mui/material';
import ExportRequestsCSV from "../Database/ExportRequestsCSV";

const Requests = () => {
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editDialog, setEditDialog] = useState({ open: false, id: null, status: "" });
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newRequest, setNewRequest] = useState({ customerId: "", propertyId: "", issue: "", status: "Pending" });


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:4000/maintenance');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleDeleteRequest = async (id) => {
        try {
            await fetch(`http://localhost:4000/maintenance/${id}`, { method: 'DELETE' });
            setRequests(requests.filter(req => req._id !== id));
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };

    const handleEditStatus = (id) => {
        const request = requests.find(req => req._id === id);
        setEditDialog({ open: true, id, status: request.status });
    };

    const handleSaveStatus = async () => {
        try {
            const response = await fetch(`http://localhost:4000/maintenance/${editDialog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: editDialog.status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            const updatedRequest = await response.json();
            setRequests(requests.map(req => req._id === editDialog.id ? updatedRequest.mrequest : req));
            setEditDialog({ open: false, id: null, status: "" });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleViewRequest = (request) => {
        setSelectedRequest(request);
        setOpenViewDialog(true);
    };

    const filteredRequests = requests.filter(req =>
        (filterStatus === "All" || req.status === filterStatus) &&
        req.issue.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddRequest = async () => {
        try {
            const response = await fetch('http://localhost:4000/maintenance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRequest),
            });

            if (!response.ok) throw new Error('Failed to create request');

            const createdRequest = await response.json();
            setRequests([...requests, createdRequest.mrequest]);
            setOpenAddDialog(false);
            setNewRequest({ customerId: "", propertyId: "", issue: "", status: "Pending" });
        } catch (error) {
            console.error('Error creating request:', error);
        }
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
                <TextField sx={{ flexGrow: 1 }} label="Search by Issue" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "250px" }} />
                <FormControl variant="outlined" style={{ minWidth: "150px" }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpenAddDialog(true)}>
                    Add Request
                </Button>
                <ExportRequestsCSV requests={requests} />

            </div>

            {/* Display Requests */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "8px", padding: "16px" }}>
                {filteredRequests.map((req) => (
                    <Card key={req._id} style={{ padding: "12px", borderRadius: "8px", boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)" }}>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#0d47a1" }}>{req.mRequestId}</Typography>
                            <Typography variant="body1" style={{ marginTop: "8px" }}><strong>Issue:</strong> {req.issue}</Typography>
                            <Typography variant="body2" style={{ fontWeight: "bold", color: req.status === "Pending" ? "#d32f2f" : req.status === "In Progress" ? "#ffb300" : "#388e3c" }}>Status: {req.status}</Typography>
                        </CardContent>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IconButton onClick={() => handleViewRequest(req)}>
                                <VisibilityIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleEditStatus(req._id)}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteRequest(req._id)}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Edit Status Dialog */}
            <Dialog open={editDialog.open} onClose={() => setEditDialog({ ...editDialog, open: false })}>
                <DialogTitle>Update Status</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" style={{ minWidth: "200px" }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={editDialog.status}
                            onChange={(e) => setEditDialog({ ...editDialog, status: e.target.value })}
                            label="Status"
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialog({ ...editDialog, open: false })}>Cancel</Button>
                    <Button onClick={handleSaveStatus} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* View Request Dialog */}
            <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
                <DialogTitle>Request Details</DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <>
                            <Typography variant="h6"><strong>Issue:</strong> {selectedRequest.issue}</Typography>
                            <Typography variant="body1"><strong>Status:</strong> {selectedRequest.status}</Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Add Request Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add Maintenance Request</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Customer ID" margin="dense" value={newRequest.customerId} onChange={(e) => setNewRequest({ ...newRequest, customerId: e.target.value })} />
                    <TextField fullWidth label="Property ID" margin="dense" value={newRequest.propertyId} onChange={(e) => setNewRequest({ ...newRequest, propertyId: e.target.value })} />
                    <TextField fullWidth label="Issue" margin="dense" value={newRequest.issue} onChange={(e) => setNewRequest({ ...newRequest, issue: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddRequest} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Requests;
