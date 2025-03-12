const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { questionSchema } = require("../schemas/questionSchema");
const validate = require("../middleware/validate");
router.get("/", QuestionController.getQuestions);
router.get("/:id", QuestionController.getQuestionById);
router.use(auth);
router.post(
  "/",
  role("admin"), // role("admin") middleware
  validate(questionSchema), // validate middleware
  QuestionController.createQuestion
);
router.patch(
  "/:id",
  role("admin"),
  validate(questionSchema),
  QuestionController.updateQuestions
);
router.delete("/:id", role("admin"), QuestionController.deleteQuestion);
module.exports = router;
