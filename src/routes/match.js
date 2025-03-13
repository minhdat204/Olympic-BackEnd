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
router.get("/list/status", MatchController.getListSatatus);
router.get("/:id", MatchController.getMatchById);
router.use(auth);
router.post(
  "/",
  role("admin"),
  validate(matchSchema),
  MatchController.createMatch
);
router.put(
  "/:id",
  role("admin"),
  validate(matchSchema),
  MatchController.updateMatch
);
router.patch("/:id", role("admin"), MatchController.updateMatchBy);
router.delete("/:id", role("admin"), MatchController.deleteMatch);

module.exports = router;
