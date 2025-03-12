import React, { useState } from 'react';
import {
    Typography, Button, TextField, Select, MenuItem, Card, CardContent,
    Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { sampleRequests, properties } from '../Database/Data';

const Requests = () => {
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [requests, setRequests] = useState(sampleRequests);
    const [editDialog, setEditDialog] = useState({ open: false, id: null, status: "" });
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [openViewDialog, setOpenViewDialog] = useState(false);

    const handleDeleteRequest = (id) => {
        setRequests(requests.filter(req => req._id !== id));
    };

    const handleEditStatus = (id) => {
        const request = requests.find(req => req._id === id);
        setEditDialog({ open: true, id, status: request.status });
    };

    const handleSaveStatus = () => {
        setRequests(requests.map(req => req._id === editDialog.id ? { ...req, status: editDialog.status } : req));
        setEditDialog({ open: false, id: null, status: "" });
    };

    const handleViewRequest = (request) => {
        setSelectedRequest(request);
        setOpenViewDialog(true);
    };

    const enrichedRequests = requests.map((request) => {
        const propertyDetails = properties.find(prop => prop.id === parseInt(request.property));
        return { ...request, propertyDetails };
    });

    const filteredRequests = enrichedRequests.filter(req =>
        (filterStatus === "All" || req.status === filterStatus) &&
        req.propertyDetails?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: "24px", backgroundColor: "rgb(253, 253, 227)", minHeight: "100vh" }}>
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px", justifyContent: "center" }}>
                <TextField sx={{ flexGrow: 1 }}
                    label="Search by Property Name"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "300px" }}
                />
                <FormControl variant="outlined" style={{ minWidth: "200px" }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "10px", padding: "20px" }}>
                {filteredRequests.map((req) => (
                    <Card key={req._id} style={{ padding: "16px", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#0d47a1" }}>{req.propertyDetails?.title || "Unknown Property"}</Typography>
                            {/*<Typography color="textSecondary">Location: {req.propertyDetails?.location || "N/A"}</Typography>*/}
                            <Typography variant="body1" style={{ marginTop: "8px" }}><strong>Issue:</strong> {req.issue}</Typography>
                            <Typography variant="body2" style={{ fontWeight: "bold", color: req.status === "Pending" ? "#d32f2f" : req.status === "In Progress" ? "#f9a825" : "#388e3c" }}>
                                <strong>Status:</strong> {req.status}
                            </Typography>
                            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                                <IconButton color="primary" size="medium" onClick={() => handleViewRequest(req)}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton color="primary" size="medium" onClick={() => handleEditStatus(req._id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" size="medium" onClick={() => handleDeleteRequest(req._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Edit Status Dialog */}
            <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, id: null, status: "" })}>
                <DialogTitle>Edit Status</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select value={editDialog.status} onChange={(e) => setEditDialog({ ...editDialog, status: e.target.value })} label="Status">
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialog({ open: false, id: null, status: "" })} color="secondary">Cancel</Button>
                    <Button onClick={handleSaveStatus} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* View Request Dialog */}
            <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
                <DialogTitle>Request Details</DialogTitle>
                <DialogContent>
                    {selectedRequest && (
                        <div>
                            <Typography variant="h6"><strong>Property:</strong> {selectedRequest.propertyDetails?.title || "Unknown Property"}</Typography>
                            <Typography variant="body1"><strong>Issue:</strong> {selectedRequest.issue}</Typography>
                            <Typography variant="body1"><strong>Price:</strong> {selectedRequest.propertyDetails?.price}</Typography>
                            <Typography variant="body1"><strong>Location:</strong> {selectedRequest.propertyDetails?.location}</Typography>
                            <Typography variant="body2" style={{ fontWeight: "bold", color: selectedRequest.status === "Pending" ? "#d32f2f" : selectedRequest.status === "In Progress" ? "#f9a825" : "#388e3c" }}>
                                <strong>Status:</strong> {selectedRequest.status}
                            </Typography>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenViewDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Requests;