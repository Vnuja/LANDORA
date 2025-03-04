import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Box, Button, Container, Grid, TextField, Typography, Paper, Divider, IconButton, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../Images/landora.png';
import colors from '../colors';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [user, setUser] = useState({ name: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/auth/login", user);
            if (response.status === 200) {
                const { token, user: loggedInUser } = response.data;
                login(token, loggedInUser);
                alert(`${loggedInUser.type === "admin" ? "Admin" : "User"} Login Successful`);
                navigate(loggedInUser.type === "admin" ? "/admindashboard/dashboard" : "/userprofile");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: colors.loginbg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left'
        }}>
            <Navbar />
            <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
                <Paper elevation={10} sx={{
                    padding: 5,
                    borderRadius: 3,
                    maxWidth: 900,
                    background: colors.logincard,
                    backdropFilter: 'blur(10px)',
                    boxShadow: 5
                }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={Logo} alt="Crystal Elegance" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" fontWeight="bold" color={colors.logintext1} gutterBottom>
                                Welcome Back
                            </Typography>
                            <Typography variant="subtitle1" color={colors.logintext2} gutterBottom>
                                Sign in to continue
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    placeholder="Username or Email"
                                    variant="outlined"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon style={{ color: colors.loginicon }} />
                                            </InputAdornment>
                                        ),
                                        sx: { backgroundColor: colors.logintextarea, borderRadius: 2, border: '1px solid white', color: colors.border }
                                    }}
                                    sx={{ mb: 2, input: { color: colors.placeholder }, '& .MuiOutlinedInput-root': { '&::placeholder': { color: 'white' } } }}
                                />
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon style={{ color: colors.loginicon }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { backgroundColor: colors.logintextarea, borderRadius: 2, border: '1px solid white', color: colors.border }
                                    }}
                                    sx={{ mb: 2, input: { color: colors.placeholder }, '& .MuiOutlinedInput-root': { '&::placeholder': { color: 'white' } } }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: colors.loginbutton,
                                        color: colors.logintext2,
                                        py: 1.5,
                                        borderRadius: 3,
                                        fontWeight: 'bold',
                                        boxShadow: 3,
                                        textTransform: 'none'
                                    }}
                                >
                                    Login Now
                                </Button>
                                <Divider sx={{ my: 3 }}>
                                    <Typography variant="body2" color={colors.logintext2}>Or Sign in with</Typography>
                                </Divider>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}

export default Login;
