const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

exports.getAll = async (req, res) => {
  try {
    const admins = await Admin.getAllAdmins();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const admin = await Admin.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { username, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const admin = await Admin.createAdmin(username, password_hash);
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { username, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const admin = await Admin.updateAdmin(req.params.id, username, password_hash);
    if (!admin) return res.status(404).json({ error: 'Not found' });
    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Admin.deleteAdmin(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
