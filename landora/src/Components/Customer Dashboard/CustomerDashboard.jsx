import React from 'react';
import { Container, Grid, Card, Typography, TextField } from '@mui/material';
import DashboardOverview from '../Customer Dashboard/DashboardOverview';
import ClientManagement from '../Customer Dashboard/ClientManagement';

const CustomerDashboard = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardOverview />
        </Grid>
        <Grid item xs={12} md={8}>
          <ClientManagement />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerDashboard;
