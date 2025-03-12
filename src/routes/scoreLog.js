const express = require('express');
const router = express.Router();
const ScoreLogController = require('../controllers/scoreLogController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const { createScoreLogSchema, updateScoreLogSchema } = require('../schemas/scoreLogSchema');

// Các routes public
router.get('/', ScoreLogController.getScoreLogs);
router.get('/:id', ScoreLogController.getScoreLogById);
router.get('/contestant/:contestantId', ScoreLogController.getScoreLogsByContestantId);
router.get('/match/:matchId', ScoreLogController.getScoreLogsByMatchId);
router.get('/match/:matchId/scoreboard', ScoreLogController.getScoreboardByMatch);
router.get('/contestant/:contestantId/match/:matchId/total', ScoreLogController.calculateTotalScore);

// Các routes cần xác thực
router.use(auth);

// Tạo score log mới (admin hoặc judge)
router.post('/', 
  validate(createScoreLogSchema),
  ScoreLogController.createScoreLog
);

// Cập nhật score log (admin)
router.put('/:id',
  role('admin'),
  validate(updateScoreLogSchema),
  ScoreLogController.updateScoreLog
);

// Xóa score log (admin)
router.delete('/:id',
  role('admin'),
  ScoreLogController.deleteScoreLog
);

module.exports = router;