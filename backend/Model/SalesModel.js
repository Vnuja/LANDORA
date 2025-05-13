const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    SaleId: {
        type: String,
        required: false,
        unique: true
    },
    customerId: {
        type: String,
        required: false
    },
    propertyID: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    VendorID: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Sale', SaleSchema);