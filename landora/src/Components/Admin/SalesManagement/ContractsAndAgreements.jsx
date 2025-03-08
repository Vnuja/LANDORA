import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Paper, List, ListItem, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';

const initialContracts = [
  { id: 1, date: '2025-03-01', title: 'Contract with Vendor A', status: 'Active' },
  { id: 2, date: '2025-03-05', title: 'Agreement for Sale #123', status: 'Pending' },
  { id: 3, date: '2025-03-10', title: 'Contract with Vendor B', status: 'Completed' },
];

const ContractsAndAgreements = () => {
  const [contracts, setContracts] = useState(initialContracts);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContract, setNewContract] = useState({ date: '', title: '', status: 'Pending' });

  // Open Add Contract dialog
  const handleAddContract = () => {
    setOpenDialog(true);
  };

  // Handle saving new contract
  const handleSaveContract = () => {
    const contract = {
      id: contracts.length + 1,
      ...newContract,
    };
    setContracts([...contracts, contract]);
    setOpenDialog(false);
    setNewContract({ date: '', title: '', status: 'Pending' });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Contracts and Agreements
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddContract} style={{ marginBottom: '20px' }}>
        Add New Contract
      </Button>

      <List>
        {contracts.map((contract) => (
          <Paper key={contract.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
            <ListItem>
              <ListItemText
                primary={<Typography variant="h6">{contract.title}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2">Date: {contract.date}</Typography>
                    <Typography variant="body2">Status: {contract.status}</Typography>
                  </>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      {/* Add New Contract Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Contract</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={newContract.date}
            onChange={(e) => setNewContract({ ...newContract, date: e.target.value })}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Contract Title"
            fullWidth
            value={newContract.title}
            onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Status"
            fullWidth
            value={newContract.status}
            onChange={(e) => setNewContract({ ...newContract, status: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveContract} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContractsAndAgreements;
