const express = require('express');
const router = express.Router();
const maintenanceRequestController = require('../Controllers/maintenanceRequestController');

// Get all maintenance requests
router.get('/', maintenanceRequestController.getAllMaintenanceRequests);

// Create a new maintenance request
router.post('/', maintenanceRequestController.createMaintenanceRequest);

// Update an existing maintenance request
router.put('/:id', maintenanceRequestController.updateMaintenanceRequest);

// Delete a maintenance request
router.delete('/:id', maintenanceRequestController.deleteMaintenanceRequest);

module.exports = router;