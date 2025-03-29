const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { questionSchema } = require("../schemas/questionSchema");
const validate = require("../middleware/validate");
const fileUpload = require('express-fileupload');

// Middleware cho upload file
router.use(fileUpload({
  // limits: { fileSize: 500 * 1024 * 1024 },
  createParentPath: true
}));

// lấy danh sách độ khóa
router.get("/list/dificultys", QuestionController.getListDificulty);

// lấy danh sách loại câu hỏi
router.get("/list/question-types", QuestionController.getListQuestionTypes);

// lấy danh sách lại câu trả lời
router.get("/list/correct-answer-types", QuestionController.getListCorrectAnswerTypes);

router.get("/", QuestionController.getQuestions);

// lấy danh sách câu hỏi theo trận đấu
router.get("/match/:id", QuestionController.getQuestionsByMatch);
// lấy chi tiết câu hỏi theo trận đấu
router.get("/:question_order/match/:match_id", QuestionController.getQuestionByMatch);
// gọi emit socket để gửi câu hỏi cho màn hình trình chiếu
router.get("/emit/:question_order/match/:match_id", QuestionController.emitQuestionByMatch);
// current question để load
router.get("/current/:match_id", QuestionController.getCurrentQuestion);
//  Cập nhật cột time_left thành giá trị của cột timer trong bảng question
router.get("/update-time-left/:question_id", QuestionController.updateQuestionTimeLeft);

router.get("/:id", QuestionController.getQuestionById);
router.use(auth);
router.post(
  "/",
  role("admin"), // role("admin") middleware
  // Không validate ở đây để cho phép FormData với files
  QuestionController.createQuestion
);
router.patch("/:id", role("admin"), QuestionController.updateQuestions);
router.put(
  "/:id",
  role("admin"),
  // Không validate ở đây để cho phép FormData với files
  QuestionController.updateQuestions
);
router.delete("/:id", role("admin"), QuestionController.deleteQuestion);


// Trong routes/questions.js
router.get("/available-orders/:match_id", QuestionController.getAvailableQuestionOrders);


module.exports = router;