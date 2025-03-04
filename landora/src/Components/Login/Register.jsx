import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Paper,
    Divider,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Logo from '../Images/landora.png';
import colors from '../colors';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: '',
        birthday: '',
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({ ...prevState, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!user.userName) formErrors.userName = 'Username is required';
        if (!user.name) formErrors.name = 'Name is required';
        if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) formErrors.email = 'Valid email is required';
        if (!user.phone || !/^\d+$/.test(user.phone)) formErrors.phone = 'Valid phone number is required';
        if (!user.password || user.password.length < 6) formErrors.password = 'Password must be at least 6 characters';
        if (!user.confirmPassword || user.password !== user.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        if (!user.gender) formErrors.gender = 'Gender is required';
        if (!user.birthday) formErrors.birthday = 'Birthday is required';
        if (!termsAccepted) alert('Please accept the terms and conditions');

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:4000/users/register', user);
            if (response.data.message === 'User created successfully') {
                alert('Registration successful');
                navigate('/login');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: colors.signupbg,
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
                    background: colors.signupcard,
                    backdropFilter: 'blur(10px)',
                    boxShadow: 5
                }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={Logo} alt="Crystal Elegance" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" fontWeight="bold" color={colors.signuptext1 }  gutterBottom>
                                Create Account
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                {['userName', 'name', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
                                    <TextField
                                        key={field}
                                        fullWidth
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        variant="outlined"
                                        name={field}
                                        type={field.includes('password') ? 'password' : 'text'}
                                        value={user[field]}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2, backgroundColor: colors.signuptextarea, borderRadius: 2, input: { color: colors.signupplaceholder }, fieldset: { borderColor: 'white' }, '&::placeholder': { color: 'white' } }}
                                        error={!!errors[field]}
                                        helperText={errors[field]}
                                    />
                                ))}
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel sx={{color: colors.signupplaceholder }}>Gender</InputLabel>
                                    <Select
                                        name="gender"
                                        value={user.gender}
                                        onChange={handleInputChange}
                                        sx={{ color: colors.signuptext1 , '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }}
                                        error={!!errors.gender}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                    {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                                </FormControl>
                                <TextField
                                    fullWidth
                                    placeholder="Birthday"
                                    variant="outlined"
                                    name="birthday"
                                    type="date"
                                    value={user.birthday}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2, backgroundColor: colors.signuptextarea , borderRadius: 2, input: { color: colors.signupplaceholder }, fieldset: { borderColor: 'white' } }}
                                    error={!!errors.birthday}
                                    helperText={errors.birthday}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                                    label="Accept Terms and Conditions"
                                    sx={{ marginBottom: 2, color: 'white' }}
                                />
                                <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: colors.signupbutton, color:colors.signuptext1,py: 1.5, borderRadius: 3, fontWeight: 'bold', boxShadow: 3, textTransform: 'none' }}>
                                    Create Account
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}

export default Register;
