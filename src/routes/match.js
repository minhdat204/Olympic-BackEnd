const express = require("express");
const router = express.Router();
const MatchController = require("../controllers/matchController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
// Thêm middleware xác thực
const { matchSchema } = require("../schemas/matchSchema");

router.get("/", MatchController.getMatches);
router.get("/list/rounds", MatchController.getListRounds);
router.get("/list/match/:round_name", MatchController.getMatchByIdRounds);
router.get("/list/status", MatchController.getListStatus);
router.get("/:id", MatchController.getMatchById);

router.post(
  "/",

  validate(matchSchema),
  MatchController.createMatch
);
router.put(
  "/:id",
  validate(matchSchema),
  MatchController.updateMatch
);
router.patch("/:id", MatchController.updateMatchBy);
// Update thí sinh gold
router.patch("/gold/:id", MatchController.UpdateWinGold);
router.delete("/:id", MatchController.deleteMatch);

module.exports = router;
