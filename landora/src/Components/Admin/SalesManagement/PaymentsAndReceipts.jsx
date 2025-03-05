import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Paper, List, ListItem, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';

const initialPayments = [
  { id: 1, paymentNumber: 'P1001', vendor: 'Vendor A', amount: 10000, date: '2025-03-01', type: 'Payment' },
  { id: 2, paymentNumber: 'P1002', vendor: 'Vendor B', amount: 5000, date: '2025-03-05', type: 'Receipt' },
  { id: 3, paymentNumber: 'P1003', vendor: 'Vendor C', amount: 7000, date: '2025-03-10', type: 'Payment' },
];

const PaymentsAndReceipts = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPayment, setNewPayment] = useState({
    paymentNumber: '',
    vendor: '',
    amount: '',
    date: '',
    type: 'Payment', // Can either be 'Payment' or 'Receipt'
  });

  // Open Add Payment/Receipt dialog
  const handleAddPayment = () => {
    setOpenDialog(true);
  };

  // Handle saving new payment/receipt
  const handleSavePayment = () => {
    const payment = {
      id: payments.length + 1,
      ...newPayment,
    };
    setPayments([...payments, payment]);
    setOpenDialog(false);
    setNewPayment({ paymentNumber: '', vendor: '', amount: '', date: '', type: 'Payment' });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Payments and Receipts
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddPayment} style={{ marginBottom: '20px' }}>
        Add Payment / Receipt
      </Button>

      <List>
        {payments.map((payment) => (
          <Paper key={payment.id} elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
            <ListItem>
              <ListItemText
                primary={<Typography variant="h6">{`Payment #${payment.paymentNumber}`}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2">Vendor: {payment.vendor}</Typography>
                    <Typography variant="body2">Amount: ${payment.amount}</Typography>
                    <Typography variant="body2">Date: {payment.date}</Typography>
                    <Typography variant="body2">Type: {payment.type}</Typography>
                  </>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      {/* Add New Payment / Receipt Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Payment / Receipt</DialogTitle>
        <DialogContent>
          <TextField
            label="Payment Number"
            fullWidth
            value={newPayment.paymentNumber}
            onChange={(e) => setNewPayment({ ...newPayment, paymentNumber: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Vendor"
            fullWidth
            value={newPayment.vendor}
            onChange={(e) => setNewPayment({ ...newPayment, vendor: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={newPayment.date}
            onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Type"
            fullWidth
            value={newPayment.type}
            onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSavePayment} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentsAndReceipts;
