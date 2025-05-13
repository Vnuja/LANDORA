const Property = require('../Model/PropertyModel');

const generatePropertyId = async () => {
    try {
        const lastProperty = await Property.findOne().sort({ PropertyId: -1 }).limit(1);
        const lastId = lastProperty ? parseInt(lastProperty.PropertyId.replace('P', ''), 10) : 0;
        const newId = `P${(lastId + 1).toString().padStart(3, '0')}`;
        return newId;
    } catch (error) {
        throw new Error('Error generating Property ID');
    }
};


exports.createProperty = async (req, res) => {
    try {
        const { name, address, images, size, price, status } = req.body;

        const PropertyId = await generatePropertyId();

        const newProperty = new Property({
            PropertyId,
            name,
            address,
            images,
            size,
            price,
            status
        });

        await newProperty.save();

        res.status(201).json({
            message: 'Property created successfully',
            property: newProperty
        });
    } catch (error) {
        console.error('Create Property Error:', error);
        res.status(500).json({ message: 'Error creating property', error: error.message });
    }
};


// Get all Properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving properties', error: error.message });
    }
};

// Get a property by MongoDB _id
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving property', error: error.message });
    }
};

// Update property by ID
exports.updateProperty = async (req, res) => {
    try {
        const { name, address, images, size, price, status } = req.body;

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            { name, address, images, size, price, status },
            { new: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
    } catch (error) {
        res.status(500).json({ message: 'Error updating property', error: error.message });
    }
};

// Delete property by ID
exports.deleteProperty = async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property', error: error.message });
    }
};
