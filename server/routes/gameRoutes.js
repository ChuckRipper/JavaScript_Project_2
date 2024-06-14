const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, gameController.addScore);
router.put('/:id', authMiddleware, gameController.updateScore);
router.get('/', gameController.getScores);
router.delete('/:id', authMiddleware, gameController.deleteScore);

module.exports = router;

