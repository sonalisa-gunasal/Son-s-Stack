const Category = require('../models/categoryModel');

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error('Error in getAll categories:', err); // Log error
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await Category.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (err) {
    console.error('Error in getById category:', err); // Log error
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.createCategory(name, description);
    res.status(201).json(category);
  } catch (err) {
    console.error('Error in create category:', err); // Log error
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.updateCategory(req.params.id, name, description);
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (err) {
    console.error('Error in update category:', err); // Log error
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Category.deleteCategory(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error in delete category:', err); // Log error
    res.status(400).json({ error: err.message });
  }
};
