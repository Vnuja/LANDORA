import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import Chart from "../Chart";
import MapView from "../MapView";
import Sidebar from "../Sidebar";

const Dashboard = () => {
                    <Sidebar />
    return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Properties</Typography>
            <Typography variant="h4">120</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">For Sale</Typography>
            <Typography variant="h4">80</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Rented</Typography>
            <Typography variant="h4">40</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Chart />
      </Grid>
      <Grid item xs={12}>
        <MapView />
      </Grid>
    </Grid>
  );
};

export default Dashboard;