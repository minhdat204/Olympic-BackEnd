const express = require("express");
const router = express.Router();
const MatchController = require("../controllers/matchController");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const AuthMiddleware = require("../middleware/auth"); // Thêm middleware xác thực
const { matchSchema } = require("../schemas/matchSchema");

router.get("/", AuthMiddleware, MatchController.getMatches);
router.get("/:id", AuthMiddleware, MatchController.getMatchById);
router.post(
  "/",

  MatchController.createMatch
);
router.patch(
  "/:id/status",
  AuthMiddleware,
  role("admin"),
  validate(matchSchema),
  MatchController.updateMatchStatus
);
router.delete(
  "/:id",
  AuthMiddleware,
  role("admin"),
  MatchController.deleteMatch
);

module.exports = router;
