const express = require("express");
const router = express.Router();
const match_contestantsController = require("../controllers/match_contestantsController");
router.get("/", match_contestantsController.getMatchContestants);
router.get("/:id", match_contestantsController.getMatchContestant);

// Cập nhật trang thái thí , trong tài
router.patch(
  "/emit/judge_id/status/:id",
  match_contestantsController.updateMatchContestantsJudge
);
router.get("/list/status", match_contestantsController.getListStatus);

router.delete("/:id", match_contestantsController.deleteMatch);
router.post("/", match_contestantsController.createMatchContestants);
router.post(
  "/list/match",
  match_contestantsController.getListContestantsByMatch
);
router.patch(
  "/update/contestants/match",
  match_contestantsController.updateContestantGroupByMatch
);
module.exports = router;
