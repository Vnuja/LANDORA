import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { properties } from '../Database/Data';

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
                                        <Typography variant="body2">Name: {property.title}</Typography>
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