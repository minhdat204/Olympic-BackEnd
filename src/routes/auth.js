const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const AuthController = require('../controllers/authController');

//router.use(roleMiddleware);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', authMiddleware, AuthController.logout);

module.exports = router;