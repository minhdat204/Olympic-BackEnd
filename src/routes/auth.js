const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const AuthController = require('../controllers/authController');
const validate = require('../middleware/validate'); // validate middleware
const { loginSchema } = require('../schemas/authSchema');  // Joi schema

//router.use(roleMiddleware);
router.post('/login', validate(loginSchema), AuthController.login); // khi gửi request đến /login, nó sẽ kiểm tra validate trước
router.post('/register', AuthController.register);
router.post('/logout', authMiddleware, AuthController.logout);

module.exports = router;