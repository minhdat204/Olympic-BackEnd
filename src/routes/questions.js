const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController");
const AuthMiddleware = require("../middleware/auth");
const role = require("../middleware/role");
const { questionSchema } = require("../schemas/questionSchema");
const validate = require("../middleware/validate");
router.get("/", role("admin"), AuthMiddleware, QuestionController.getQuestions);
router.get("/:id", AuthMiddleware, QuestionController.getMatchById);
router.post(
  "/",
  role("admin"),
  validate(questionSchema),
  AuthMiddleware,
  QuestionController.createQuestion
);
router.patch(
  "/:id",
  role("admin"),
  validate(questionSchema),
  AuthMiddleware,
  QuestionController.updateMatchStatus
);
router.delete(
  "/:id",
  role("admin"),
  AuthMiddleware,
  QuestionController.deleteMatch
);
module.exports = router;
