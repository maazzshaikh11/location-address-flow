const express = require('express');
const router = express.Router();

let addresses = [];

// Get all addresses
router.get('/', (req, res) => {
    res.json(addresses);
});

// Add a new address
router.post('/', (req, res) => {
    const address = req.body;
    address.id = Date.now();
    addresses.push(address);
    res.status(201).json(address);
});

// Update an address
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedAddress = req.body;
    addresses = addresses.map(addr => (addr.id === parseInt(id) ? updatedAddress : addr));
    res.json(updatedAddress);
});

// Delete an address
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    addresses = addresses.filter(addr => addr.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;