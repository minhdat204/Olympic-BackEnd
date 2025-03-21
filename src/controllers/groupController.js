const GroupService = require('../services/groupService');

class GroupController {
  // Lấy danh sách nhóm
  static async getGroups(req, res) {
    try {
      const filters = {
        match_id: req.query.match_id,
        judge_id: req.query.judge_id,
        search: req.query.search
      };

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const result = await GroupService.getGroups(filters, page, limit);

      res.status(200).json({
        status: 'success',
        message: 'Lấy danh sách nhóm thành công',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Đã có lỗi xảy ra'
      });
    }
  }


  static async getGroupByMatchId(req, res) {
    try {
      const matchId = req.params.match_id;
      const groups = await GroupService.getGroupByMatchId(matchId);

      res.status(200).json({
        status: 'success',
        message: 'Lấy danh sách nhóm theo trận đấu thành công',
        data: groups
      });
    } catch (error) {
      res.status(error.message === 'Trận đấu không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message || 'Đã có lỗi xảy ra'
      });
    }
  }

  // Lấy chi tiết nhóm
  static async getGroupById(req, res) {
    try {
      const groupId = req.params.id;
      const group = await GroupService.getGroupById(groupId);

      res.status(200).json({
        status: 'success',
        message: 'Lấy thông tin nhóm thành công',
        data: group
      });
    } catch (error) {
      res.status(error.message === 'Nhóm không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Tạo nhóm mới
  static async createGroup(req, res) {
    try {
      const groupData = req.body;
      const newGroup = await GroupService.createGroup(groupData);

      res.status(201).json({
        status: 'success',
        message: 'Tạo nhóm thành công',
        data: newGroup
      });
    } catch (error) {
      const statusCode =
        error.message.includes('không tồn tại') ||
          error.message.includes('không phải là trọng tài') ? 400 : 500;

      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Cập nhật nhóm
  static async updateGroup(req, res) {
    try {
      const groupId = req.params.id;
      const groupData = req.body;

      const updatedGroup = await GroupService.updateGroup(groupId, groupData);

      res.status(200).json({
        status: 'success',
        message: 'Cập nhật nhóm thành công',
        data: updatedGroup
      });
    } catch (error) {
      const statusCode =
        error.message === 'Nhóm không tồn tại' ? 404 :
          error.message.includes('không tồn tại') ||
            error.message.includes('không phải là trọng tài') ? 400 : 500;

      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Xóa nhóm
  static async deleteGroup(req, res) {
    try {
      const groupId = req.params.id;
      await GroupService.deleteGroup(groupId);

      res.status(200).json({
        status: 'success',
        message: 'Xóa nhóm thành công'
      });
    } catch (error) {
      res.status(error.message === 'Nhóm không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Lấy thí sinh trong nhóm
  static async getContestantsByGroupId(req, res) {
    try {
      const groupId = req.params.id;
      const contestants = await GroupService.getContestantsByGroupId(groupId);

      res.status(200).json({
        status: 'success',
        message: 'Lấy danh sách thí sinh trong nhóm thành công',
        data: contestants
      });
    } catch (error) {
      res.status(error.message === 'Nhóm không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Thêm thí sinh vào nhóm
  static async addContestantsToGroup(req, res) {
    try {
      const groupId = req.params.id;
      const { contestant_ids } = req.body;

      const contestants = await GroupService.addContestantsToGroup(groupId, contestant_ids);

      res.status(200).json({
        status: 'success',
        message: 'Thêm thí sinh vào nhóm thành công',
        data: contestants
      });
    } catch (error) {
      res.status(error.message === 'Nhóm không tồn tại' ? 404 : 500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  // Xóa thí sinh khỏi nhóm
  static async removeContestantFromGroup(req, res) {
    try {
      const groupId = req.params.id;
      const contestantId = req.params.contestantId;

      await GroupService.removeContestantFromGroup(groupId, contestantId);

      res.status(200).json({
        status: 'success',
        message: 'Xóa thí sinh khỏi nhóm thành công'
      });
    } catch (error) {
      const statusCode =
        error.message === 'Nhóm không tồn tại' ? 404 :
          error.message === 'Thí sinh không thuộc nhóm này' ? 400 : 500;

      res.status(statusCode).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = GroupController;