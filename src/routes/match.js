const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/matchController');
const AuthMiddleware = require('../middleware/auth');

router.get('/', MatchController.getMatches);
router.get('/:id', MatchController.getMatchById);
router.post('/', AuthMiddleware, MatchController.createMatch);
router.patch('/:id/status', MatchController.updateMatchStatus);

module.exports = router;