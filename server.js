const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let addresses = [];

// Get all addresses
app.get('/addresses', (req, res) => {
    res.json(addresses);
});

// Add a new address
app.post('/addresses', (req, res) => {
    const address = req.body;
    address.id = Date.now();
    addresses.push(address);
    res.status(201).json(address);
});

// Update an address
app.put('/addresses/:id', (req, res) => {
    const { id } = req.params;
    const updatedAddress = req.body;
    addresses = addresses.map(addr => (addr.id === parseInt(id) ? updatedAddress : addr));
    res.json(updatedAddress);
});

// Delete an address
app.delete('/addresses/:id', (req, res) => {
    const { id } = req.params;
    addresses = addresses.filter(addr => addr.id !== parseInt(id));
    res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));