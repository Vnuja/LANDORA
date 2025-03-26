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
        
        // For phone number, only allow digits and limit to 10 characters
        if (name === 'phone') {
            if (value.length > 10) return;
            if (value && !/^\d*$/.test(value)) return;
        }
        
        setUser((prevState) => ({ ...prevState, [name]: value }));
        
        // Validate field immediately when changed
        if (name === 'email') {
            if (!value.includes('@')) {
                setErrors((prevErrors) => ({ ...prevErrors, email: 'Email must contain @' }));
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email' }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
            }
        } else if (name === 'phone') {
            if (value.length !== 10) {
                setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number must be 10 digits' }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
            } else if (!/[A-Z]/.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must contain at least one capital letter' }));
            } else if (!/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must contain at least one symbol' }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
            }
        } else if (name === 'birthday') {
            if (!value) {
                setErrors((prevErrors) => ({ ...prevErrors, birthday: 'Birthday is required' }));
            } else {
                const [year, month, day] = value.split('-').map(Number);
                
                // Validate month (1-12)
                if (month < 1 || month > 12) {
                    setErrors((prevErrors) => ({ ...prevErrors, birthday: 'Invalid month (must be 1-12)' }));
                    return;
                }
                
                // Validate day (1-31)
                if (day < 1 || day > 31) {
                    setErrors((prevErrors) => ({ ...prevErrors, birthday: 'Invalid day (must be 1-31)' }));
                    return;
                }
                
                // Validate specific month-day combinations (e.g., Feb 30)
                const daysInMonth = new Date(year, month, 0).getDate();
                if (day > daysInMonth) {
                    setErrors((prevErrors) => ({ 
                        ...prevErrors, 
                        birthday: `Invalid date (month ${month} has only ${daysInMonth} days)` 
                    }));
                    return;
                }
                
                // Age validation (18+)
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                
                if (age < 18) {
                    setErrors((prevErrors) => ({ ...prevErrors, birthday: 'You must be at least 18 years old' }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, birthday: '' }));
                }
            }
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!user.userName) formErrors.userName = 'Username is required';
        if (!user.name) formErrors.name = 'Name is required';
        
        if (!user.email) {
            formErrors.email = 'Email is required';
        } else if (!user.email.includes('@')) {
            formErrors.email = 'Email must contain @';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            formErrors.email = 'Please enter a valid email';
        }
        
        if (!user.phone) {
            formErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(user.phone)) {
            formErrors.phone = 'Phone number must be 10 digits';
        }
        
        if (!user.password) {
            formErrors.password = 'Password is required';
        } else if (user.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
        } else if (!/[A-Z]/.test(user.password)) {
            formErrors.password = 'Password must contain at least one capital letter';
        } else if (!/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(user.password)) {
            formErrors.password = 'Password must contain at least one symbol';
        }
        
        if (!user.confirmPassword || user.password !== user.confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }
        
        if (!user.gender) formErrors.gender = 'Gender is required';
        
        if (!user.birthday) {
            formErrors.birthday = 'Birthday is required';
        } else {
            const [year, month, day] = user.birthday.split('-').map(Number);
            
            if (month < 1 || month > 12) {
                formErrors.birthday = 'Invalid month (must be 1-12)';
            } else if (day < 1 || day > 31) {
                formErrors.birthday = 'Invalid day (must be 1-31)';
            } else {
                const daysInMonth = new Date(year, month, 0).getDate();
                if (day > daysInMonth) {
                    formErrors.birthday = `Invalid date (month ${month} has only ${daysInMonth} days)`;
                } else {
                    const today = new Date();
                    const birthDate = new Date(user.birthday);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();
                    
                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    
                    if (age < 18) {
                        formErrors.birthday = 'You must be at least 18 years old';
                    }
                }
            }
        }
        
        if (!termsAccepted) {
            alert('Please accept the terms and conditions');
            isValid = false;
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0 && isValid;
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
                            <Typography variant="h4" fontWeight="bold" color={colors.signuptext1} gutterBottom>
                                Create Account
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                {['userName', 'name'].map((field) => (
                                    <TextField
                                        key={field}
                                        fullWidth
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        variant="outlined"
                                        name={field}
                                        value={user[field]}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2, backgroundColor: colors.signuptextarea, borderRadius: 2, input: { color: colors.signupplaceholder }, fieldset: { borderColor: 'white' }, '&::placeholder': { color: 'white' } }}
                                        error={!!errors[field]}
                                        helperText={errors[field]}
                                    />
                                ))}
                                
                                <TextField
                                    fullWidth
                                    placeholder="Email"
                                    variant="outlined"
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2, backgroundColor: colors.signuptextarea, borderRadius: 2, input: { color: colors.signupplaceholder }, fieldset: { borderColor: 'white' }, '&::placeholder': { color: 'white' } }}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                
                                <TextField
                                    fullWidth
                                    placeholder="Phone"
                                    variant="outlined"
                                    name="phone"
                                    type="tel"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                    inputProps={{ maxLength: 10 }}
                                    sx={{ mb: 2, backgroundColor: colors.signuptextarea, borderRadius: 2, input: { color: colors.signupplaceholder }, fieldset: { borderColor: 'white' }, '&::placeholder': { color: 'white' } }}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                                
                                <TextField
                                    fullWidth
                                    placeholder="Password"
                                    variant="outlined"
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2, backgroundColor: colors.signuptextarea, borderRadius: 2, input: { color: colors.signupplaceholder }, fieldset: { borderColor: 'white' }, '&::placeholder': { color: 'white' } }}
                                    error={!!errors.password}
                                    helperText={errors.password || "Must contain: 6+ chars, 1 capital, 1 symbol"}
                                />
                                
                                <TextField
                                    fullWidth
                                    placeholder="Confirm Password"
                                    variant="outlined"
                                    name="confirmPassword"
                                    type="password"
                                    value={user.confirmPassword}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2, backgroundColor: colors.signuptextarea, borderRadius: 2, input: { color: colors.signupplaceholder }, fieldset: { borderColor: 'white' }, '&::placeholder': { color: 'white' } }}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />
                                
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
                                    label="Birthday"
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
                                    inputProps={{
                                        max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]
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