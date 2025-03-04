const MaintenanceRequest = require('../Model/MaintananceRequestModel');

// Get all maintenance requests
exports.getAllMaintenanceRequests = async (req, res) => {
    try {
        const requests = await MaintenanceRequest.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching maintenance requests', error: error.message });
    }
};

// Create a new maintenance request
exports.createMaintenanceRequest = async (req, res) => {
    try {
        const newRequest = new MaintenanceRequest(req.body);
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating maintenance request', error: error.message });
    }
};

// Update an existing maintenance request
exports.updateMaintenanceRequest = async (req, res) => {
    try {
        const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error updating maintenance request', error: error.message });
    }
};

// Delete a maintenance request
exports.deleteMaintenanceRequest = async (req, res) => {
    try {
        await MaintenanceRequest.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting maintenance request', error: error.message });
    }
};