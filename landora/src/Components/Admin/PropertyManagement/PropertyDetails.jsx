import React, { useState } from 'react';
import { properties } from '../Database/Data';
import { Container, Typography, List, ListItem, ListItemText, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';


const PropertyDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [openEditDialog, setEditOpenDialog] = useState(false);
    const [openViewDialog, setViewOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [propertyList, setPropertyList] = useState(properties);

    const handleViewProperty = (property) => {
        setSelectedProperty(property);
        setViewOpenDialog(true);
        setEditMode(false);
    };

    const handleEditProperty = (property) => {
        setSelectedProperty(property);
        setEditOpenDialog(true);
        setEditMode(true);
    };

    const handleDeleteProperty = (propertyId) => {
        setPropertyList(propertyList.filter(property => property.id !== propertyId));
    };

    const handleSaveProperty = () => {
        setPropertyList(propertyList.map(property => property.id === selectedProperty.id ? selectedProperty : property));
        setEditOpenDialog(false);
    };

    const filteredProperties = propertyList.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Property List
            </Typography>
            <TextField
                label="Search by Property Name"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                margin="normal"
            />
            <List>
                {filteredProperties.map(property => (
                    <Paper key={property.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
                        <ListItem >
                            <ListItemText
                                primary={<Typography variant="h6">{property.title}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2">Location: {property.location}</Typography>
                                        <Typography variant="body2">Price: {property.price}</Typography>
                                    </>
                                }
                            />
                            <IconButton color="primary" size="medium" onClick={() => handleViewProperty(property)}>
                                <VisibilityIcon />
                            </IconButton>
                            <IconButton color="success" size="medium" onClick={() => handleEditProperty(property)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" size="medium" onClick={() => handleDeleteProperty(property.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    </Paper>
                ))}
            </List>

            {/* View/Edit Property Dialog */}
            <Dialog open={openViewDialog && !editMode} onClose={() => setViewOpenDialog(false)}>
                <DialogTitle>Property Details</DialogTitle>
                <DialogContent>
                    {selectedProperty && (
                        <div>
                            <Typography variant="h6" gutterBottom><strong>Title:</strong> {selectedProperty.title}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Location:</strong> {selectedProperty.location}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Price:</strong> {selectedProperty.price}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Buyer ID:</strong> {selectedProperty.buyerID}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Vendor ID:</strong> {selectedProperty.VendorID}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Description:</strong> {selectedProperty.description}</Typography>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewOpenDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditDialog} onClose={() => setEditOpenDialog(false)}>
                <DialogTitle>{editMode ? 'Edit Property' : 'Property Details'}</DialogTitle>
                <DialogContent>
                    {selectedProperty && (
                        <div>
                            <TextField
                                label="Title"
                                value={selectedProperty.title}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, title: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled={!editMode}
                            />
                            <TextField
                                label="Location"
                                value={selectedProperty.location}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, location: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled={!editMode}
                            />
                            <TextField
                                label="Price"
                                value={selectedProperty.price}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, price: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled={!editMode}
                            />
                            <TextField
                                label="Buyer ID"
                                value={selectedProperty.buyerID}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, buyerID: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled={!editMode}
                            />
                            <TextField
                                label="Vendor ID"
                                value={selectedProperty.VendorID}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, VendorID: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled={!editMode}
                            />
                            <TextField
                                label="Description"
                                value={selectedProperty.description}
                                onChange={(e) => setSelectedProperty({ ...selectedProperty, description: e.target.value })}
                                fullWidth
                                margin="normal"
                                disabled={!editMode}
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {editMode ? (
                        <Button onClick={handleSaveProperty} color="primary">Save</Button>
                    ) : (
                        <Button onClick={() => setEditOpenDialog(false)} color="primary">Close</Button>
                    )}
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PropertyDashboard;


// const PropertyDashboard = () => {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedProperty, setSelectedProperty] = useState(null);
//     const [openDialog, setOpenDialog] = useState(false);

//     const handleViewProperty = (property) => {
//         setSelectedProperty(property);
//         setOpenDialog(true);
//     };

//     const filteredProperties = properties.filter(property =>
//         property.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <Container>
//             <Typography variant="h4" component="h1" gutterBottom>
//                 Property List
//             </Typography>
//             <TextField
//                 label="Search by Property Name"
//                 variant="outlined"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <List>
//                 {filteredProperties.map(property => (
//                     <Paper key={property.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
//                         <ListItem button onClick={() => handleViewProperty(property)}>
//                             <ListItemText
//                                 primary={<Typography variant="h6">{property.title}</Typography>}
//                                 secondary={
//                                     <>
//                                         <Typography variant="body2">Location: {property.location}</Typography>
//                                         <Typography variant="body2">Price: {property.price}</Typography>
//                                     </>
//                                 }
//                             />
//                         </ListItem>
//                     </Paper>
//                 ))}
//             </List>

//             {/* View Property Dialog */}
//             <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//                 <DialogTitle>Property Details</DialogTitle>
//                 <DialogContent>
//                     {selectedProperty && (
//                         <div>
//                             <Typography variant="h6"><strong>Title:</strong> {selectedProperty.title}</Typography>
//                             <Typography variant="body1"><strong>Location:</strong> {selectedProperty.location}</Typography>
//                             <Typography variant="body1"><strong>Price:</strong> {selectedProperty.price}</Typography>
//                             <Typography variant="body1"><strong>Buyer ID:</strong> {selectedProperty.buyerID}</Typography>
//                             <Typography variant="body1"><strong>Vendor ID:</strong> {selectedProperty.VendorID}</Typography>
//                             <Typography variant="body1"><strong>Description:</strong> {selectedProperty.description}</Typography>
//                         </div>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default PropertyDashboard;