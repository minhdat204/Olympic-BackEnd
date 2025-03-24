"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("questions", [
      // 🔹 4 câu Alpha
      {
        question_text: "Ngôn ngữ lập trình nào phổ biến nhất năm 2025?",
        question_intro: "Chọn một ngôn ngữ lập trình được sử dụng rộng rãi.",
        question_topic: "Lập trình",
        question_explanation:
          "Theo khảo sát của Stack Overflow, ngôn ngữ này được sử dụng nhiều nhất.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "Python",
        options: JSON.stringify([
          { "text": "Python", "media_url": null },
          { "text": "Java", "media_url": null },
          { "text": "C++", "media_url": null },
          { "text": "JavaScript", "media_url": null }
        ]),
        question_order: 1,
        timer: 30,
        time_left: 30,
        dificulty: "Alpha",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Hệ điều hành nào được phát triển bởi Microsoft?",
        question_intro: "Chọn hệ điều hành đúng.",
        question_topic: "Hệ điều hành",
        question_explanation: "Microsoft phát triển hệ điều hành phổ biến này.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "Windows",
        options: JSON.stringify([
          { "text": "Windows", "media_url": null },
          { "text": "Linux", "media_url": null },
          { "text": "macOS", "media_url": null },
          { "text": "Ubuntu", "media_url": null }
        ]),
        question_order: 2,
        timer: 30,
        time_left: 30,
        dificulty: "Alpha",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Hình ảnh này là logo của ngôn ngữ lập trình nào?",
        question_intro: "Chọn ngôn ngữ lập trình tương ứng với hình ảnh.",
        question_topic: "Lập trình",
        question_explanation:
          "Logo này thuộc về một ngôn ngữ lập trình nổi tiếng.",
        question_type: "Hình Ảnh",
        media_url: JSON.stringify("/uploads/questions/python_logo.png"),
        correct_answer: "Python",
        options: JSON.stringify([
          { "text": "Python", "media_url": null },
          { "text": "Java", "media_url": null },
          { "text": "C#", "media_url": null },
          { "text": "Ruby", "media_url": null }
        ]),
        question_order: 3,
        timer: 30,
        time_left: 30,
        dificulty: "Alpha",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text:
          "Nghe đoạn âm thanh và cho biết đây là âm thanh của hệ điều hành nào?",
        question_intro: "Lắng nghe và chọn đáp án chính xác.",
        question_topic: "Âm thanh",
        question_explanation:
          "Âm thanh này rất quen thuộc với người dùng máy tính.",
        question_type: "Âm Thanh",
        media_url: JSON.stringify("/uploads/questions/windows_xp_startup.mp3"),
        correct_answer: "Windows XP",
        options: JSON.stringify([
          { "text": "Windows XP", "media_url": null },
          { "text": "Windows 7", "media_url": null },
          { "text": "macOS", "media_url": null },
          { "text": "Linux", "media_url": null }
        ]),
        question_order: 4,
        timer: 30,
        time_left: 30,
        dificulty: "Alpha",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // 🔹 4 câu Beta
      {
        question_text: "Công nghệ nào sau đây liên quan đến bảo mật mạng?",
        question_intro: "Chọn công nghệ bảo mật phù hợp.",
        question_topic: "Bảo mật",
        question_explanation:
          "Công nghệ này giúp bảo vệ dữ liệu trên internet.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "SSL/TLS",
        options: JSON.stringify([
          { "text": "SSL/TLS", "media_url": null },
          { "text": "Blockchain", "media_url": null },
          { "text": "Wi-Fi", "media_url": null },
          { "text": "AI", "media_url": null }
        ]),
        question_order: 5,
        timer: 30,
        time_left: 30,
        dificulty: "Beta",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Phương pháp nào được dùng để mã hóa dữ liệu?",
        question_intro: "Chọn phương pháp mã hóa đúng.",
        question_topic: "Bảo mật",
        question_explanation: "Phương pháp này giúp dữ liệu an toàn hơn.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "AES",
        options: JSON.stringify([
          { "text": "AES", "media_url": null },
          { "text": "RSA", "media_url": null },
          { "text": "MD5", "media_url": null },
          { "text": "SHA-256", "media_url": null }
        ]),
        question_order: 6,
        timer: 30,
        time_left: 30,
        dificulty: "Beta",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Phần mềm nào là một trình duyệt web?",
        question_intro: "Chọn trình duyệt web chính xác.",
        question_topic: "Phần mềm",
        question_explanation: "Phần mềm này giúp truy cập internet.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "Google Chrome",
        options: JSON.stringify([
          { "text": "Google Chrome", "media_url": "/uploads/questions/chrome_logo.png" },
          { "text": "Microsoft Word", "media_url": "/uploads/questions/word_logo.png" },
          { "text": "Photoshop", "media_url": "/uploads/questions/photoshop_logo.png" },
          { "text": "Visual Studio Code", "media_url": "/uploads/questions/vscode_logo.png" }
        ]),
        question_order: 7,
        timer: 30,
        time_left: 30,
        dificulty: "Beta",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Hệ thống quản lý cơ sở dữ liệu nào là mã nguồn mở?",
        question_intro: "Chọn hệ thống phù hợp.",
        question_topic: "Cơ sở dữ liệu",
        question_explanation: "Hệ thống này được sử dụng phổ biến trên web.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "MySQL",
        options: JSON.stringify([
          { "text": "MySQL", "media_url": null },
          { "text": "SQL Server", "media_url": null },
          { "text": "Oracle", "media_url": null },
          { "text": "MongoDB", "media_url": null }
        ]),
        question_order: 8,
        timer: 30,
        time_left: 30,
        dificulty: "Beta",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // 🔹 4 câu RC
      {
        question_text: "Giao thức nào được sử dụng để truyền dữ liệu trên web?",
        question_intro: "Chọn giao thức chính xác.",
        question_topic: "Mạng máy tính",
        question_explanation:
          "Giao thức này giúp truyền dữ liệu trên internet.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "HTTP",
        options: JSON.stringify([
          { "text": "HTTP", "media_url": null },
          { "text": "FTP", "media_url": null },
          { "text": "SMTP", "media_url": null },
          { "text": "SSH", "media_url": null }
        ]),
        question_order: 9,
        timer: 30,
        time_left: 30,
        dificulty: "RC",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Công cụ nào giúp quản lý mã nguồn?",
        question_intro: "Chọn công cụ phù hợp.",
        question_topic: "Lập trình",
        question_explanation: "Công cụ này giúp quản lý và theo dõi thay đổi.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "Git",
        options: JSON.stringify([
          { "text": "Git", "media_url": null },
          { "text": "Docker", "media_url": null },
          { "text": "Jenkins", "media_url": null },
          { "text": "Kubernetes", "media_url": null }
        ]),
        question_order: 10,
        timer: 30,
        time_left: 30,
        dificulty: "RC",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Dịch vụ nào của Google cung cấp lưu trữ đám mây?",
        question_intro: "Chọn dịch vụ lưu trữ đám mây chính xác.",
        question_topic: "Điện toán đám mây",
        question_explanation:
          "Dịch vụ này của Google giúp lưu trữ và chia sẻ dữ liệu trực tuyến.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "Google Drive",
        options: JSON.stringify([
          { "text": "Google Drive", "media_url": null },
          { "text": "OneDrive", "media_url": null },
          { "text": "Dropbox", "media_url": null },
          { "text": "iCloud", "media_url": null }
        ]),
        question_order: 11,
        timer: 30,
        time_left: 30,
        dificulty: "RC",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_text: "Dịch vụ nào của Google cung cấp lưu trữ đám mây?",
        question_intro: "Chọn dịch vụ lưu trữ đám mây chính xác.",
        question_topic: "Điện toán đám mây",
        question_explanation:
          "Dịch vụ này của Google giúp lưu trữ và chia sẻ dữ liệu trực tuyến.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "Google Drive",
        options: JSON.stringify([
          { "text": "Google Drive", "media_url": null },
          { "text": "OneDrive", "media_url": null },
          { "text": "Dropbox", "media_url": null },
          { "text": "iCloud", "media_url": null }
        ]),
        question_order: 12,
        timer: 30,
        time_left: 30,
        dificulty: "RC",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // 🔹 1 câu Gold
      {
        question_text:
          "Công nghệ nào sau đây được sử dụng trong trí tuệ nhân tạo?",
        question_intro: "Chọn công nghệ AI chính xác.",
        question_topic: "AI",
        question_explanation: "Công nghệ này giúp máy tính học hỏi từ dữ liệu.",
        question_type: "Trắc Nghiệm",
        media_url: null,
        correct_answer: "Machine Learning",
        options: JSON.stringify([
          { "text": "Machine Learning", "media_url": null },
          { "text": "Cloud Computing", "media_url": null },
          { "text": "5G", "media_url": null },
          { "text": "Blockchain", "media_url": null }
        ]),
        question_order: 13,
        timer: 30,
        time_left: 30,
        dificulty: "Gold",
        match_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
