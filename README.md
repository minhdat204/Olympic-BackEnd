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

## 📂 Cấu trúc thư mục

```
olympic-back-end/
├── node_modules/        # Thư mục chứa các dependencies
├── src/                 # Mã nguồn chính
│   ├── config/          # Cấu hình ứng dụng
│   │   └── config.js    # Cấu hình database
│   ├── controllers/     # Xử lý logic request/response
│   │   ├── authController.js
│   │   └── matchController.js
│   ├── middleware/      # Middleware xử lý request
│   │   ├── auth.js      # Xác thực JWT
│   │   ├── role.js      # Kiểm tra vai trò
│   │   └── validate.js  # Xác thực dữ liệu với Joi
│   ├── migrations/      # Migration database
│   │   └── 20250306071939-create-user.js
│   ├── models/          # Định nghĩa model Sequelize
│   │   ├── answer.js
│   │   ├── contestant.js
│   │   ├── group.js
│   │   ├── index.js     # Kết nối và khởi tạo models
│   │   ├── match.js
│   │   ├── question.js
│   │   ├── question_package.js
│   │   ├── question_package_detail.js
│   │   ├── round.js
│   │   ├── score_log.js
│   │   ├── user.js
│   │   └── video_submission.js
│   ├── routes/          # Định nghĩa API routes
│   │   ├── auth.js
│   │   └── match.js
│   ├── schemas/         # Schema xác thực Joi
│   │   └── authSchema.js
│   ├── seeders/         # Dữ liệu mẫu
│   │   └── 20250306072221-demo-user.js
│   ├── services/        # Business logic
│   │   ├── authService.js
│   │   └── matchService.js
│   ├── socketEmitters/  # Phát sự kiện WebSocket
│   │   └── matchEmitter.js
│   ├── socketHandlers/  # Xử lý sự kiện WebSocket
│   │   └── matchHandler.js
│   ├── server.js        # Entry point của ứng dụng
│   ├── socketManager.js # Quản lý các kết nối Socket.io
│   └── test-connection.js # Script kiểm tra kết nối database
├── .env                 # Biến môi trường (không được commit)
├── .env.example         # Mẫu biến môi trường
├── .gitignore           # Loại trừ file khỏi Git
├── package.json         # Thông tin project và dependencies
└── README.md            # Tài liệu hướng dẫn
```

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
