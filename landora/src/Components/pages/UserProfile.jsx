import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router v6
import { Box, Button, Container, Grid, Typography, Paper, Avatar, TextField, IconButton, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit, Lock, Delete, Logout, ArrowBack, Print, Details } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const URL = 'http://localhost:4000/property';

function UserProfile() {
    const { authState, logout } = useContext(AuthContext);
    const [propertys, setpropertys] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const { user, token } = authState;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        userName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        type: '',
    });
    const [selectedproperty, setSelectedproperty] = useState(null); // To track selected property for editing
    const [propertyUpdate, setpropertyUpdate] = useState({ rating: '', comment: '' }); // To hold property data during editing
    const [error, setError] = useState(null);

    // Handle input field changes
    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handlepropertyChange = (e) => {
        setpropertyUpdate({ ...propertyUpdate, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchpropertys = async () => {
            try {
                const response = await axios.get(URL);
                const filteredpropertys = response.data.filter((property) => property.customerId === user.userId);
                setpropertys(filteredpropertys);
                setNoResults(filteredpropertys.length === 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching propertys:', error);
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            if (user && user.userId && token) {
                try {
                    const response = await axios.get(`http://localhost:4000/users/${user.userId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setUpdatedUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setError('Error fetching user data. Please log in again.');
                    setLoading(false);
                    if (error.response && error.response.status === 401) {
                        logout();
                        navigate('/login');
                    }
                }
            } else {
                navigate('/login');
            }
        };

        fetchUser();
        fetchpropertys();
    }, [user, token, logout, navigate]);

    const handleEdit = (property) => {
        setSelectedproperty(property); // Set the property to be edited
        setpropertyUpdate({ rating: property.rating, comment: property.comment }); // Pre-fill the form
    };

    const handlepropertyUpdate = async () => {
        try {
            await axios.put(`${URL}/${selectedproperty._id}`, propertyUpdate, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setpropertys((prev) =>
                prev.map((f) => (f._id === selectedproperty._id ? { ...f, ...propertyUpdate } : f))
            );
            alert('property updated successfully');
            setSelectedproperty(null); // Exit edit mode
        } catch (error) {
            console.error("Error updating property:", error);
            setError('Error updating property. Please try again later.');
        }
    };

    const deleteproperty = async (id) => {
        try {
            const response = await axios.delete(`${URL}/${id}`);
            if (response.status === 200) {
                setpropertys((prev) => prev.filter((property) => property._id !== id));
            }
        } catch (error) {
            console.error('Error deleting property:', error.response ? error.response.data : error.message);
        }
    };

    const handlePDF = () => {
        const doc = new jsPDF();
        doc.text("property Details Report", 10, 10);

        doc.autoTable({
            head: [['ID', 'Customer ID', 'Jewellery ID', 'Rating', 'Comment']],
            body: propertys.map((property) => [property.propertyId, property.customerId, property.jewelleryId, property.rating, property.comment]),
            startY: 20,
            margin: { top: 20 },
            styles: {
                overflow: 'linebreak',
                fontSize: 10,
            },
            headStyles: {
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
            },
        });

        doc.save('property-details.pdf');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/users/${user.userId}`, updatedUser, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Profile updated successfully');
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError('Error updating profile. Please try again later.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:4000/users/${user.userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Profile deleted successfully');
                logout();
                navigate('/login');
            } catch (error) {
                console.error("Error deleting profile:", error);
                setError('Error deleting profile. Please try again later.');
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                background: 'linear-gradient(to left, #131313, #ff932f)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: 10,
            }}
        >
            <Navbar />
            <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 7 }}>
                <Paper
                    elevation={10}
                    sx={{
                        padding: 4,
                        borderRadius: 2,
                        maxWidth: 900,
                        width: '100%',
                        display: 'flex',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <Grid container sx={{ height: '100%' }}>
                        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#131313', height: '100%', padding: 3 }}>
                            <Avatar
                                src={user.image}
                                alt={user.name}
                                sx={{ width: 120, height: 120, marginBottom: 2, border: '4px solidrgb(58, 58, 58)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                fullWidth
                                sx={{ marginBottom: 2, backgroundColor: '#ff932f', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' } }}
                                onClick={() => setEditing(true)}
                            >
                                Edit Details
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Lock />}
                                fullWidth
                                sx={{ marginBottom: 2, backgroundColor: '#ff932f', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' } }}
                            >
                                Change Password
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Delete />}
                                fullWidth
                                sx={{ marginBottom: 2, backgroundColor: '#ff932f', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' } }}
                                onClick={handleDelete}
                            >
                                Delete Account
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Logout />}
                                fullWidth
                                sx={{ marginBottom: 2, backgroundColor: '#ff932f', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' } }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Grid>

                        {/* Main content */}
                        <Grid item xs={12} sm={8} sx={{ padding: 3 }}>
                            <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2,color:'#fff' }}>
                                {editing ? 'Edit Profile' : 'User Profile'}
                            </Typography>

                            {editing ? (
                                <Box  >
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={updatedUser.name}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                        sx={{textcolor:'#fff' }}
                                    />
                                    <TextField
                                        label="Username"
                                        name="userName"
                                        value={updatedUser.userName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={updatedUser.email}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        value={updatedUser.phone}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleUpdate}
                                        sx={{ backgroundColor: '#ff932f', color: '#ffffff', '&:hover': { backgroundColor: '#FF4F45' } }}
                                    >
                                        Update
                                    </Button>
                                </Box>
                                
                            ) : (
                                <Box sx={{ marginBottom: 3 }}>
                                <>
                                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#ff932f' }}>
                                        MY ACCOUNT
                                    </Typography>

                                    {/* Conditionally render the Name field */}
                                    {editing ? (
                                        <TextField
                                            label="Name"
                                            value={updatedUser.name}
                                            onChange={handleChange}
                                            name="name"
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                        />
                                    ) : (
                                        <Typography variant="body1" sx={{ marginBottom: 2,color:'#fff' }}>
                                            <strong>Name:</strong> {user.name}
                                        </Typography>
                                    )}

                                    {/* Conditionally render the Email field */}
                                    {editing ? (
                                        <TextField
                                            label="Email"
                                            value={updatedUser.email}
                                            onChange={handleChange}
                                            name="email"
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                        />
                                    ) : (
                                        <Typography variant="body1" sx={{ marginBottom: 2,color:'#fff' }}>
                                            <strong>Email:</strong> {user.email}
                                        </Typography>
                                    )}

                                    {/* Conditionally render the Phone field */}
                                    {editing ? (
                                        <TextField
                                            label="Phone"
                                            value={updatedUser.phone}
                                            onChange={handleChange}
                                            name="phone"
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                        />
                                    ) : (
                                        <Typography variant="body1" sx={{ marginBottom: 2,color:'#fff' }}>
                                            <strong>Phone:</strong> {user.phone}
                                        </Typography>
                                    )}
                                </>

                                {editing && (
                                    <Button
                                        variant="contained"
                                        onClick={handleUpdate}
                                        fullWidth
                                        sx={{ marginTop: 2, backgroundColor: '#ff932f', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' } }}
                                    >
                                        Save Changes
                                    </Button>
                                )}
                            </Box>)}
                                <>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#ff932f' }}>
                                        MY PROPERTY LIST
                                    </Typography>
                                    
                                    {selectedproperty ? (
                                        // Edit property form
                                        <Box sx={{ marginBottom: 4 }}>
                                            <TextField
                                                label="Rating"
                                                name="rating"
                                                value={propertyUpdate.rating}
                                                onChange={handlepropertyChange}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            <TextField
                                                label="Comment"
                                                name="comment"
                                                value={propertyUpdate.comment}
                                                onChange={handlepropertyChange}
                                                fullWidth
                                                margin="normal"
                                                required
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handlepropertyUpdate}
                                                sx={{ backgroundColor: '#ff932f', color: '#ffffff', '&:hover': { backgroundColor: '#FF4F45' }, marginRight: 2 }}
                                            >
                                                Save Changes
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => setSelectedproperty(null)}
                                                sx={{ backgroundColor: '#ff932f', color: '#ffffff', '&:hover': { backgroundColor: '#FF4F45' } }}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    ) : (
                                        // property list
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Property ID</TableCell>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Location</TableCell>
                                                        <TableCell>Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {propertys.map((property) => (
                                                        <TableRow key={property._id}>
                                                            <TableCell>{property.jewelleryId}</TableCell>
                                                            <TableCell>{property.rating}</TableCell>
                                                            <TableCell>{property.comment}</TableCell>
                                                            <TableCell>
                                                                <IconButton onClick={() => handleEdit(property)}>
                                                                    <Edit />
                                                                </IconButton>
                                                                <IconButton onClick={() => deleteproperty(property._id)}>
                                                                    <Delete />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )}

                                    {noResults && (
                                        <Typography variant="body1" color="textSecondary" align="center">
                                            No property found.
                                        </Typography>
                                    )}

                                    <Button
                                        variant="contained"
                                        startIcon={<Print />}
                                        sx={{ marginTop: 2, backgroundColor: '#ff932f', color: '#ffffff', '&:hover': { backgroundColor: '#FF4F45' } }}
                                        onClick={handlePDF}
                                    >
                                        Download Report
                                    </Button>
                                </>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}

export default UserProfile;
