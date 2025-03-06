const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const blacklistedTokens = new Set(); // Tạo một set để lưu token đã logout

class AuthService {
    // Hàm login
    static async login(username, password) {
        const user = await User.findOne({ where: { username } });  // Tìm user theo username
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials'); // Nếu không tìm thấy user hoặc password không đúng thì trả về lỗi
        }
        // Tạo token với id và role của user
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return { token, user };
    }
    // Hàm register
    static async register(username, email, password) {
        const user = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10),
            role: 'judge',
        });
        return user;
    }
    // Hàm logout
    static async logout(token) {
        if (token) {
            blacklistedTokens.add(token);
        }
        return { message: 'Logged out' };
    }
}

module.exports = { AuthService, blacklistedTokens };