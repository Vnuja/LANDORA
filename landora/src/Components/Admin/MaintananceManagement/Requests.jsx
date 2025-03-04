import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField
} from '@material-ui/core';
const sampleRequests = [
    { _id: '1', property: 'Property 1', issue: 'Leaky faucet', status: 'Pending' },
    { _id: '2', property: 'Property 2', issue: 'Broken window', status: 'In Progress' },
    { _id: '3', property: 'Property 3', issue: 'No hot water', status: 'Completed' },
    { _id: '4', property: 'Property 4', issue: 'Electrical issue', status: 'Pending' },
    { _id: '5', property: 'Property 5', issue: 'Pest control', status: 'In Progress' },
    { _id: '6', property: 'Property 6', issue: 'Roof leak', status: 'Pending' },
    { _id: '7', property: 'Property 7', issue: 'Broken door', status: 'Completed' },
    { _id: '8', property: 'Property 8', issue: 'Heating issue', status: 'Pending' },
    { _id: '9', property: 'Property 9', issue: 'Air conditioning issue', status: 'In Progress' },
    { _id: '10', property: 'Property 10', issue: 'Plumbing issue', status: 'Completed' },
];

const Requests = () => {
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);

    useEffect(() => {
        setMaintenanceRequests(sampleRequests);
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('/api/maintenance-requests');
            setMaintenanceRequests(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching maintenance requests:', error);
        }
    };

    const handleEdit = (id) => {
        const request = maintenanceRequests.find((req) => req._id === id);
        setCurrentRequest(request);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentRequest(null);
    };

    const handleSave = async () => {
        try {
            if (currentRequest._id) {
                await axios.put(`/api/maintenance-requests/${currentRequest._id}`, currentRequest);
            } else {
                await axios.post('/api/maintenance-requests', currentRequest);
            }
            fetchRequests();
            setOpen(false);
            setCurrentRequest(null);
        } catch (error) {
            console.error('Error saving maintenance request:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/maintenance-requests/${id}`);
            fetchRequests();
        } catch (error) {
            console.error('Error deleting maintenance request:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Maintenance Requests
            </Typography>
            <Button variant="contained" color="primary" onClick={() => {
                setCurrentRequest({ property: '', issue: '', status: 'Pending' });
                setOpen(true);
            }}>
                Add Request
            </Button>
            <br /><br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Property</TableCell>
                            <TableCell>Issue</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maintenanceRequests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell>{request._id}</TableCell>
                                <TableCell>{request.property}</TableCell>
                                <TableCell>{request.issue}</TableCell>
                                <TableCell>{request.status}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" style={{ marginRight: 8 }} onClick={() => handleEdit(request._id)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(request._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentRequest?._id ? 'Edit Request' : 'Add Request'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Property"
                        type="text"
                        fullWidth
                        value={currentRequest?.property || ''}
                        onChange={(e) => setCurrentRequest({ ...currentRequest, property: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Issue"
                        type="text"
                        fullWidth
                        value={currentRequest?.issue || ''}
                        onChange={(e) => setCurrentRequest({ ...currentRequest, issue: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        type="text"
                        fullWidth
                        value={currentRequest?.status || ''}
                        onChange={(e) => setCurrentRequest({ ...currentRequest, status: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Requests;