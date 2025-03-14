const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { questionSchema } = require("../schemas/questionSchema");
const validate = require("../middleware/validate");
router.get("/list/dificultys", QuestionController.getListDificulty);
router.get("/list/question_type", QuestionController.getListQuestionType);
router.get("/", QuestionController.getQuestions);

// lấy danh sách câu hỏi theo trận đấu
router.get("/match/:id", QuestionController.getQuestionsByMatch);
// lấy chi tiết câu hỏi theo trận đấu
router.get("/:question_order/match/:match_id", QuestionController.getQuestionByMatch);
// gọi emit socket để gửi câu hỏi cho màn hình trình chiếu
router.get("/emit/:question_order/match/:match_id", QuestionController.emitQuestionByMatch);

router.get("/:id", QuestionController.getQuestionById);
router.use(auth);
router.post(
  "/",
  role("admin"), // role("admin") middleware
  validate(questionSchema), // validate middleware
  QuestionController.createQuestion
);
router.patch("/:id", role("admin"), QuestionController.updateQuestions);
router.put(
  "/:id",
  role("admin"),
  validate(questionSchema),
  QuestionController.updateQuestions
);
router.delete("/:id", role("admin"), QuestionController.deleteQuestion);
module.exports = router;
