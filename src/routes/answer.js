const express = require("express");
const router = express.Router();
const AnswerController = require("../controllers/answerController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const {
  createAnswerSchema,
  updateAnswerSchema,
} = require("../schemas/answerSchema");

// Các routes public
router.get("/", AnswerController.getAnswers);
router.get("/:id", AnswerController.getAnswerById);
router.get(
  "/contestant/:contestantId",
  AnswerController.getAnswersByContestantId
);
router.get("/question/:questionId", AnswerController.getAnswersByQuestionId);
router.get("/match/:matchId", AnswerController.getAnswersByMatchId);
router.get(
  "/stats/question/:questionId",
  AnswerController.getCorrectRateByQuestionId
);
router.get(
  "/stats/contestant/:contestantId",
  AnswerController.getCorrectRateByContestantId
);
router.get(
  "/stats/contestant/:contestantId/match/:matchId",
  AnswerController.getCorrectRateByContestantId
);
router.get("/stats/match/:matchId", AnswerController.getAnswersStatsByMatch);

//  Top 20 thí sinh
router.get("/top20/:match_id", AnswerController.getTop20byMatch);

// Lấy danh sách các thí sinh trả lời đúng ở câu số 12
router.get(
  "/correct-12/:match_id",
  AnswerController.getCorrectContestantsByQuestion
);
// Các routes cần xác thực
router.use(auth);

// Tạo câu trả lời mới (admin hoặc judge)
router.post("/", validate(createAnswerSchema), AnswerController.createAnswer);

// Cập nhật câu trả lời (admin)
router.put(
  "/:id",
  role("admin"),
  validate(updateAnswerSchema),
  AnswerController.updateAnswer
);

// Xóa câu trả lời (admin)
router.delete("/:id", role("admin"), AnswerController.deleteAnswer);

module.exports = router;
