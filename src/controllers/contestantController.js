const { date } = require("joi");
const ContestantService = require("../services/contestantService");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const { emit } = require("process");
const {
  emitTotalContestants,
  emitContestants,
} = require("../socketEmitters/contestantEmitter");
class ContestantController {
  // Lấy danh sách thí sinh
  static async getContestants(req, res) {
    try {
      const filters = {
        status: req.query.status,
        group_id: req.query.group_id,
        search: req.query.search,
      };

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const result = await ContestantService.getContestants(
        filters,
        page,
        limit
      );

      res.status(200).json({
        status: "success",
        message: "Lấy danh sách thí sinh thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Đã có lỗi xảy ra",
      });
    }
  }

  // Lấy chi tiết thí sinh
  static async getContestantById(req, res) {
    try {
      const contestantId = req.params.id;
      const contestant = await ContestantService.getContestantById(
        contestantId
      );

      res.status(200).json({
        status: "success",
        message: "Lấy thông tin thí sinh thành công",
        data: contestant,
      });
    } catch (error) {
      res.status(error.message === "Thí sinh không tồn tại" ? 404 : 500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // Tạo thí sinh mới
  static async createContestant(req, res) {
    try {
      const contestantData = req.body;
      const newContestant = await ContestantService.createContestant(
        contestantData
      );

      res.status(201).json({
        status: "success",
        message: "Tạo thí sinh thành công",
        data: newContestant,
      });
    } catch (error) {
      res.status(error.message === "Email đã được sử dụng" ? 409 : 500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // Cập nhật thí sinh
  static async updateContestant(req, res) {
    try {
      const contestantId = req.params.id;
      const contestantData = req.body;

      const updatedContestant = await ContestantService.updateContestant(
        contestantId,
        contestantData
      );

      res.status(200).json({
        status: "success",
        message: "Cập nhật thí sinh thành công",
        data: updatedContestant,
      });
    } catch (error) {
      const statusCode =
        error.message === "Thí sinh không tồn tại"
          ? 404
          : error.message === "Email đã được sử dụng"
            ? 409
            : 500;

      res.status(statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // Cập nhật trạng thái thí sinh
  static async updateContestantStatus(req, res) {
    try {
      const contestantId = req.params.id;
      const { status } = req.body;

      const contestant = await ContestantService.updateContestantStatus(
        contestantId,
        status
      );

      res.status(200).json({
        status: "success",
        message: "Cập nhật trạng thái thí sinh thành công",
        data: contestant,
      });
    } catch (error) {
      const statusCode = error.message === "Thí sinh không tồn tại" ? 404 : 400;

      res.status(statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // Xóa thí sinh
  static async deleteContestant(req, res) {
    try {
      const contestantId = req.params.id;
      await ContestantService.deleteContestant(contestantId);

      res.status(200).json({
        status: "success",
        message: "Xóa thí sinh thành công",
      });
    } catch (error) {
      res.status(error.message === "Thí sinh không tồn tại" ? 404 : 500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // lấy ds lớp học
  static async getListClass(req, res) {
    try {
      const listClass = await ContestantService.getListClass();
      res.json({ listClass: listClass });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // lấy danh sách thí sinh theo judge_id và match_id (lấy tên group, tên trận đấu)
  static async getContestantByJudgeAndMatch(req, res) {
    try {
      const { judge_id, match_id } = req.params;

      // lấy danh sách thí sinh dựa vào judge_id, match_id (kết bảng với groups, contestants, matches)
      const contestants = await ContestantService.getContestantByJudgeAndMatch(
        judge_id,
        match_id
      );

      // lấy group_id, group_name, match_id, match_name, judge_id, username dựa vào judge_id, match_id (GROUPS)
      const GroupAndMatch = await ContestantService.getGroupAndMatch(
        judge_id,
        match_id
      );

      res.status(200).json({
        status: "success",
        message: "Lấy danh sách thí sinh thành công",
        matchId: GroupAndMatch.match.id,
        matchName: GroupAndMatch.match.match_name,
        judgeId: GroupAndMatch.judge_id,
        judgeUserName: GroupAndMatch.judge.username,
        groupId: GroupAndMatch.id,
        groupName: GroupAndMatch.group_name,
        listContestants: contestants,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Đã có lỗi xảy ra",
      });
    }
  }
  // lấy danh sách thí sinh theo nhiều lớp
  static async getListContestantsByClass(req, res) {
    try {
      const { classes } = req.body;
      const listContestants = await ContestantService.getListContestantsByClass(
        classes
      );
      res.json({ listContestants: listContestants });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async updateContestantGroup(req, res) {
    try {
      const status = await ContestantService.updateContestantGroup(req.body);
      res.json({ status: status });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async uploadExcel(req, res) {
    if (!req.file) {
      res.status(400).json("Vui lòng nhập file");
    }
    const fie = req.file.originalname.split(".").pop();
    if (!["xls", "xlsx"].includes(fie)) {
      res.status(400).json("Vui lòng nhập đúng định dạng file .xls .xlsx ");
    }
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
    const sheet = workbook.Sheets[sheetName];
    // Chuyển sheet thành JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    const list = await ContestantService.uploadExcel(data);

    res.json(list);
  }
  static async downloadExcel(req, res) {
    const contestants = [
      {
        fullname: "Phan Thành Long",
        email: "long@example.com",
        class: "CD TH 22 WebB",
        class_year: 22,
        qualifying_score: 50,
      },
      {
        fullname: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        class: "CD TH 22 WebB",
        class_year: 22,
        qualifying_score: 50,
      },
    ];
    const buffer = await ContestantService.downloadExcel(contestants);
    res.setHeader("Content-Disposition", 'attachment; filename="thisinh.xlsx"');
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  }
  static async getClassByClass_Year(req, res) {
    try {
      const class_year = parseInt(req.params.class_year);
      const listClass = await ContestantService.getClassByClass_Year(
        class_year
      );
      console.log(listClass);
      res.json({ listClass: listClass });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // API chia nhóm lại
  static async updateContestantGroupByClass(req, res) {
    try {
      const { match_id, classes } = req.body;
      const match = await ContestantService.checkRegroupPermission(match_id);
      if (match.status !== "Chưa diễn ra") {
        throw new Error("Không thể chia nhóm lại vì trận đấu đã bắt đầu");
      }

      // Xóa các nhóm cũ và gán lại cho nhóm mới
      const result = await ContestantService.updateContestantGroupByClass(
        match_id,
        classes
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getListClass_Year(req, res) {
    try {
      const list = await ContestantService.getListClass_Year();
      res.json({ list: list });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * TRÊN MÀN HÌNH ĐIỀU KHIỂN
   *
   */
  // API lấy danh sách thí sinh trong trận đấu
  static async getContestantsByMatchId(req, res) {
    try {
      const matchId = req.params.match_id;

      //lấy danh sách thí sinh 
      const contestants = await ContestantService.getContestantsByMatchId(matchId);
      res.json({
        message: "Lấy danh sách thí sinh trận đấu thành công",
        contestants: contestants
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**============================================================
   * MÀN HÌNH TRỌNG TÀI cập nhật status thí sinh
   * gửi API lấy total thí sinh và thí sinh còn lại (status = đang thi) cho màn hình chiếu
   * gửi API lấy danh sách thí sinh theo trạng thái cho màn hình điều khiển
   * ============================================================
   */
  // API cập nhật thí sinh + gửi emit total thí sinh, thí sinh còn lại lên màn hình chiếu + emit dữ liệu thí sinh (status) lên màn hình điều khiển)
  static async updateContestantStatusAndEmit(req, res) {
    try {
      //lấy id trận đấu hiện tại
      const matchId = req.params.match_id;
      // lấy trạng thái thí sinh hiện tại
      const contestantId = req.body.contestantId;
      const contestantStatus = req.body.status;

      //cập nhật trạng thái thí sinh
      await ContestantService.updateContestantStatus(
        contestantId,
        contestantStatus
      );
      //lấy total thí sinh và thí sinh còn lại trong trận
      const contestantTotal = await ContestantService.getContestantTotal();
      //lấy danh sách thí sinh theo trận hiện tại
      const contestants = await ContestantService.getContestantsByMatchId(
        matchId
      );

      //emitTotalContestants
      emitTotalContestants(
        matchId,
        contestantTotal.total,
        contestantTotal.remaining
      );
      //emitContestants
      emitContestants(matchId, contestants);
      //trả về kết quả ở màn hình trọng tài
      res.json({
        total: contestantTotal.total,
        remaining: contestantTotal.remaining,
        message: "Cập nhật trạng thái thí sinh thành công",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getGroupContestantByMatch(req, res) {
    try {
      const list = await ContestantService.getGroupContestantByMatch(
        req.params.match_id
      );
      res.json(list);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //API kiểm tra quyền chia nhóm lại
  static async checkRegroupPermission(req, res) {
    try {
      const { match_id } = req.params;
      const match = await ContestantService.checkRegroupPermission(match_id);
      res.json({ canRegroup: match.status === "Chưa diễn ra" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  /**===========================================================
   * DAT: PHẦN CỨU TRỢ THÍ SINH
   * ===========================================================
   */
  // lấy danh sách thí sinh được cứu (status = "xác nhận 2")
  static async getRescueContestants(req, res) {
    try {
      const matchId = req.params.match_id;
      const score = req.body.score;

      //lấy danh sách thí sinh được cứu
      const contestants = await ContestantService.getRescueContestants(
        matchId,
        score
      );

      res.json({
        message: "Lấy danh sách thí sinh được cứu thành công",
        selectedContestants: contestants,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Cập nhật trạng thái thí sinh được cứu hàng loạt
  static async updateRescueContestants(req, res) {
    try {
      const contestants = this.getRescueContestants(req, res);
      await ContestantService.updateContestant(contestants, "Đang thi");
      res.json({ message: "Cập nhật trạng thái thí sinh thành công" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Tính số lượng thí sinh cần được cứu
  static async getRescueContestantTotal(req, res) {
    try {
      const matchId = req.params.match_id;
      const total = await ContestantService.getRescueContestantTotal(matchId);
      res.json({ total: total });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  //  Lấy thông tin thí sinh win gold
  static async getContestantByGoldMatch(req, res) {
    try {
      const constestant = await ContestantService.getContestantByGoldMatch(
        req.params.match_id
      );
      res.json({ constestant: constestant });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ContestantController;
