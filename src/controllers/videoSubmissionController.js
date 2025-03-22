const VideoSubmissionService = require("../services/videoSubmissionService");
const { EmitVideoUrl } = require("../socketEmitters/videoEmitter");
class VideoSubmissionController {
  static async getVideoSubmissions(req, res) {
    try {
      const filters = {
        type: req.query.type,
        search: req.query.search,
      };
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const result = await VideoSubmissionService.getVideoSubmissions(
        filters,
        page,
        limit
      );

      res.status(200).json({
        status: "success",
        message: "Lấy danh sách video thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Đã có lỗi xảy ra",
      });
    }
  }

  static async getVideoSubmissionById(req, res) {
    try {
      const videoId = req.params.id;
      const video = await VideoSubmissionService.getVideoSubmissionById(
        videoId
      );

      res.status(200).json({
        status: "success",
        message: "Lấy thông tin video thành công",
        data: video,
      });
    } catch (error) {
      res.status(error.message === "Video không tồn tại" ? 404 : 500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async createVideoSubmission(req, res) {
    try {
      const newVideo = await VideoSubmissionService.createVideoSubmission(req);

      res.status(201).json({
        status: "success",
        message: "Tạo video thành công",
        data: newVideo,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async updateVideoSubmission(req, res) {
    try {
      const videoId = req.params.id;
      const updatedVideo = await VideoSubmissionService.updateVideoSubmission(
        videoId,
        req
      );

      res.status(200).json({
        status: "success",
        message: "Cập nhật video thành công",
        data: updatedVideo,
      });
    } catch (error) {
      res.status(error.message === "Video không tồn tại" ? 404 : 400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async deleteVideoSubmission(req, res) {
    try {
      const videoId = req.params.id;
      await VideoSubmissionService.deleteVideoSubmission(videoId);

      res.status(200).json({
        status: "success",
        message: "Xóa video thành công",
      });
    } catch (error) {
      res.status(error.message === "Video không tồn tại" ? 404 : 500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async getVideoSubmissionsByType(req, res) {
    try {
      const type = req.params.type;
      if (!["Team", "Sponsor"].includes(type)) {
        return res.status(400).json({
          status: "error",
          message:
            'Loại video không hợp lệ. Chỉ chấp nhận "Team" hoặc "Sponsor"',
        });
      }

      const videos = await VideoSubmissionService.getVideoSubmissionsByType(
        type
      );

      res.status(200).json({
        status: "success",
        message: `Lấy danh sách video loại ${type} thành công`,
        data: videos,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  // Emit url
  static async EmitVideoUrl(req, res) {
    try {
      const video_url = await VideoSubmissionService.EmitVideoUrl(
        req.params.id
      );
      EmitVideoUrl(req.params.match_id, video_url.video_url);
      res.json(video_url.video_url);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = VideoSubmissionController;
