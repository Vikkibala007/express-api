const express = require('express');
const router = express.Router();
const Country = require('../models/country'); // Import model

// GET all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single country by ID
router.get('/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ message: 'Country not found' });
    res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new country
router.post('/', async (req, res) => {
  const country = new Country({
    name: req.body.name,
    code: req.body.code
  });

  try {
    const newCountry = await country.save();
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a country
router.put('/:id', async (req, res) => {
  try {
    const updated = await Country.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, code: req.body.code },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Country not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a country
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Country.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Country not found' });
    res.json({ message: 'Country deleted', country: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
