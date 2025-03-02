import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const properties = [
    { id: 1, name: 'Sale 1', location: 'Location 1', price: '$1000' },
    { id: 2, name: 'Sale 2', location: 'Location 2', price: '$2000' },
    { id: 3, name: 'Sale 3', location: 'Location 3', price: '$3000' },
];

const SalesList = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Sale List
            </Typography>
            <List>
                {properties.map(Sale => (
                    <Paper key={Sale.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h6">{Sale.name}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2">Location: {Sale.location}</Typography>
                                        <Typography variant="body2">Price: {Sale.price}</Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    </Paper>
                ))}
            </List>
        </Container>
    );
};

export default SalesList;