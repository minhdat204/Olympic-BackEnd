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
            let optionsWithMedia = [];

            if (files) {
                // Xử lý media cho câu hỏi (media_url) - giữ nguyên logic hiện tại
                for (let i = 0; i < 10; i++) {
                    const fieldName = `media_${i}`;
                    if (files[fieldName]) {
                        const file = files[fieldName];
                        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
                        const filePath = path.join(UPLOAD_DIR, fileName);
                        await file.mv(filePath);
                        mediaUrls.push(`/uploads/questions/${fileName}`);
                    }
                }

                // Xử lý câu hỏi trắc nghiệm
                if (questionsData.question_type === "Trắc Nghiệm") {
                    const options = JSON.parse(questionsData.options || "[]");
                    optionsWithMedia = await Promise.all(
                        options.map(async (opt, i) => {
                            const optionFile = files[`option_media_${i}`];
                            if (optionFile) {
                                const fileName = `${Date.now()}_${optionFile.name.replace(/\s+/g, "_")}`;
                                const filePath = path.join(UPLOAD_DIR, fileName);
                                await optionFile.mv(filePath);
                                return { text: opt.text, media_url: `/uploads/questions/${fileName}` };
                            }
                            return { text: opt.text, media_url: null };
                        })
                    );
                    // Gán options mới vào questionsData
                    questionsData.options = optionsWithMedia;
                    // Đảm bảo correct_answer_type là "Text" cho trắc nghiệm
                    questionsData.correct_answer_type = "Text";
                }
                // Xử lý file cho correct_answer (nếu không phải trắc nghiệm)
                else if (files.correct_answer_media) {
                    const file = files.correct_answer_media;
                    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
                    const filePath = path.join(UPLOAD_DIR, fileName);
                    await file.mv(filePath);
                    correctAnswerUrl = `/uploads/questions/${fileName}`;
                    questionsData.correct_answer = correctAnswerUrl;
                    // Xác định loại media dựa trên MIME type - giữ nguyên logic hiện tại
                    if (file.mimetype.startsWith("image/")) {
                        questionsData.correct_answer_type = "Image";
                    } else if (file.mimetype.startsWith("audio/")) {
                        questionsData.correct_answer_type = "Audio";
                    } else if (file.mimetype.startsWith("video/")) {
                        questionsData.correct_answer_type = "Video";
                    }
                }
            }

            // Gán media_url nếu có
            if (mediaUrls.length > 0) {
                questionsData.media_url = mediaUrls;
            }

            // Tạo câu hỏi trong database
            return Question.create(questionsData);
        } catch (error) {
            // Xóa file nếu có lỗi - giữ nguyên logic hiện tại
            if (correctAnswerUrl) {
                const filePath = path.join(__dirname, "../..", correctAnswerUrl);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            // Xóa các file media của options nếu có lỗi
            if (questionsData.question_type === "Trắc Nghiệm" && optionsWithMedia.length > 0) {
                for (const opt of optionsWithMedia) {
                    if (opt.media_url) {
                        const filePath = path.join(__dirname, "../..", opt.media_url);
                        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                    }
                }
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
            let optionsWithMedia = [];

            // Giữ media hiện có - giữ nguyên logic hiện tại
            if (data.existing_media) {
                const keepMediaUrls = typeof data.existing_media === "string" ? JSON.parse(data.existing_media) : data.existing_media;
                mediaUrls.push(...keepMediaUrls);
                delete data.existing_media;
            }

            // Xóa media cũ không còn sử dụng - giữ nguyên logic hiện tại
            let currentMediaUrls = question.media_url || [];
            if (typeof currentMediaUrls === "string") currentMediaUrls = JSON.parse(currentMediaUrls.replace(/'/g, '"'));
            const filesToDelete = currentMediaUrls.filter((url) => !mediaUrls.includes(url));
            for (const url of filesToDelete) {
                const filePath = path.join(__dirname, "../..", url);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }

            if (files) {
                // Xử lý file mới cho media_url - giữ nguyên logic hiện tại
                for (let i = 0; i < 10; i++) {
                    const fieldName = `media_${i}`;
                    if (files[fieldName]) {
                        const file = files[fieldName];
                        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
                        const filePath = path.join(UPLOAD_DIR, fileName);
                        await file.mv(filePath);
                        mediaUrls.push(`/uploads/questions/${fileName}`);
                    }
                }

                // Xử lý câu hỏi trắc nghiệm
                if (data.question_type === "Trắc Nghiệm") {
                    const options = JSON.parse(data.options || "[]");
                    const existingOptions = question.options || [];
                    optionsWithMedia = await Promise.all(
                        options.map(async (opt, i) => {
                            const optionFile = files[`option_media_${i}`];
                            if (optionFile) {
                                // Upload file media mới
                                const fileName = `${Date.now()}_${optionFile.name.replace(/\s+/g, "_")}`;
                                const filePath = path.join(UPLOAD_DIR, fileName);
                                await optionFile.mv(filePath);
                                return { text: opt.text, media_url: `/uploads/questions/${fileName}` };
                            }
                            // Giữ media cũ nếu không có file mới
                            const existingOpt = existingOptions[i] || {};
                            return { text: opt.text, media_url: existingOpt.media_url || null };
                        })
                    );
                    // Gán options mới vào data
                    data.options = optionsWithMedia;
                    // Đảm bảo correct_answer_type là "Text" cho trắc nghiệm
                    data.correct_answer_type = "Text";
                }
                // Xử lý file mới cho correct_answer (nếu không phải trắc nghiệm) - giữ nguyên logic hiện tại
                else if (files.correct_answer_media) {
                    const file = files.correct_answer_media;
                    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
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

            // Gán media_url nếu có - giữ nguyên logic hiện tại
            data.media_url = mediaUrls.length > 0 ? mediaUrls : null;

            // Cập nhật câu hỏi
            await question.update(data);
            return question;
        } catch (error) {
            // Xóa file nếu có lỗi
            if (correctAnswerUrl) {
                const filePath = path.join(__dirname, "../..", correctAnswerUrl);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            // Xóa các file media của options nếu có lỗi
            if (data.question_type === "Trắc Nghiệm" && optionsWithMedia.length > 0) {
                for (const opt of optionsWithMedia) {
                    if (opt.media_url && files[`option_media_${optionsWithMedia.indexOf(opt)}`]) {
                        const filePath = path.join(__dirname, "../..", opt.media_url);
                        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                    }
                }
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
            if (typeof mediaUrls === "string") {
                try {
                    mediaUrls = JSON.parse(mediaUrls.replace(/'/g, '"'));
                } catch (parseError) {
                    console.error("Lỗi khi parse media_url:", parseError);
                    mediaUrls = [];
                }
            }

            // Chuẩn hóa options (nếu là câu hỏi trắc nghiệm)
            let optionsMediaUrls = [];
            if (question.question_type === "Trắc Nghiệm" && question.options) {
                let options = question.options;
                if (typeof options === "string") {
                    try {
                        options = JSON.parse(options.replace(/'/g, '"'));
                    } catch (parseError) {
                        console.error("Lỗi khi parse options:", parseError);
                        options = [];
                    }
                }
                // Lấy tất cả media_url từ options
                optionsMediaUrls = options
                    .filter((opt) => opt.media_url)
                    .map((opt) => opt.media_url);
            }

            // Xóa các file media liên quan đến media_url
            for (const url of mediaUrls) {
                try {
                    const filePath = path.join(process.cwd(), url);
                    console.log("Đang kiểm tra file media_url:", filePath);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        console.log(`Đã xóa file media_url: ${filePath}`);
                    } else {
                        console.log(`File media_url không tồn tại: ${filePath}`);
                    }
                } catch (error) {
                    console.error(`Lỗi khi xóa file media_url ${url}:`, error);
                }
            }

            // Xóa các file media liên quan đến options
            for (const url of optionsMediaUrls) {
                try {
                    const filePath = path.join(process.cwd(), url);
                    console.log("Đang kiểm tra file options:", filePath);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        console.log(`Đã xóa file options: ${filePath}`);
                    } else {
                        console.log(`File options không tồn tại: ${filePath}`);
                    }
                } catch (error) {
                    console.error(`Lỗi khi xóa file options ${url}:`, error);
                }
            }

            // Xóa file correct_answer nếu không phải trắc nghiệm và có media
            if (
                question.correct_answer_type !== "Text" &&
                question.correct_answer
            ) {
                try {
                    const filePath = path.join(process.cwd(), question.correct_answer);
                    console.log("Đang kiểm tra file correct_answer:", filePath);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        console.log(`Đã xóa file correct_answer: ${filePath}`);
                    } else {
                        console.log(`File correct_answer không tồn tại: ${filePath}`);
                    }
                } catch (error) {
                    console.error(
                        `Lỗi khi xóa file correct_answer ${question.correct_answer}:`,
                        error
                    );
                }
            }

            // Xóa câu hỏi
            await question.destroy();
            return { message: "Câu hỏi và các file liên quan đã được xóa thành công" };
        } catch (error) {
            console.error("Lỗi trong deleteQuestion:", error);
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