const { Question, Match } = require("../models");
const { Sequelize } = require("sequelize");
const fsPromises = require('fs').promises; // Dùng cho bất đồng bộ
const fs = require('fs'); // Dùng cho đồng bộ
const path = require('path');

// Thư mục uploads
const UPLOAD_DIR = path.join(__dirname, '../../uploads/questions');

// Đảm bảo thư mục upload tồn tại (sử dụng fs đồng bộ để giữ phong cách cũ)
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

module.exports = {
    // tạo câu hỏi mới với xử lý file media
    async createQuestion(questionsData, files) {
        try {
            // Xử lý files media nếu có
            const mediaUrls = [];
            let correctAnswerUrl = null;

            // Xử lý media cho câu hỏi (media_url)
            if (files) {
                // Duyệt qua các file được upload
                for (let i = 0; i < 10; i++) { // Giả sử tối đa 10 file
                    const fieldName = `media_${i}`;
                    if (files[fieldName]) {
                        const file = files[fieldName];
                        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
                        const filePath = path.join(UPLOAD_DIR, fileName);

                        // Lưu file vào thư mục uploads
                        await file.mv(filePath);
                        mediaUrls.push(`/uploads/questions/${fileName}`);
                    }
                }
            }
            // Xử lý file cho correct_answer_media (nếu có)
            if (files.correct_answer_media) {
                const file = files.correct_answer_media;
                const fileName = `${Date.now}_${file.name.replace(/\s+/g, '_')}`;
                const filePath = path.join(UPLOAD_DIR, fileName);
                await file.mv(filePath);
                correctAnswerUrl = `/uploads/questions/${fileName}`;
                questionsData.correct_answer = correctAnswerUrl;

                // Xác định loại media dựa trên MIME type
                if (file.mimetype.startsWidth("image/")) {
                    questionsData.correct_answer_type = "Image";
                } else if (file.mimetype.startsWidth("audio/")) {
                    questionsData.correct_answer_type = "Audio";
                } else if (file.mimetype.startsWidth("video/")) {
                    questionsData.correct_answer_type = "Video;"
                }
            }
            // Thêm mediaUrls vào data nếu có
            if (mediaUrls.length > 0) {
                questionsData.media_url = mediaUrls;
            }
            // Tạo câu hỏi mới
            return Question.create(questionsData);
        } catch (error) {
            // Xóa các file đã upload nếu có lỗi xảy ra
            if (mediaUrls && mediaUrls.length > 0) {
                for (const url of mediaUrls) {
                    const filePath = path.join(__dirname, '../..', url);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            }
            if (correctAnswerUrl) {
                const filePath = path.join(__dirname, '../..', correctAnswerUrl);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            throw error;
        }
    },

    // lấy danh sách các câu hỏi
    async getQuestions() {
        return Question.findAll({
            include: [
                {
                    model: Match,
                    as: "match",
                    attributes: ["match_name"],
                },
            ],
            order: [['id', 'DESC']]
        });
    },

    //chi tiết câu hỏi
    async getQuestionById(questionId) {
        return Question.findByPk(questionId, {
            include: [
                {
                    model: Match,
                    as: "match",
                    attributes: ["match_name"],
                },
            ]
        });
    },

    // cập nhật câu hỏi với xử lý file media
    async createQuestion(questionsData, files) {
        try {
            const mediaUrls = [];
            let correctAnswerUrl = null;

            if (files) {
                // Xử lý media cho câu hỏi (media_url)
                for (let i = 0; i < 10; i++) {
                    const fieldName = `media_${i}`;
                    if (files[fieldName]) {
                        const file = files[fieldName];
                        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
                        const filePath = path.join(UPLOAD_DIR, fileName);
                        await file.mv(filePath);
                        mediaUrls.push(`/uploads/questions/${fileName}`);
                    }
                }

                // Xử lý file cho correct_answer (nếu có)
                if (files.correct_answer_media) {
                    const file = files.correct_answer_media;
                    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
                    const filePath = path.join(UPLOAD_DIR, fileName);
                    await file.mv(filePath);
                    correctAnswerUrl = `/uploads/questions/${fileName}`;
                    questionsData.correct_answer = correctAnswerUrl;
                    // Xác định loại media dựa trên MIME type
                    if (file.mimetype.startsWith("image/")) {
                        questionsData.correct_answer_type = "Image";
                    } else if (file.mimetype.startsWith("audio/")) {
                        questionsData.correct_answer_type = "Audio";
                    } else if (file.mimetype.startsWith("video/")) {
                        questionsData.correct_answer_type = "Video";
                    }
                }
            }

            if (mediaUrls.length > 0) {
                questionsData.media_url = mediaUrls;
            }

            return Question.create(questionsData);
        } catch (error) {
            // Xóa file nếu có lỗi
            if (correctAnswerUrl) {
                const filePath = path.join(__dirname, '../..', correctAnswerUrl);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            throw error;
        }
    },

    async updateQuestion(questionId, data, files) {
        try {
            const question = await Question.findByPk(questionId);
            if (!question) throw new Error("Không tìm thấy câu hỏi");

            const mediaUrls = [];
            let correctAnswerUrl = null;

            // Giữ media hiện có
            if (data.existing_media) {
                const keepMediaUrls = typeof data.existing_media === 'string' ? JSON.parse(data.existing_media) : data.existing_media;
                mediaUrls.push(...keepMediaUrls);
                delete data.existing_media;
            }

            // Xóa media cũ không còn sử dụng
            let currentMediaUrls = question.media_url || [];
            if (typeof currentMediaUrls === 'string') currentMediaUrls = JSON.parse(currentMediaUrls.replace(/'/g, '"'));
            const filesToDelete = currentMediaUrls.filter(url => !mediaUrls.includes(url));
            for (const url of filesToDelete) {
                const filePath = path.join(__dirname, '../..', url);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }

            // Xử lý file mới cho media_url
            if (files) {
                for (let i = 0; i < 10; i++) {
                    const fieldName = `media_${i}`;
                    if (files[fieldName]) {
                        const file = files[fieldName];
                        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
                        const filePath = path.join(UPLOAD_DIR, fileName);
                        await file.mv(filePath);
                        mediaUrls.push(`/uploads/questions/${fileName}`);
                    }
                }

                // Xử lý file mới cho correct_answer
                if (files.correct_answer_media) {
                    const file = files.correct_answer_media;
                    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
                    const filePath = path.join(UPLOAD_DIR, fileName);
                    await file.mv(filePath);
                    correctAnswerUrl = `/uploads/questions/${fileName}`;
                    data.correct_answer = correctAnswerUrl;
                    if (file.mimetype.startsWith("image/")) {
                        data.correct_answer_type = "Image";
                    } else if (file.mimetype.startsWith("audio/")) {
                        data.correct_answer_type = "Audio";
                    } else if (file.mimetype.startsWith("video/")) {
                        data.correct_answer_type = "Video";
                    }
                }
            }

            data.media_url = mediaUrls.length > 0 ? mediaUrls : null;
            await question.update(data);
            return question;
        } catch (error) {
            if (correctAnswerUrl) {
                const filePath = path.join(__dirname, '../..', correctAnswerUrl);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            throw error;
        }
    },

    // xóa câu hỏi và các file media liên quan
    async deleteQuestion(id) {
        try {
            const question = await Question.findByPk(id);
            if (!question) throw new Error("Không tìm thấy câu hỏi");

            // Chuẩn hóa media_urls
            let mediaUrls = question.media_url || [];
            if (typeof mediaUrls === 'string') {
                try {
                    mediaUrls = JSON.parse(mediaUrls.replace(/'/g, '"'));
                } catch (parseError) {
                    console.error('Lỗi khi parse media_url:', parseError);
                    mediaUrls = [];
                }
            }

            // Xóa các file media liên quan
            for (const url of mediaUrls) {
                try {
                    // Sửa đường dẫn file, ghép trực tiếp với process.cwd() và giữ /uploads/questions
                    const filePath = path.join(process.cwd(), url);
                    console.log('Đang kiểm tra file:', filePath);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        console.log(`Đã xóa file: ${filePath}`);
                    } else {
                        console.log(`File không tồn tại: ${filePath}`);
                    }
                } catch (error) {
                    console.error(`Lỗi khi xóa file ${url}:`, error);
                }
            }

            // Xóa câu hỏi
            return question.destroy();
        } catch (error) {
            throw error;
        }
    },

    // lấy ds độ khó
    async getListDificulty() {
        return Object.values(Question.getAttributes().dificulty.values);
    },

    // lấy ds loại câu hỏi
    async getListQuestionType() {
        return Object.values(Question.getAttributes().question_type.values);
    },

    // lấy danh sách câu hỏi theo trận đấu
    async getQuestionsByMatch(match_id) {
        return Question.findAll({
            where: { match_id },
            include: [
                {
                    model: Match,
                    as: "match",
                    attributes: ["match_name"],
                },
            ],
            order: [['question_order', 'ASC']]
        });
    },

    // lấy chi tiết câu hỏi theo trận đấu
    async getQuestionByMatch(question_order, match_id) {
        return Question.findOne({
            where: { match_id, question_order },
            include: [
                {
                    model: Match,
                    as: "match",
                    attributes: ["match_name"],
                },
            ],
        });
    },

    // lấy câu hỏi hiện tại để load lại
    async getCurrentQuestion(match_id) {
        const match = await Match.findOne({
            where: { id: match_id },
            include: {
                model: Question,
                as: 'current_question',
            }
        });
        if (!match || !match.current_question_id) throw new Error("Trận đấu hoặc câu hỏi không tồn tại");
        return match.current_question;
    },

    // Cập nhật cột time_left thành giá trị của cột timer trong bảng question
    async updateQuestionTimeLeft(question_id) {
        await Question.update(
            { time_left: Sequelize.literal("timer") }, // Gán time_left = timer
            { where: { id: question_id } }
        );

        // Lấy giá trị time_left sau khi cập nhật
        const result = await Question.findOne({
            attributes: ["time_left"], // Chỉ lấy cột time_left
            where: { id: question_id },
        });

        if (!result) throw new Error("Không tìm thấy câu hỏi");

        return result.time_left; // Trả về giá trị time_left
    }
};