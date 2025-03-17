const { VideoSubmission } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

class VideoSubmissionService {

  // lấy danh sách video phân trang
  static async getVideoSubmissionsPaginate(filters = {}, page = 1, limit = 20) {
    const options = {
      where: {},
      order: [['id', 'ASC']],
      offset: (page - 1) * limit,
      limit
    };

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

  // lấy danh sách video không phân trang
  static async getVideoSubmissions(filters = {}) {
    const options = {
      where: {},
      order: [['id', 'ASC']]
    };

    if (filters.type) options.where.type = filters.type;
    if (filters.search) {
      options.where.name = { [Op.like]: `%${filters.search}%` };
    }

    const videos = await VideoSubmission.findAll(options);
    return videos;
  }

  static async getVideoSubmissionById(id) {
    const video = await VideoSubmission.findByPk(id);
    if (!video) {
      throw new Error('Video không tồn tại');
    }
    return video;
  }

  static async createVideoSubmission(req) {
    const { name, type } = req.body;
    const file = req.file;

    if (!file) {
      throw new Error('Vui lòng upload file video');
    }

    const videoUrl = `/uploads/videos/${file.filename}`;
    const videoData = {
      name,
      video_url: videoUrl,
      type
    };

    return await VideoSubmission.create(videoData);
  }

  static async updateVideoSubmission(id, req) {
    const video = await VideoSubmission.findByPk(id);
    if (!video) {
      throw new Error('Video không tồn tại');
    }

    const { name, type } = req.body;
    const file = req.file;

    const updateData = {};
    if (name) updateData.name = name;
    if (type) updateData.type = type;
    if (file) {
      // Xóa file cũ
      const oldFilePath = path.join(__dirname, '..','..', video.video_url);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      updateData.video_url = `/uploads/videos/${file.filename}`;
    }

    await video.update(updateData);
    return video;
  }

  static async deleteVideoSubmission(id) {
    const video = await VideoSubmission.findByPk(id);
    if (!video) {
      throw new Error('Video không tồn tại');
    }

    // Xóa file trên server
    const filePath = path.join(__dirname,'..','..', video.video_url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await video.destroy();
    return { message: 'Đã xóa video thành công' };
  }

  static async getVideoSubmissionsByType(type) {
    const videos = await VideoSubmission.findAll({
      where: { type },
      order: [['created_at', 'DESC']]
    });
    return videos;
  }
}

module.exports = VideoSubmissionService;