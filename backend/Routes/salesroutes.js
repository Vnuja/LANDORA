const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/SalesController'); // Ensure folder name is correct

// Routes
router.post('/', SalesController.createSale);
router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.getSaleById); // Fixed function name to match SalesController.js
router.put('/:id', SalesController.updateSale);
router.delete('/:id', SalesController.deleteSale);

module.exports = router;
