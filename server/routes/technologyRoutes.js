const express = require('express');
const router = express.Router();
const technologyController = require('../controllers/technologyController');

router.get('/', technologyController.getAll);
router.get('/:id', technologyController.getById);
router.post('/', technologyController.create);
router.put('/:id', technologyController.update);
router.delete('/:id', technologyController.delete);

module.exports = router;
