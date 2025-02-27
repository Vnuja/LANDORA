import React from 'react';
import { Container, Typography, Card, Button } from '@mui/material';

const ClientDetails = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Client Profile
      </Typography>
      <Card>
        <Typography>Name: John Doe</Typography>
        <Typography>Contact: johndoe@example.com</Typography>
        <Typography>Status: Active</Typography>
        <Button>Update</Button>
      </Card>
    </Container>
  );
};

export default ClientDetails;
