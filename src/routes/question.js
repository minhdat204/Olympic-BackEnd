const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController");
const AuthMiddleware = require("../middleware/auth");
const role = require("../middleware/role");
const { questionSchema } = require("../schemas/questionSchema");
const validate = require("../middleware/validate");


router.get("/", AuthMiddleware, QuestionController.getQuestions);
router.get("/:id", AuthMiddleware, QuestionController.getQuestionById);
router.post(
  "/",
  role("admin"), // role("admin") middleware
  validate(questionSchema), // validate middleware
  AuthMiddleware,
  QuestionController.createQuestion
);
router.patch(
  "/:id",
  role("admin"),
  validate(questionSchema),
  AuthMiddleware,
  QuestionController.updateQuestionStatus
);
router.delete(
  "/:id",
  role("admin"),
  AuthMiddleware,
  QuestionController.deleteQuestion
);
module.exports = router;
