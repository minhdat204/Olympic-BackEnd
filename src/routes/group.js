const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const { createGroupSchema, updateGroupSchema, addContestantsSchema } = require('../schemas/groupSchema');

// Các routes public
router.get('/', GroupController.getGroups);
router.get('/:id', GroupController.getGroupById);
router.get('/:id/contestants', GroupController.getContestantsByGroupId);

// Các routes cần xác thực
router.use(auth);

// Tạo nhóm mới (admin)
router.post('/', 
  role('admin'), 
  validate(createGroupSchema),
  GroupController.createGroup
);

// Cập nhật nhóm (admin)
router.put('/:id',
  role('admin'),
  validate(updateGroupSchema),
  GroupController.updateGroup
);

// Xóa nhóm (admin)
router.delete('/:id',
  role('admin'),
  GroupController.deleteGroup
);

// Thêm thí sinh vào nhóm (admin hoặc judge phụ trách nhóm đó)
router.post('/:id/contestants',
  validate(addContestantsSchema),
  GroupController.addContestantsToGroup
);

// Xóa thí sinh khỏi nhóm (admin hoặc judge phụ trách nhóm đó)
router.delete('/:id/contestants/:contestantId',
  GroupController.removeContestantFromGroup
);

module.exports = router;