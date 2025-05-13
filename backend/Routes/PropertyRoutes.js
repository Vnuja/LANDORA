const express = require('express');
const router = express.Router();
const PropertiesController = require('../Controllers/PropertiesController');

// Routes
router.post('/', PropertiesController.createProperty);
router.get('/', PropertiesController.getAllProperties);
router.get('/:id', PropertiesController.getPropertyById);
router.put('/:id', PropertiesController.updateProperty);
router.delete('/:id', PropertiesController.deleteProperty);

module.exports = router;