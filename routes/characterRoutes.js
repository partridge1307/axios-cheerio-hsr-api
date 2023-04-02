const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router();

router.route('/').get(characterController.getAllCharacters);

router.route('/:character').get(characterController.getCharacterInfo);

module.exports = router;
