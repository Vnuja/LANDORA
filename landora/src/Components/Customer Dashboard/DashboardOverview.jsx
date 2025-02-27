import React from 'react';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';

const DashboardOverview = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Clients</Typography>
            <Typography variant="h4">100</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Active Clients</Typography>
            <Typography variant="h4">80</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Applications Pending</Typography>
            <Typography variant="h4">15</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardOverview;
