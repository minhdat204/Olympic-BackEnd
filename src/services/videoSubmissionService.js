const { VideoSubmission } = require('../models');
const { Op } = require('sequelize');

class VideoSubmissionService {
  // Lấy danh sách video (có hỗ trợ lọc và phân trang)
  static async getVideoSubmissions(filters = {}, page = 1, limit = 20) {
    const options = {
      where: {},
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit
    };

    // Xử lý các bộ lọc
    if (filters.type) options.where.type = filters.type;
    if (filters.search) {
      options.where.name = { [Op.like]: `%${filters.search}%` };
    }

    const { count, rows } = await VideoSubmission.findAndCountAll(options);
    
    return {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      videos: rows
    };
  }

  // Lấy chi tiết của một video
  static async getVideoSubmissionById(id) {
    const video = await VideoSubmission.findByPk(id);

    if (!video) {
      throw new Error('Video không tồn tại');
    }

    return video;
  }

  // Tạo video mới
  static async createVideoSubmission(videoData) {
    return await VideoSubmission.create(videoData);
  }

  // Cập nhật thông tin video
  static async updateVideoSubmission(id, videoData) {
    const video = await VideoSubmission.findByPk(id);

    if (!video) {
      throw new Error('Video không tồn tại');
    }

    await video.update(videoData);
    return video;
  }

  // Xóa video
  static async deleteVideoSubmission(id) {
    const video = await VideoSubmission.findByPk(id);

    if (!video) {
      throw new Error('Video không tồn tại');
    }

    await video.destroy();
    return { message: 'Đã xóa video thành công' };
  }

  // Lấy video theo loại
  static async getVideoSubmissionsByType(type) {
    const videos = await VideoSubmission.findAll({
      where: { type },
      order: [['created_at', 'DESC']]
    });
    
    return videos;
  }
}

module.exports = VideoSubmissionService;