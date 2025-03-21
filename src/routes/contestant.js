const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const router = express.Router();
const ContestantController = require("../controllers/contestantController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const {
  createContestantSchema,
  updateContestantSchema,
} = require("../schemas/contestantSchema");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Lấy danh sách thí sinh theo class ,class_year, status ,
router.get("/list", ContestantController.getListContestants);
// Lấy danh sách thí sinh (public)
router.get("/", ContestantController.getContestants);

// Lấy chi tiết thí sinh (public)
router.get("/:id", ContestantController.getContestantById);

// Lay danh sach trang thai
router.get("/list/status", ContestantController.getListStatus);

// Lay danh sach lop
router.get("/list/class", ContestantController.getListClass);

// download file mẫu
router.get("/download/excel", ContestantController.downloadExcel);

// API cập nhật thí sinh + gửi emit total thí sinh, thí sinh còn lại lên màn hình chiếu + emit dữ liệu thí sinh (status) lên màn hình điều khiển)
router.patch("/emit/match/:match_id/contestant-status", ContestantController.updateContestantStatusAndEmit);

// Lấy danh sách khoa
router.get("/list/class_year", ContestantController.getListClass_Year);
// Lấy danh sachs lớp thí sinh theo khóa
router.get("/class/:class_year", ContestantController.getClassByClass_Year);

// Câp nhật group thí sinh , theo lớp m ,match

/**
 * Các route dưới đây cần xác thực
 *  */
router.use(auth);
// Chi danh sách thí sinh theo classclass
router.patch(
  "/update/class/match",
  ContestantController.updateContestantGroupByClass
);
// Tạo thí sinh mới (admin)
router.post(
  "/upload/excel",
  upload.single("file"),
  role("admin"),
  ContestantController.uploadExcel
);
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
router.get(
  "/judge-match/:judge_id/:match_id",
  role("judge"),
  ContestantController.getContestantByJudgeAndMatch
);

module.exports = router;
