const express = require('express');
const router = express.Router();
const mRequestController = require('../Controllers/mRequestController');

// Routes
router.post('/', mRequestController.createmRequest);
router.get('/', mRequestController.getAllmRequests);
router.get('/:id', mRequestController.getmRequestById);
router.put('/:id', mRequestController.updatemRequest);
router.delete('/:id', mRequestController.deletemRequest);

module.exports = router;