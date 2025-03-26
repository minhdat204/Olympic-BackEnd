const express = require("express");
const router = express.Router();
const VideoSubmissionController = require("../controllers/videoSubmissionController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");
const {
  createVideoSubmissionSchema,
  updateVideoSubmissionSchema,
} = require("../schemas/videoSubmissionSchema");
const multer = require("multer");
const path = require("path");

// Cấu hình multer để lưu file video
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads/videos"); // Đường dẫn tuyệt đối đến uploads/videos
    if (!require("fs").existsSync(uploadPath)) {
      require("fs").mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    //xử lý uniqueFile
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Chỉ hỗ trợ định dạng video MP4, MOV, AVI"));
  },
  // limits: { fileSize: 100 * 1024 * 1024 }, // Giới hạn 100MB
});
router.get("/emit/:match_id/:id", VideoSubmissionController.EmitVideoUrl);

// Các route public
router.get("/", VideoSubmissionController.getVideoSubmissions);
router.get("/type/:type", VideoSubmissionController.getVideoSubmissionsByType);
router.get("/:id", VideoSubmissionController.getVideoSubmissionById);

// Các route cần xác thực
router.use(auth);

// Các route dành cho admin
router.post(
  "/",
  role("admin"),
  upload.single("video"), // Nhận file từ field 'video' trong FormData
  validate(createVideoSubmissionSchema),
  VideoSubmissionController.createVideoSubmission
);

router.put(
  "/:id",
  role("admin"),
  upload.single("video"), // Hỗ trợ cập nhật file (tùy chọn)
  validate(updateVideoSubmissionSchema),
  VideoSubmissionController.updateVideoSubmission
);

router.delete(
  "/:id",
  role("admin"),
  VideoSubmissionController.deleteVideoSubmission
);

module.exports = router;
