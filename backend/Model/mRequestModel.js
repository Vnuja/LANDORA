const mongoose = require('mongoose');

const mRequestSchema = new mongoose.Schema({
    mRequestId: {
        type: String,
        required: true,
        unique: true
    },
    customerId: {
        type: String,
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const mRequestModel = mongoose.model('mRequest', mRequestSchema);

module.exports = mRequestModel;