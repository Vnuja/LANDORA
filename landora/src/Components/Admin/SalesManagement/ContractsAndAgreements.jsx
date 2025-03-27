import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Grid, Paper, List as MuiList, ListItemText, Dialog, DialogActions, DialogTitle, DialogContent, Box, IconButton, MenuItem } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';


import { Contracts } from '../Database/Data';
import jsPDF from 'jspdf';

const handleDownloadPDF = (contract) => {
  const doc = new jsPDF();
  doc.text(`Contract Details`, 10, 10);
  doc.text(`Date: ${contract.date}`, 10, 20);
  doc.text(`Title: ${contract.title}`, 10, 30);
  doc.text(`Status: ${contract.status}`, 10, 40);
  doc.save(`${contract.title}.pdf`);
};

const ContractsAndAgreements = () => {
  const [contracts, setContracts] = useState(Contracts);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContract, setNewContract] = useState({ date: '', title: '', status: 'Pending' });
  const [errors, setErrors] = useState({ date: '', title: '', status: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedContract, setSelectedContract] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);


  // Validation function
  const validate = () => {
    let tempErrors = { date: '', title: '', status: '' };
    let isValid = true;

    if (!newContract.date) {
      tempErrors.date = 'Date is required.';
      isValid = false;
    }
    if (!newContract.title) {
      tempErrors.title = 'Title is required.';
      isValid = false;
    }
    if (!newContract.status) {
      tempErrors.status = 'Status is required.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle saving new contract
  const handleSaveContract = () => {
    if (validate()) {
      const contract = {
        id: contracts.length + 1,
        ...newContract,
      };
      setContracts([...contracts, contract]);
      setOpenDialog(false);
      setNewContract({ date: '', title: '', status: 'Pending' });
      setErrors({ date: '', title: '', status: '' }); // Clear errors
    }
  };

  const handleDeleteContract = () => {
    setContracts(contracts.filter((contract) => contract.id !== contractToDelete.id));
    setOpenDeleteDialog(false);
  };


  // Handle filtering
  const filteredContracts = contracts.filter((contract) => {
    return (
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterStatus === 'All' || contract.status === filterStatus)
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
            onClick={() => setOpenDialog(true)}
          >
            Add Contract
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
            placeholder="Search Contract..."
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
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
          </TextField>
        </Box>
        <MuiList sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
          {filteredContracts.map((contract) => (
            <Paper
              key={contract.id}
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
                    primary={<Typography variant="h6" fontWeight="bold" color="info">{contract.title}</Typography>}
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary" fontWeight="bold">Date: {contract.date}</Typography>
                        <Typography
                          variant="body2"
                          color={
                            contract.status === 'Pending'
                              ? 'warning.main'
                              : contract.status === 'Completed'
                                ? 'success.main'
                                : 'textSecondary'
                          }
                          fontWeight="bold"
                        >
                          Status: {contract.status}
                        </Typography>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }} gap={1} flexWrap="wrap">
                    <IconButton color="primary" size="medium" onClick={() => setSelectedContract(contract)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" size="medium">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="rgb(0, 0, 0)" size="medium" onClick={() => handleDownloadPDF(contract)}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => { setContractToDelete(contract); setOpenDeleteDialog(true); }}>
                    <DeleteIcon />
                  </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </MuiList>

        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this contract?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleDeleteContract} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

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
              error={Boolean(errors.date)}
              helperText={errors.date}
            />
            <TextField
              label="Contract Title"
              fullWidth
              value={newContract.title}
              onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
              margin="dense"
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <TextField
              label="Status"
              fullWidth
              value={newContract.status}
              onChange={(e) => setNewContract({ ...newContract, status: e.target.value })}
              margin="dense"
              error={Boolean(errors.status)}
              helperText={errors.status}
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

        {/* View Contract Dialog */}
        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
          <DialogTitle>Contract Details</DialogTitle>
          <DialogContent>
            {selectedContract && (
              <>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Date: {selectedContract.date}</Typography>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Title: {selectedContract.title}</Typography>
                <Typography
                  variant="body2"
                  color={
                    selectedContract.status === 'Pending'
                      ? 'warning.main'
                      : selectedContract.status === 'Completed'
                        ? 'success.main'
                        : 'textSecondary'
                  }
                  fontWeight="bold"
                >
                  Status: {selectedContract.status}
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

export default ContractsAndAgreements;