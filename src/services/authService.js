const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { use } = require("../routes/auth");

const blacklistedTokens = new Set(); // Tạo một set để lưu token đã logout

class AuthService {
  // Hàm login
  static async login(usernameOrEmail, password) {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Thông tin đăng nhập không chính xác");
    }

    // Tạo token với id và role của user
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    return { token, user };
  }
  // Hàm register
  static async register(username, email, password) {
    const user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role: "judge",
    });
    return user;
  }
  // Hàm logout
  static async logout(token) {
    if (token) {
      blacklistedTokens.add(token);
    }
    return { message: "Logged out" };
  }
  static async getJudges() {
    return User.findAll({
      where: { role: "judge" },
    });
  }
  static async updateUser(id, data) {
    {
      const user = await User.findByPk(id);
      if (!user) throw new Error("Không tìm thấy tài khoản");
      user.set(data);
      await user.save();
      return user;
    }
  }
}

module.exports = { AuthService, blacklistedTokens };
