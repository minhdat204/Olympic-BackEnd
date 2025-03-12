const express = require('express');
const router = express.Router();
const VideoSubmissionController = require('../controllers/videoSubmissionController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const validate = require('../middleware/validate');
const { createVideoSubmissionSchema, updateVideoSubmissionSchema } = require('../schemas/videoSubmissionSchema');

// Các routes public
router.get('/', VideoSubmissionController.getVideoSubmissions);
router.get('/type/:type', VideoSubmissionController.getVideoSubmissionsByType);
router.get('/:id', VideoSubmissionController.getVideoSubmissionById);

// Các routes cần xác thực
router.use(auth);

// Các routes dành cho admin
router.post('/', 
  role('admin'), 
  validate(createVideoSubmissionSchema),
  VideoSubmissionController.createVideoSubmission
);

router.put('/:id',
  role('admin'),
  validate(updateVideoSubmissionSchema),
  VideoSubmissionController.updateVideoSubmission
);

router.delete('/:id',
  role('admin'),
  VideoSubmissionController.deleteVideoSubmission
);

module.exports = router;