import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const properties = [
    { id: 1, name: 'Maintanance company  1', location: 'Location 1', price: '$1000' },
    { id: 2, name: 'Maintanance company  2', location: 'Location 2', price: '$2000' },
    { id: 3, name: 'Maintanance company  3', location: 'Location 3', price: '$3000' },
];

const MaintananceList = () => {
    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Maintanance company  List
            </Typography>
            <List>
                {properties.map(Maintanance  => (
                    <Paper key={Maintanance.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="h6">{Maintanance.name}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2">Location: {Maintanance.location}</Typography>
                                        <Typography variant="body2">Price: {Maintanance.price}</Typography>
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

export default MaintananceList;