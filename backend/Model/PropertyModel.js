const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    PropertyId: {
        type: String,
        required: true,
        unique: true
    },
    images: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Reserved', 'For Sale', 'Sold'],
        default: 'For Sale'
    }
}, { timestamps: true });

const PropertyModel = mongoose.model('Property', PropertySchema);

module.exports = PropertyModel;
