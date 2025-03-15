const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const role = require("../middleware/role");
const AuthController = require("../controllers/authController");
const validate = require("../middleware/validate"); // validate middleware
const { loginSchema, registerSchema } = require("../schemas/authSchema"); // Joi schema

//router.use(roleMiddleware);
router.get("/", AuthController.getJudges);
router.post("/login", validate(loginSchema), AuthController.login); // khi gửi request đến /login, nó sẽ kiểm tra validate trước
router.post("/register", validate(registerSchema), AuthController.register);
router.use(authMiddleware);
router.post("/logout", AuthController.logout);
router.patch("/:id", role("admin"), AuthController.updateUser);
module.exports = router;
