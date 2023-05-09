const express = require('express');
const characterController = require('../controllers/characterController');
const characterBuildController = require('../controllers/characterBuildController');

const router = express.Router();

router.route('/').get(characterController.getAllCharacters);
router.route('/:character').get(characterController.getCharacterInfo);

// router
//   .route('/build/:character')
//   .get(characterBuildController.getCharacterBuild);

module.exports = router;
