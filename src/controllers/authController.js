const { AuthService } = require("../services/authService");

class AuthController {
  static async login(req, res) {
    try {
      const { usernameOrEmail, password } = req.body; // Lấy username và password từ body
      const { token, user } = await AuthService.login(
        usernameOrEmail,
        password
      ); // Gọi hàm login từ AuthService
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      res.status(201).json({
        user: { id: user.id, username: user.username, role: user.role },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  static async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const result = await AuthService.logout(token);
      res.json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
  static async getJudges(req, res) {
    try {
      const judge = await AuthService.getJudges();
      res.json({ judge: judge });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async updateUser(req, res) {
    try {
      const user = await AuthService.updateUser(req.params.id, req.body);
      res.json({ judge: user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
