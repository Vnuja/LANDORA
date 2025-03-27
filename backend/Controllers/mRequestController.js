const mRequest = require('../Model/mRequestModel');

// Generate mRequest ID with leading zeros
const generatemRequestId = async () => {
    const LastmRequest = await mRequest.findOne().sort({ mRequestId: -1 }).limit(1);
    const lastId = LastmRequest ? parseInt(LastmRequest.mRequestId.replace('MR', ''), 10) : 0;
    const newId = `MR${(lastId + 1).toString().padStart(3, '0')}`; // Adjust padding as needed
    return newId;
};

// Create a new mRequest
exports.createmRequest = async (req, res) => {
    try {
        const { customerId, propertyId, issue, status } = req.body;

        const mRequestId = await generatemRequestId(); // Generate new mRequest ID
        const newmRequest = new mRequest({ mRequestId, customerId, propertyId, issue, status });
        await newmRequest.save();

        res.status(201).json({ message: 'mRequest created successfully', mrequest: newmRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating mrequest', error });
    }
};

// Get all mrequests
exports.getAllmRequests = async (req, res) => {
    try {
        const mrequests = await mRequest.find();
        res.status(200).json(mrequests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving mrequests', error });
    }
};

// Get mrequest by ID
exports.getmRequestById = async (req, res) => {
    try {
        const mrequest = await mRequest.findById(req.params.id);
        if (!mrequest) {
            return res.status(404).json({ message: 'mRequest not found' });
        }
        res.status(200).json(mrequest);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving mRequest', error });
    }
};

// Update mrequest by ID
exports.updatemRequest = async (req, res) => {
    try {
        const { mRequestId, customerId, propertyId, issue, status } = req.body;
        const updatedmRequest = await mRequest.findByIdAndUpdate(
            req.params.id,
            { customerId, propertyId, issue, status},
            { new: true } // Return the updated mRequest
        );

        if (!updatedmRequest) {
            return res.status(404).json({ message: 'mRequest not found' });
        }

        res.status(200).json({ message: 'mRequest updated successfully', mrequest: updatedmRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating mrequest', error });
    }
};

// Delete mrequest by ID
exports.deletemRequest = async (req, res) => {
    try {
        const deletedmRequest = await mRequest.findByIdAndDelete(req.params.id);
        if (!deletedmRequest) {
            return res.status(404).json({ message: 'mRequest not found' });
        }

        res.status(200).json({ message: 'mRequest deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mrequest', error });
    }
};