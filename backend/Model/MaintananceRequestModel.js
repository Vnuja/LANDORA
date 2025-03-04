const mongoose = require('mongoose');
const Property = require('./PropertyModel'); // Ensure this path is correct
const Vendor = require('./VendorModel'); // Ensure this path is correct

const MaintenanceRequestSchema = new mongoose.Schema({
    propertyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    vendorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

MaintenanceRequestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);