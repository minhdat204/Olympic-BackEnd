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

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ msg: "Vui lòng nhập file" });
  }
  console.log("Đã nhập được file");
  const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
  const sheet = workbook.Sheets[sheetName];

  // Chuyển sheet thành JSON
  const data = xlsx.utils.sheet_to_json(sheet);

  console.log("📄 Dữ liệu trong file Excel:", data); // In ra console

  res.json({ message: "File processed successfully!", data });
});

// Lấy danh sách thí sinh (public)
router.get("/", ContestantController.getContestants);

// Lấy chi tiết thí sinh (public)
router.get("/:id", ContestantController.getContestantById);

// Lay danh sach trang thai
router.get("/list/status", ContestantController.getListStatus);

// Lay danh sach lop
router.get("/list/class", ContestantController.getListClass);

// lấy danh sách thí sinh theo judge_id và match_id (lấy tên group, tên trận đấu)
router.get("/judge-match/:judge_id/:match_id", ContestantController.getContestantByJudgeAndMatch);



/**
 * Các route dưới đây cần xác thực
 *  */ 
router.use(auth);

// Tạo thí sinh mới (admin)
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


module.exports = router;
