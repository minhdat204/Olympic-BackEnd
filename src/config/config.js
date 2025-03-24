require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: (msg) => {
            // Chỉ log thông báo lỗi, bỏ qua câu lệnh SQL
            if (msg.startsWith("Executing")) return;
            console.log(msg);
          },
    },
    test: {
        //...
    },
    production: {
        //...
    },
};
