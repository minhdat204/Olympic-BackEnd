const express = require('express');
const router = express.Router();
const ContestantController = require('../controllers/contestantController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const { createContestantSchema, updateContestantSchema } = require('../schemas/contestantSchema');

// Lấy danh sách thí sinh (public)
router.get('/', ContestantController.getContestants);

// Lấy chi tiết thí sinh (public)
router.get('/:id', ContestantController.getContestantById);

// Các route dưới đây cần xác thực
router.use(auth);

// Tạo thí sinh mới (admin)
router.post('/', 
  role('admin'), 
  validate(createContestantSchema),
  ContestantController.createContestant
);

// Cập nhật thí sinh (admin)
router.put('/:id',
  role('admin'),
  validate(updateContestantSchema),
  ContestantController.updateContestant
);

// Cập nhật trạng thái thí sinh (admin hoặc judge)
router.patch('/:id/status',
  ContestantController.updateContestantStatus
);

// Xóa thí sinh (admin)
router.delete('/:id',
  role('admin'),
  ContestantController.deleteContestant
);

module.exports = router;