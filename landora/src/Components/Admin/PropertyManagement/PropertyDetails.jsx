import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    List,
    Chip,
    Box,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    CardMedia,
    Snackbar,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import MessageIcon from '@mui/icons-material/Message';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';
import ExportpropertyCSV from '../Database/ExportPropertyCSV';

const PropertyDetails = () => {
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:4000/properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const handleAddProperty = () => {
        setSelectedProperty({
            propertyID: '',
            name: '',
            size: '',
            address: '',
            price: '',
            status: '',
            images: '',
        });
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleEditProperty = (property) => {
        setSelectedProperty(property);
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDeleteProperty = async (propertyID) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await axios.delete(`http://localhost:4000/properties/${propertyID}`);
                setSnackbarMessage('Property deleted successfully!');
                setSnackbarOpen(true);
                fetchProperties();
            } catch (error) {
                console.error('Error deleting property:', error);
            }
        }
    };

    const handleSaveProperty = async () => {
        try {
            if (selectedProperty._id) {
                await axios.put(`http://localhost:4000/properties/${selectedProperty._id}`, selectedProperty);
                setSnackbarMessage('Property updated successfully!');
            } else {
                await axios.post('http://localhost:4000/properties', selectedProperty);
                setSnackbarMessage('Property added successfully!');
            }
            setSnackbarOpen(true);
            setOpenDialog(false);
            fetchProperties();
        } catch (error) {
            console.error('Error saving property:', error);
        }
    };

    const handlePrint = (property) => {
        const printWindow = window.open('', '_blank');
        const content = `
            <html>
                <head>
                    <title>Property Details</title>
                </head>
                <body>
                    <h1>${property.name}</h1>
                    <p><strong>Image:</strong></p>
                    ${property.images && property.images.length > 0 ? `<img src="${property.images[0]}" alt="${property.name}" style="width: 200px; height: 200px; object-fit: cover;" />` : '<p>No image available</p>'}
                    <p><strong>Size:</strong> ${property.size}</p>
                    <p><strong>Address:</strong> ${property.address}</p>
                    <p><strong>Price:</strong> $${property.price}</p>
                    <p><strong>Status:</strong> ${property.status}</p>
                </body>
            </html>
        `;
        printWindow.document.open();
        printWindow.document.write(content);
        printWindow.document.close();
    };

    const filteredProperties = properties.filter(
        (property) => property.name && property.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <TextField
                label="Search by Property Name"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddProperty}
                style={{ marginBottom: '20px' }}
            >
                Add Property
            </Button>        <ExportpropertyCSV properties={properties} />

            <List>
                {filteredProperties.map((property) => (
                    <Paper key={property._id} elevation={3} sx={{ margin: '10px 0', padding: '10px' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="h6">{property.name}</Typography> <Typography variant="h6">{property.propertyID}</Typography>

                                        <CardMedia
                                            component="img"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }}
                                            image={property.images?.[0] || 'default-image-path'}
                                            alt={property.name}
                                        />
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body2">Size: {property.size} perches</Typography>
                                        <Typography variant="body2">Address: {property.address}</Typography>
                                        <Typography variant="body2" color="green" mt={0.5}>
                                            Rs {(Number(property.price) || 0).toLocaleString()} per perch
                                        </Typography>

                                        <Typography variant="body2">Status: {property.status}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <Chip label="MEMBER" size="small" />
                                            <Chip
                                                icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                                                label="VERIFIED SELLER"
                                                size="small"
                                                sx={{ bgcolor: 'lightblue', color: '#000' }}
                                            />
                                        </Box>
                                    </>
                                }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <IconButton color="primary" onClick={() => { setOpenViewDialog(true); setSelectedProperty(property); }}>
                                    <VisibilityIcon />
                                </IconButton>
                                <IconButton color="primary" onClick={() => handleEditProperty(property)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handlePrint(property)}>
                                    <PrintIcon color="success" />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDeleteProperty(property._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    </Paper>
                ))}
            </List>

            <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
                <DialogTitle>{editMode ? 'Property Details' : 'Add Property'}</DialogTitle>
                <DialogContent>
                    {selectedProperty && (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                Name:{selectedProperty.name}
                            </Typography>
                            <CardMedia
                                component="img"
                                style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }}
                                image={selectedProperty.images?.[0] || 'default-image-path'}
                                alt={selectedProperty.name}
                            />
                            <Typography variant="subtitle1" gutterBottom>
                                Size:{selectedProperty.size}
                            </Typography>

                            <Typography variant="subtitle1" gutterBottom>
                                Address:{selectedProperty.address}
                            </Typography>

                            <Typography variant="subtitle1" gutterBottom>
                                Price:{selectedProperty.price}
                            </Typography>

                            <Typography variant="subtitle1" gutterBottom>
                                Status:{selectedProperty.status}
                            </Typography>

                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenViewDialog(false)} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Property Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{editMode ? 'Edit Property' : 'Add Property'}</DialogTitle>
                <DialogContent>
                    {selectedProperty && (
                        <>
                            <TextField
                                label="Name"
                                value={selectedProperty.name}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, name: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Images (comma separated)"
                                value={selectedProperty.images}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, images: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Size"
                                value={selectedProperty.size}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, size: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Address"
                                value={selectedProperty.address}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, address: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Price"
                                value={selectedProperty.price}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, price: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Status"
                                value={selectedProperty.status}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, status: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveProperty} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default PropertyDetails;