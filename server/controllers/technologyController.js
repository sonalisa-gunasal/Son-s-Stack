const Technology = require('../models/technologyModel');

exports.getAll = async (req, res) => {
  try {
    const technologies = await Technology.getAllTechnologies();
    res.json(technologies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const technology = await Technology.getTechnologyById(req.params.id);
    if (!technology) return res.status(404).json({ error: 'Not found' });
    res.json(technology);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, category_id, description } = req.body;
    const technology = await Technology.createTechnology(name, category_id, description);
    res.status(201).json(technology);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, category_id, description } = req.body;
    const technology = await Technology.updateTechnology(req.params.id, name, category_id, description);
    if (!technology) return res.status(404).json({ error: 'Not found' });
    res.json(technology);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Technology.deleteTechnology(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
