import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Paper, List as MuiList, ListItem, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent, Box, IconButton, MenuItem } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);

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

  // Handle viewing payment/receipt details
  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setOpenViewDialog(true);
  };

  // Handle filtering
  const filteredPayments = payments.filter((payment) => {
    return (
      payment.vendor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterStatus === 'All' || payment.type === filterStatus)
    );
  });

  return (
    <div style={{ padding: '10px', backgroundColor: 'rgb(253, 253, 227)', minHeight: '100vh' }}>
      <Container>
        <Box textAlign="left" my={4}>
          <Button
            variant="contained"
            color="success"
            sx={{ px: 3, py: 1, borderRadius: 2, fontSize: '1rem', mx: 2, my: 1 }}
            onClick={handleAddPayment}
          >
            Add Payment
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ px: 3, py: 1, borderRadius: 2, fontSize: '1rem', mx: 2, my: 1 }}
            onClick={() => setFilterStatus('Archived')}
          >
            View Archive
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 3, py: 1, borderRadius: 2, fontSize: '1rem', mx: 2, my: 1 }}
            onClick={() => setFilterStatus('All')}
          >
            View All
          </Button>
          <TextField
            marginRight={2}
            variant="outlined"
            placeholder="Search Payment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{ mx: 2, my: 1 }}
          />
          <TextField
            select
            variant="outlined"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ mx: 2, my: 1 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Payment">Payment</MenuItem>
            <MenuItem value="Receipt">Receipt</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
          </TextField>
        </Box>
        <MuiList sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
          {filteredPayments.map((payment) => (
            <Paper
              key={payment.id}
              elevation={4}
              sx={{
                margin: '12px 0',
                padding: 2,
                borderRadius: 3,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <ListItemText
                    primary={<Typography variant="h6" fontWeight="bold" color="info">{`Payment #${payment.paymentNumber}`}</Typography>}
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary" fontWeight="bold">Vendor: {payment.vendor}</Typography>
                        <Typography variant="body2" color="textSecondary" fontWeight="bold">Amount: ${payment.amount}</Typography>
                        <Typography variant="body2" color="textSecondary" fontWeight="bold">Date: {payment.date}</Typography>
                        <Typography
                          variant="body2"
                          color={
                            payment.type === 'Payment'
                              ? 'warning.main'
                              : payment.type === 'Receipt'
                              ? 'success.main'
                              : 'textSecondary'
                          }
                          fontWeight="bold"
                        >
                          Type: {payment.type}
                        </Typography>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }} gap={1} flexWrap="wrap">
                    <IconButton color="primary" size="medium" onClick={() => handleViewPayment(payment)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" size="medium">
                      <EditIcon />
                    </IconButton>
                    {payment.type !== 'Archived' && (
                      <IconButton color="warning" size="medium">
                        <ArchiveIcon />
                      </IconButton>
                    )}
                    {payment.type === 'Archived' && (
                      <IconButton color="success" size="medium">
                        <UnarchiveIcon />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </MuiList>

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

        {/* View Payment / Receipt Dialog */}
        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
          <DialogTitle>Payment / Receipt Details</DialogTitle>
          <DialogContent>
            {selectedPayment && (
              <>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Payment Number: {selectedPayment.paymentNumber}</Typography>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Vendor: {selectedPayment.vendor}</Typography>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Amount: ${selectedPayment.amount}</Typography>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Date: {selectedPayment.date}</Typography>
                <Typography
                  variant="body2"
                  color={
                    selectedPayment.type === 'Payment'
                      ? 'warning.main'
                      : selectedPayment.type === 'Receipt'
                      ? 'success.main'
                      : 'textSecondary'
                  }
                  fontWeight="bold"
                >
                  Type: {selectedPayment.type}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenViewDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default PaymentsAndReceipts;