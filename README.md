# 🏆 Olympic Back-End App

Olympic Back-End App là một ứng dụng back-end được xây dựng bằng Node.js và Express.js, sử dụng MySQL làm cơ sở dữ liệu và hỗ trợ WebSocket thông qua Socket.io. Ứng dụng cung cấp API phục vụ cho hệ thống Olympic, bao gồm quản lý người dùng, xác thực, lưu trữ dữ liệu, và giao tiếp thời gian thực.

## 📌 Công nghệ/Thư viện sử dụng
- **Node.js**: Môi trường runtime cho JavaScript.
- **Express.js** (v4.21.2): Framework để xây dựng API nhanh và linh hoạt.
- **MySQL2** (v3.13.0) + **Sequelize** (v6.37.6): Hệ quản trị cơ sở dữ liệu quan hệ và ORM.
- **Sequelize-CLI** (v6.6.2): Công cụ command line cho Sequelize (dev).
- **Redis** (v4.7.0): Lưu trữ cache và xử lý phiên.
- **Socket.io** (v4.8.1): Hỗ trợ giao tiếp thời gian thực (WebSocket).
- **JWT (jsonwebtoken)** (v9.0.2): Xác thực người dùng.
- **bcryptjs** (v3.0.2): Hash mật khẩu.
- **dotenv** (v16.4.7): Quản lý biến môi trường.
- **Joi** (v17.13.3): Thư viện xác thực dữ liệu.
- **CORS** (v2.8.5): Hỗ trợ Cross-Origin Resource Sharing.
- **Nodemon** (v3.1.9): Công cụ tự động khởi động lại server khi có thay đổi (dev).

## 🚀 Cài đặt

### 1️⃣ Yêu cầu hệ thống
- **Node.js** (>= 14.x)
- **MySQL** (Cài đặt và chạy MySQL server)
- **Redis** (Tùy chọn, nếu sử dụng caching)

### 2️⃣ Cấu hình môi trường
Tạo tệp `.env` trong thư mục gốc và thêm các biến môi trường:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=olympic_db
JWT_SECRET=your_secret_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 3️⃣ Cài đặt package
Chạy lệnh sau để cài đặt tất cả dependencies:

```
npm install
```

## 🎯 Chạy ứng dụng

```
npm start
```
