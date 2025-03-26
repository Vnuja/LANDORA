const MaintananceRequest = require('../Model/MaintananceRequestModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const saltRounds = 10;

// Generate MaintananceRequest ID with leading zeros
const generateMaintananceRequestId = async () => {
    const lastMaintananceRequest = await MaintananceRequest.findOne().sort({ MaintananceRequestId: -1 }).limit(1);
    const lastId = lastMaintananceRequest ? parseInt(lastMaintananceRequest.MaintananceRequestId.slice(1), 10) : 0;
    const newId = (lastId + 1).toString().padStart(3, '0');
    return `MR${newId}`;
};

// Login MaintananceRequest
exports.loginMaintananceRequest = async (req, res) => {
    try {
        const { name, password } = req.body;
        const MaintananceRequest = await MaintananceRequest.findOne({ MaintananceRequestName: name });
        if (!MaintananceRequest) {
            return res.status(404).json({ message: 'MaintananceRequest not found' });
        }
        const isMatch = await bcrypt.compare(password, MaintananceRequest.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { MaintananceRequestId: MaintananceRequest._id, role: MaintananceRequest.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const { password: pwd, ...MaintananceRequestData } = MaintananceRequest.toObject();
        res.status(200).json({ success: true, token, MaintananceRequest: MaintananceRequestData });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in MaintananceRequest', error: error.message });
    }
};

// Get MaintananceRequest profile
exports.getMaintananceRequestProfile = async (req, res) => {
    try {
        const MaintananceRequest = await MaintananceRequest.findOne({ MaintananceRequestId: req.MaintananceRequest.MaintananceRequestId }).select('-password');
        if (!MaintananceRequest) {
            return res.status(404).json({ message: 'MaintananceRequest not found' });
        }
        res.status(200).json(MaintananceRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving MaintananceRequest profile', error: error.message });
    }
};

// Update MaintananceRequest profile
exports.updateMaintananceRequestProfile = async (req, res) => {
    try {
        const { MaintananceRequestName, name, email, phone, type, password, gender, birthday } = req.body;
        const updateData = { MaintananceRequestName, name, email, phone, type, gender, birthday };

        if (password) {
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedMaintananceRequest = await MaintananceRequest.findOneAndUpdate(
            { MaintananceRequestId: req.MaintananceRequest.MaintananceRequestId },
            updateData,
            { new: true }
        );

        if (!updatedMaintananceRequest) {
            return res.status(404).json({ message: 'MaintananceRequest not found' });
        }

        // Update the MaintananceRequest object in the AuthContext
        req.MaintananceRequest = updatedMaintananceRequest;

        res.status(200).json({ message: 'MaintananceRequest updated successfully', MaintananceRequest: updatedMaintananceRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating MaintananceRequest profile', error: error.message });
    }
};

// Change MaintananceRequest password
exports.changeMaintananceRequestPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const MaintananceRequest = await MaintananceRequest.findOne({ MaintananceRequestId: req.MaintananceRequest.MaintananceRequestId });
        if (!MaintananceRequest) {
            return res.status(404).json({ message: 'MaintananceRequest not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, MaintananceRequest.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }
        MaintananceRequest.password = await bcrypt.hash(newPassword, saltRounds);
        await MaintananceRequest.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error: error.message });
    }
};

// Create a new MaintananceRequest
exports.createMaintananceRequest = async (req, res) => {
    try {
        const { MaintananceRequestName, name, email, password, phone, type, gender, birthday } = req.body;

        const existingMaintananceRequest = await MaintananceRequest.findOne({ $or: [{ MaintananceRequestName }, { email }] });
        if (existingMaintananceRequest) {
            return res.status(400).json({ message: 'MaintananceRequestname or Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const MaintananceRequestId = await generateMaintananceRequestId();
        const newMaintananceRequest = new MaintananceRequest({ MaintananceRequestId, MaintananceRequestName, name, email, password: hashedPassword, phone, type, gender, birthday });
        await newMaintananceRequest.save();

        res.status(201).json({ message: 'MaintananceRequest created successfully', MaintananceRequest: newMaintananceRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating MaintananceRequest', error: error.message });
    }
};

// Get all MaintananceRequests
exports.getAllMaintananceRequests = async (req, res) => {
    try {
        const MaintananceRequests = await MaintananceRequest.find().select('-password');
        res.status(200).json(MaintananceRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving MaintananceRequests', error: error.message });
    }
};

// Get a single MaintananceRequest by ID
exports.getMaintananceRequestById = async (req, res) => {
    try {
        const MaintananceRequest = await MaintananceRequest.findOne({ MaintananceRequestId: req.params.id }).select('-password');
        if (!MaintananceRequest) {
            return res.status(404).json({ message: 'MaintananceRequest not found' });
        }
        res.status(200).json(MaintananceRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving MaintananceRequest', error: error.message });
    }
};

// Update a MaintananceRequest by ID
exports.updateMaintananceRequest = async (req, res) => {
    try {
        const { MaintananceRequestName, name, email, password, phone, type, gender, birthday } = req.body;
        const updateData = { MaintananceRequestName, name, email, phone, type, gender, birthday };

        if (password) {
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedMaintananceRequest = await MaintananceRequest.findOneAndUpdate(
            { MaintananceRequestId: req.params.id },
            updateData,
            { new: true }
        );

        if (!updatedMaintananceRequest) {
            return res.status(404).json({ message: 'MaintananceRequest not found' });
        }

        res.status(200).json({ message: 'MaintananceRequest updated successfully', MaintananceRequest: updatedMaintananceRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating MaintananceRequest', error: error.message });
    }
};

// Delete a MaintananceRequest by ID
exports.deleteMaintananceRequest = async (req, res) => {
    try {
        const deletedMaintananceRequest = await MaintananceRequest.findOneAndDelete({ MaintananceRequestId: req.params.id });
        if (!deletedMaintananceRequest) {
            return res.status(404).json({ message: 'MaintananceRequest not found' });
        }
        res.status(200).json({ message: 'MaintananceRequest deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting MaintananceRequest', error: error.message });
    }
};
