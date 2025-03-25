const express = require("express");
const router = express.Router();
const match_contestantsController = require("../controllers/match_contestantsController");

router.get("/", match_contestantsController.getMatchContestants);
router.get("/:id", match_contestantsController.getMatchContestant);
router.patch("/:id", match_contestantsController.updateMatchContestants);
router.patch("/status/:id", match_contestantsController.updateMatchContestants);
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
router.delete("/delete-by-match/:match_id", match_contestantsController.deleteDividedGroup);

// Route mới để kiểm tra trạng thái chia nhóm
router.get("/check-divided/:match_id", match_contestantsController.checkDivided);

module.exports = router;