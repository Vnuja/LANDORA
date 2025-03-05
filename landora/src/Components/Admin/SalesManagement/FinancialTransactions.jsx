// Import necessary dependencies
import React, { useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Sample transaction data
const initialTransactions = [
    { id: 1, date: '2025-03-01', amount: 500, status: 'Completed' },
    { id: 2, date: '2025-03-02', amount: 300, status: 'Pending' },
    { id: 3, date: '2025-03-03', amount: 700, status: 'Failed' },
    { id: 4, date: '2025-03-04', amount: 200, status: 'Completed' },
];

function FinancialTransactions() {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [filter, setFilter] = useState({ date: '', status: '', amount: '' });
    const [sort, setSort] = useState({ key: 'date', order: 'asc' });

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
            (filter.amount === '' || transaction.amount.toString().includes(filter.amount))
        );
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Financial Transactions
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h6" gutterBottom>Transaction List</Typography>
                {/* Filters */}
                <FormControl style={{ marginRight: 10, minWidth: 120 }}>
                    <TextField
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filter.date}
                        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                    />
                </FormControl>
                <FormControl style={{ marginRight: 10, minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ marginRight: 10, minWidth: 120 }}>
                    <TextField
                        label="Amount"
                        type="number"
                        value={filter.amount}
                        onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
                    />
                </FormControl>
                {/* Transactions Table */}
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default FinancialTransactions;
