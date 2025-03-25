const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    SaleId: {
        type: String,
        required: true,
        unique: true
    },
    customerId: {
        type: String,
        required: true
    },
    propertyID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    VendorID: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sale', SaleSchema);