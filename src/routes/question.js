const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/questionController");
const AuthMiddleware = require("../middleware/auth");

router.get("/", AuthMiddleware, QuestionController.createquestion);
router.get("/:id", AuthMiddleware, QuestionController.getquestionById);
router.post("/", AuthMiddleware, QuestionController.createquestion);
router.patch("/:id/", AuthMiddleware, QuestionController.updateMatchStatus);
module.exports = router;
