const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Mongoose model

// GET /items — Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from MongoDB
        res.json(items); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
});

// GET /items/:id — Get a single item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id); // Find item by MongoDB ID
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching item' });
    }
});

// POST /items — Create a new item
router.post('/', async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save item' });
    }
});

// PUT /items/:id — Update an item by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true } // Return the updated item
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE /items/:id — Delete an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted', item: deletedItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
