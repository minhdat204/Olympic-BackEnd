const express = require("express");
const multer = require("multer");

const router = express.Router();
const ContestantController = require("../controllers/contestantController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const {
  createContestantSchema,
  updateContestantSchema,
} = require("../schemas/contestantSchema");
const { route } = require("./auth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//  Đếm danh sách sinh viên xác nhận 1 ;
// Lấy danh sách thí sinh (public)
router.get("/", ContestantController.getContestants);
router.get(
  "/check-regroup/:match_id",
  ContestantController.checkRegroupPermission
);
router.get(
  "/get-group-by-match-id/:match_id",
  ContestantController.getGroupContestantByMatch
);
// Lấy chi tiết thí sinh (public)
router.get("/:id", ContestantController.getContestantById);

// Lay danh sach lop
router.get("/list/class", ContestantController.getListClass);

// download file mẫu
router.get("/download/excel", ContestantController.downloadExcel);

// API cập nhật thí sinh + gửi emit total thí sinh, thí sinh còn lại lên màn hình chiếu + emit dữ liệu thí sinh (status) lên màn hình điều khiển)
router.patch(
  "/emit/match/:match_id/contestant-status",
  ContestantController.updateContestantStatusAndEmit
);

// Lấy danh sách khoa
router.get("/list/class_year", ContestantController.getListClass_Year);
// Lấy danh sachs lớp thí sinh theo khóa
router.get("/class/:class_year", ContestantController.getClassByClass_Year);

// DAT: Lấy danh sách thí sinh theo match
router.get("/matches/:match_id", ContestantController.getContestantsByMatchId);

// DAT: nhập điểm và lấy danh sách thí sinh được cứu (status = "xác nhân 2")
router.post(
  "/matches/:match_id/rescue",
  ContestantController.getRescueContestants
);

// DAT: Cập nhật trạng thái thí sinh được cứu hàng loạt
router.patch(
  "/matches/:match_id/rescue",
  ContestantController.updateRescueContestants
);

// DAT: lấy mảng id thí sinh được cứu từ db (bảng match: thuộc tính rescue_1, rescue_2)
router.get(
  "/matches/:match_id/rescue/:rescue_number",
  ContestantController.getRescueContestantsInDb
);

// DAT: cập nhật trạng thái thí sinh hàng loạt
router.patch(
  "/matches/:match_id/status-bulk",
  ContestantController.updateContestantsBulk
);
// DAT: cập nhật trạng thái thí sinh "Được cứu" hàng loạt thành "Đang thi"
router.patch(
  "/matches/:match_id/rescued-to-competing",
  ContestantController.updateRescuedContestantsToCompeting
);

// DAT: Tính số lượng thí sinh cần được cứu
router.post(
  "/matches/:match_id/rescue/count",
  ContestantController.getRescueContestantTotal
);


// Donwload danh sach excle
router.get(
  "/download/Excel/Match/:match_id",
  ContestantController.downloadExcelMatch
);

router.get("/match/total/:match_id", ContestantController.getContestantTotal);
// DAT: API lấy tổng số thí sinh theo trạng thái (status = "xác nhận 2")
router.get(
  "/matches/:match_id/eliminated/count",
  ContestantController.getContestantTotalByStatus
);

//  Lấy thông tin thí sinh win gold

router.get("/gold/:match_id", ContestantController.getContestantByGoldMatch);
// Câp nhật group thí sinh , theo lớp m ,match

router.post("/list/classes", ContestantController.getListContestantsByClass);

router.patch(
  "/update/class/match",
  ContestantController.updateContestantGroupByClass
);

// DAT: API lấy total thí sinh và thí sinh còn lại trong trận hiện tại
router.get(
  "/matches/:match_id/total",
  ContestantController.getContestantTotalAndRemaining
);

// DAT: lấy ds thí sinh dang thi
router.get(
  "/matches/:match_id/contestant",
  ContestantController.getCompetingContestants
);

// Long create Answers
/**
 * Các route dưới đây cần xác thựccontestants
 *  */
router.get(
  "/judge-match/:judge_id/:match_id",
  // role("judge"),
  ContestantController.getContestantByJudgeAndMatch
);
router.post(
  "/upload/excel",
  upload.single("file"),
  ContestantController.uploadExcel
);
router.use(auth);
// Chi danh sách thí sinh theo classclass

// Tạo thí sinh mới (admin)

// cập nhât group thí sinh theo match
router.patch(
  "/update/group",
  role("admin"),
  ContestantController.updateContestantGroup
);
router.post(
  "/",
  role("admin"),
  validate(createContestantSchema),
  ContestantController.createContestant
);

// Cập nhật thí sinh (admin) - chỉ cập nhật những trường được gửi lên
router.patch(
  "/:id",
  role("admin"),
  validate(updateContestantSchema),
  ContestantController.updateContestant
);

// Cập nhật trạng thái thí sinh (admin hoặc judge)
router.patch("/:id/status", ContestantController.updateContestantStatus);

// Xóa thí sinh (admin)
router.delete("/:id", role("admin"), ContestantController.deleteContestant);

// lấy danh sách thí sinh theo group dựa vào judge_id và match_id (lấy tên group, tên trận đấu...)

module.exports = router;
