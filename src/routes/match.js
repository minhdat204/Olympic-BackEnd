const express = require("express");
const router = express.Router();
const MatchController = require("../controllers/matchController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
// Thêm middleware xác thực
const { matchSchema } = require("../schemas/matchSchema");

router.get("/", MatchController.getMatches);
router.get("/:id", MatchController.getMatchById);
router.use(auth);
router.post(
  "/",
  role("admin"),
  validate(matchSchema),
  MatchController.createMatch
);
router.patch(
  "/:id",
  role("admin"),
  validate(matchSchema),
  MatchController.updateMatch
);
router.delete("/:id", role("admin"), MatchController.deleteMatch);

module.exports = router;
