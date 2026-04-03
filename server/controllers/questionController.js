const Question = require('../models/questionModel');

exports.getAll = async (req, res) => {
  try {
    const questions = await Question.getAllQuestions();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const question = await Question.getQuestionById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByTechnology = async (req, res) => {
  try {
    const questions = await Question.getQuestionsByTechnology(req.params.technologyId);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { technology_id, question, answer } = req.body;
    const q = await Question.createQuestion(technology_id, question, answer);
    res.status(201).json(q);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const q = await Question.updateQuestion(req.params.id, question, answer);
    if (!q) return res.status(404).json({ error: 'Not found' });
    res.json(q);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Question.deleteQuestion(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
