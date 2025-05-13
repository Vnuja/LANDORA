const Sale = require('../Model/SalesModel');

// Generate sale ID with leading zeros (e.g., S001, S002)
const generateSaleId = async () => {
    const lastSale = await Sale.findOne().sort({ SaleId: -1 }).limit(1);
    const lastId = lastSale ? parseInt(lastSale.SaleId.replace('S', ''), 10) : 0;
    const newId = `S${(lastId + 1).toString().padStart(3, '0')}`;
    return newId;
};

// Create a new sale
exports.createSale = async (req, res) => {
    try {
        const { customerId, propertyID, name, buyerID, VendorID, price, status } = req.body;

        const SaleId = await generateSaleId(); // Generate new SaleId

        const newSale = new Sale({
            SaleId,
            customerId,
            propertyID,
            name,
            buyerID,
            VendorID,
            price,
            status
        });

        await newSale.save();

        res.status(201).json({
            message: 'Sale created successfully',
            sale: newSale
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating sale', error: error.message });
    }
};

// Get all sales
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving sales', error: error.message });
    }
};

// Get a sale by MongoDB _id
exports.getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving sale', error: error.message });
    }
};

// Update sale by ID
exports.updateSale = async (req, res) => {
    try {
        const { customerId, propertyID, name, buyerID, VendorID, price, status } = req.body;

        const updatedSale = await Sale.findByIdAndUpdate(
            req.params.id,
            { customerId, propertyID, name, buyerID, VendorID, price, status },
            { new: true }
        );

        if (!updatedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json({ message: 'Sale updated successfully', sale: updatedSale });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sale', error: error.message });
    }
};

// Delete sale by ID
exports.deleteSale = async (req, res) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(req.params.id);
        if (!deletedSale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sale', error: error.message });
    }
};
