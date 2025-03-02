import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const properties = [
    { id: 1, name: 'Property 1', location: 'Location 1', price: '$1000' },
    { id: 2, name: 'Property 2', location: 'Location 2', price: '$2000' },
    { id: 3, name: 'Property 3', location: 'Location 3', price: '$3000' },
];

const PropertyList = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Property List
            </Typography>
            <List>
                {properties.map(property => (
                    <Paper key={property.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h6">{property.name}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2">Location: {property.location}</Typography>
                                        <Typography variant="body2">Price: {property.price}</Typography>
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

export default PropertyList;