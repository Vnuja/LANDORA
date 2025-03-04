import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Schedule = () => {
    const [maintenanceDate, setMaintenanceDate] = useState(null);
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Maintenance Date:', maintenanceDate);
        console.log('Description:', description);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Schedule Preventive Maintenance
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Maintenance Date"
                                    value={maintenanceDate}
                                    onChange={(newValue) => setMaintenanceDate(newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Schedule
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Schedule;