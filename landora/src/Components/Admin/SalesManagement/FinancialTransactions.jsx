// Import necessary dependencies
import React, { useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, Grid, IconButton, Dialog, DialogTitle, DialogActions, DialogContent, Card, CardContent, FormHelperText } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { initialTransactions } from '../Database/Data';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



function FinancialTransactions() {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [filter, setFilter] = useState({ date: '', status: '', amount: '' });
    const [sort, setSort] = useState({ key: 'date', order: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        id: '',
        date: '',
        amount: '',
        status: ''
    });
    const [errors, setErrors] = useState({
        date: false,
        amount: false,
        status: false,
    });


    const validate = () => {
        let tempErrors = { date: false, amount: false, status: false };
        let isValid = true;

        if (!newTransaction.date) {
            tempErrors.date = "Date is required.";
            isValid = false;
        }

        if (!newTransaction.amount || newTransaction.amount <= 0) {
            tempErrors.amount = "Amount must be greater than 0.";
            isValid = false;
        }

        if (!newTransaction.status) {
            tempErrors.status = "Please select a status.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Handle sorting
    const handleSort = (key) => {
        const order = sort.key === key && sort.order === 'asc' ? 'desc' : 'asc';
        const sortedTransactions = [...transactions].sort((a, b) => {
            if (key === 'amount') {
                return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            }
            return order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        });
        setTransactions(sortedTransactions);
        setSort({ key, order });
    };

    // Handle filtering
    const filteredTransactions = transactions.filter((transaction) => {
        return (
            (filter.date === '' || transaction.date.includes(filter.date)) &&
            (filter.status === '' || transaction.status === filter.status) &&
            (filter.amount === '' || transaction.amount.toString().includes(filter.amount)) &&
            transaction.date.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterStatus === "All" || transaction.status === filterStatus)
        );
    });

    // Handle date filter change
    const handleDateFilterChange = (e) => {
        setFilter({ ...filter, date: e.target.value });
    };

    // Handle Add Transaction Dialog Open
    const handleOpenAddDialog = () => {
        setNewTransaction({ id: transactions.length + 1, date: '', amount: '', status: '' }); // Reset form
        setOpenAddDialog(true);
    };

    // Handle Add Transaction
    const handleAddTransaction = () => {
        if (validate()) {
            setTransactions([...transactions, { ...newTransaction, amount: parseFloat(newTransaction.amount) }]);
            setOpenAddDialog(false);
        }
    };

    const handleViewTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setOpenDialog(true);
    };







    // Calculate totals for revenue, pending, and failed transactions
    const calculateTotals = () => {
        let revenue = 0;
        let pending = 0;
        let failed = 0;
        transactions.forEach(transaction => {
            if (transaction.status === 'Completed') {
                revenue += transaction.amount;
            } else if (transaction.status === 'Pending') {
                pending += transaction.amount;
            } else if (transaction.status === 'Failed') {
                failed += transaction.amount;
            }
        });
        return { revenue, pending, failed };
    };

    const { revenue, pending, failed } = calculateTotals();



    return (
        <div style={{ padding: "10px", backgroundColor: "rgb(253, 253, 227)", minHeight: "100vh" }}>
            <Container>
                <Box textAlign="left" my={4}>
                    <TextField
                        label="Filter by Date"
                        type="date"
                        variant="outlined"
                        value={filter.date}
                        onChange={handleDateFilterChange}
                        sx={{ mx: 2, my: 1 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="success" onClick={handleOpenAddDialog} sx={{ mx: 2 }}>
                        Add Transaction
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ px: 3, py: 1, borderRadius: 2, fontSize: "1rem", mx: 2, my: 1 }}
                        onClick={() => setFilterStatus('Pending')}
                    >
                        View Pending Payments
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ px: 3, py: 1, borderRadius: 2, fontSize: "1rem", mx: 2, my: 1 }}
                        onClick={() => setFilterStatus('All')}
                    >
                        View All
                    </Button>
              
                    <TextField
                        select
                        variant="outlined"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        sx={{ mx: 2, my: 1 }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                    </TextField>

                </Box>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>Date</TableCell>
                                <TableCell onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount ($)</TableCell>
                                <TableCell>Status</TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.status}</TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="flex-end" gap={1}>
                                            <IconButton color="primary" size="medium" onClick={() => handleViewTransaction(transaction)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton color="secondary" size="medium">
                                                <EditIcon />
                                            </IconButton>
                                            {transaction.status !== "Archived" && (
                                                <IconButton color="warning" size="medium">
                                                    <ArchiveIcon />
                                                </IconButton>
                                            )}
                                            {transaction.status === "Archived" && (
                                                <IconButton color="success" size="medium">
                                                    <UnarchiveIcon />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2} sx={{ my: 2 }}>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">Revenue</Typography>
                                <Typography variant="h4" color="primary">${revenue}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">Pending</Typography>
                                <Typography variant="h4" color="secondary">${pending}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">Failed</Typography>
                                <Typography variant="h4" color="error">${failed}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Pie Chart */}
                <Box sx={{ my: 4 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Completed', value: revenue },
                                    { name: 'Pending', value: pending },
                                    { name: 'Failed', value: failed }
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                <Cell key="cell-1" fill="#00C49F" />
                                <Cell key="cell-2" fill="#FF8042" />
                                <Cell key="cell-3" fill="#FF0000" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>

                {/* Bar Chart */}
                <Box sx={{ my: 4 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                            { name: 'Completed', value: revenue },
                            { name: 'Pending', value: pending },
                            { name: 'Failed', value: failed }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>


                // Update the Add Transaction Dialog to display errors
                <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Date"
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={newTransaction.date}
                            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            sx={{ my: 1 }}
                            error={Boolean(errors.date)}
                            helperText={errors.date}
                        />
                        <TextField
                            label="Amount"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={newTransaction.amount}
                            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                            sx={{ my: 1 }}
                            error={Boolean(errors.amount)}
                            helperText={errors.amount}
                        />
                        <FormControl variant="outlined" fullWidth sx={{ my: 1 }} error={Boolean(errors.status)}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={newTransaction.status}
                                onChange={(e) => setNewTransaction({ ...newTransaction, status: e.target.value })}
                                label="Status"
                            >
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Failed">Failed</MenuItem>
                            </Select>
                            <FormHelperText>{errors.status}</FormHelperText>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAddDialog(false)} color="secondary">Cancel</Button>
                        <Button onClick={handleAddTransaction} color="primary" disabled={!newTransaction.date || !newTransaction.amount || !newTransaction.status}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* View Transaction Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogContent>
                        {selectedTransaction && (
                            <>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold">Date: {selectedTransaction.date}</Typography>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold">Amount: ${selectedTransaction.amount}</Typography>
                                <Typography variant="body2" color="textSecondary" fontWeight="bold">Status: {selectedTransaction.status}</Typography>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}



export default FinancialTransactions;