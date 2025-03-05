import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Paper, List, ListItem, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const initialTransactions = [
  { id: 1, transactionNumber: 'T1001', description: 'Payment for Vendor A', status: 'Completed', date: '2025-03-01' },
  { id: 2, transactionNumber: 'T1002', description: 'Receipt from Client B', status: 'Pending', date: '2025-03-05' },
  { id: 3, transactionNumber: 'T1003', description: 'Payment for Vendor C', status: 'In Progress', date: '2025-03-10' },
];

const TransactionStatus = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    transactionNumber: '',
    description: '',
    status: 'Pending',
    date: '',
  });

  // Open Add Transaction dialog
  const handleAddTransaction = () => {
    setOpenDialog(true);
  };

  // Handle saving new transaction
  const handleSaveTransaction = () => {
    const transaction = {
      id: transactions.length + 1,
      ...newTransaction,
    };
    setTransactions([...transactions, transaction]);
    setOpenDialog(false);
    setNewTransaction({ transactionNumber: '', description: '', status: 'Pending', date: '' });
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === id ? { ...transaction, status: newStatus } : transaction
    );
    setTransactions(updatedTransactions);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Transaction Status
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddTransaction} style={{ marginBottom: '20px' }}>
        Add Transaction
      </Button>

      <List>
        {transactions.map((transaction) => (
          <Paper key={transaction.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
            <ListItem>
              <ListItemText
                primary={<Typography variant="h6">{`Transaction #${transaction.transactionNumber}`}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2">Description: {transaction.description}</Typography>
                    <Typography variant="body2">Date: {transaction.date}</Typography>
                    <Typography variant="body2">Status: {transaction.status}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleStatusChange(transaction.id, 'Completed')}
                      style={{ marginTop: '10px', marginRight: '5px' }}
                    >
                      Mark as Completed
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleStatusChange(transaction.id, 'In Progress')}
                      style={{ marginTop: '10px', marginRight: '5px' }}
                    >
                      Mark as In Progress
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleStatusChange(transaction.id, 'Pending')}
                      style={{ marginTop: '10px' }}
                    >
                      Mark as Pending
                    </Button>
                  </>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      {/* Add New Transaction Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            label="Transaction Number"
            fullWidth
            value={newTransaction.transactionNumber}
            onChange={(e) => setNewTransaction({ ...newTransaction, transactionNumber: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Description"
            fullWidth
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newTransaction.status}
              onChange={(e) => setNewTransaction({ ...newTransaction, status: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveTransaction} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TransactionStatus;
