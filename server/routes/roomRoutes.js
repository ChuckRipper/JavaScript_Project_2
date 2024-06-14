const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, roomController.createRoom);
router.post('/join', authMiddleware, roomController.joinRoom);
router.get('/:roomId', authMiddleware, roomController.getRoom);

module.exports = router;
