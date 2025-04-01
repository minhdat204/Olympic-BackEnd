const { date } = require("joi");
const ContestantService = require("../services/contestantService");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const { emit } = require("process");
const {
  emitTotalContestants,
  emitContestants,
  emitEliminatedContestants,
  emitContestantsAdmin,
} = require("../socketEmitters/contestantEmitter");
const { enableCompileCache } = require("module");
const matchService = require("../services/matchService");
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
      res.json(contestants);
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
        mssv: "0306221037",
        email: "long@example.com",
        class: "CD TH 22 WebB",
        class_year: 22,
        qualifying_score: 50,
      },
      {
        fullname: "Nguyễn Văn A",
        mssv: "0306221037",
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
      const contestants = await ContestantService.getContestantsByMatchId(
        matchId
      );
      res.json({
        message: "Lấy danh sách thí sinh trận đấu thành công",
        contestants: contestants,
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

  /**DAT
   * Nhập điểm và lấsy danh sách thí sinh được cứu (status = "xác nhận 2")
   * NƠI SỬ DỤNG: 
   * - RescueControl.jsx: fetchupdateRescueContestants
   */
  static async getRescueContestants(req, res) {
    try {
      const matchId = req.params.match_id;
      const score = req.body.score;
      const rescueNumber = req.body.rescueNumber; // lần cứu trợ thứ mấy

      /**lấy danh sách thí sinh được cứu ưu tiên câu cao nhất
         * @return
         * contestant_id, created_at, eliminated_at_question_order, id (của match_contestants), match_id, registration_number, status, updated_at
         */
      const contestants = await ContestantService.getRescueContestants(
        matchId,
        score,
        rescueNumber
      );

      const totalEliminated =
        await ContestantService.getContestantTotalByStatus(
          matchId,
          "Bị loại"
        );

      // Tạo mảng chỉ chứa id của các thí sinh cứu trợ
      const selectedContestantIds = contestants.map(
        (contestant) => contestant.contestant_id
      );
      
      // Chuyển mảng ID thành chuỗi ngăn cách bởi dấu phẩy
      const selectedContestantIdsString = selectedContestantIds.join(',');
      
      // Cập nhật vào database dựa vào số lần cứu trợ
      const updateField = rescueNumber == 1 ? 'rescued_count_1' : 'rescued_count_2';

      /**DAT
     * Cập nhật chuỗi id thí sinh được cứu vào db (bảng match)
     * @param {*} matchId : id trận đấu
     * @param {*} updateField : rescued_count_1, rescued_count_2
     * @param {*} selectedContestantIdsString : chuỗi id thí sinh được cứu (vd: 1,2,3,4)
     * @returns {boolean} : true nếu cập nhật thành công, false nếu thất bại
     * 
     */
      const isUpdateContestantIdsInMatchTable = await matchService.updateRescuedCountInMatch(
        matchId, 
        updateField, 
        selectedContestantIdsString
      );

      res.json({
        message: "Lấy danh sách thí sinh được cứu thành công",
        selectedContestants: contestants,
        selectedContestantIds: selectedContestantIds,
        totalEliminated: totalEliminated,
        rescueNumber: rescueNumber,
        isUpdate: isUpdateContestantIdsInMatchTable,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**DAT
   * Cập nhật trạng thái thí sinh được cứu hàng loạt
   * NƠI SỬ DỤNG: 
   * - RescueControl.jsx: fetchupdateRescueContestants
   */
  static async updateRescueContestants(req, res) {
    try {
      const matchId = req.params.match_id;
      const rescueNumber = req.body.rescueNumber; // lần cứu trợ thứ mấy

      /**
       * lấsy mảrng ths được cứu từ db
       * @return array
       */
      const contestantIds = await matchService.getContestantIdsRescue(matchId, rescueNumber);
      
      if (contestantIds.length === 0) {
        return res.status(400).json({ 
          error: "Không có thí sinh nào được chọn để cứu trợ" 
        });
      }

      // cập nhật status cho tất cả thí sinh được chọn
      const resultUpdate = await ContestantService.updateContestant(contestantIds, {
        status: "Được cứu",
      });

      // danh sách thí sinh trong trận để gửi socket
      const contestants = await ContestantService.getContestantsByMatchId(matchId);

      // Emit socket event
      emitEliminatedContestants(matchId, contestants);
      // gửi tín hiệu useEffect lại getContesetant ở trọng tài (JudgeHomePage)
      emitContestantsAdmin(matchId, 1);

      res.json({
        message: "Cập nhật trạng thái thí sinh thành công",
        contestants: contestants,
        resultUpdate: resultUpdate
      });
    } catch (error) {
      console.error("Error in updateRescueContestants:", error);
      res.status(400).json({ error: error.message });
    }
  }

  /**Dat
   * lấy danh sách thí sinh được cứu từ db
   * NƠI SỬ DỤNG:
   * - RescueControl.jsx: fetchRescueContestants
   */
  static async getRescueContestantsInDb(req, res) {
    try {
      const matchId = req.params.match_id;
      const rescueNumber = req.params.rescue_number; // lần cứu trợ thứ mấy

      // lấy danh sách thí sinh được cứu từ db
      const contestantIds = await matchService.getContestantIdsRescue(matchId, rescueNumber);

      // lấy danh sách thí sinh theo match_id
      const contestants = await ContestantService.getContestantsByMatchId(matchId);

      // Lọc danh sách thí sinh để chỉ lấy những thí sinh có ID trong contestantIds
      const selectedContestants = contestants.filter((contestant) =>
        contestantIds.includes(contestant.id)
      );

      const totalEliminated =
      await ContestantService.getContestantTotalByStatus(
        matchId,
        "Bị loại"
      );

      res.json({
        message: "Load danh sách thí sinh được cứu thành công",
        selectedContestants: selectedContestants,
        selectedContestantIds: contestantIds,
        totalEliminated: totalEliminated,
        rescueNumber: rescueNumber,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Tính số lượng thí sinh cần được cứu
  static async getRescueContestantTotal(req, res) {
    try {
      const rescuePoint = req.body.rescuePoint;
      const matchId = req.params.match_id;
      const total = await ContestantService.getRescueContestantTotal(
        matchId,
        rescuePoint
      );
      res.json({ total: total });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // DAT: API lấy tổng số thí sinh theo trạng thái (status = "Xác nhận 2")
  static async getContestantTotalByStatus(req, res) {
    try {
      const matchId = req.params.match_id;
      const total = await ContestantService.getContestantTotalByStatus(
        matchId,
        "Bị loại"
      );
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

  // Lấy danh sách trận đâu
  static async getContestantTotal(req, res) {
    try {
      const total = await ContestantService.getContestantTotal(
        req.params.match_id
      );
      res.json(total);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // DAT: cập nhật trạng thái thí sinh hàng loạt
  static async updateContestantsBulk(req, res) {
    try {
      const matchId = req.params.match_id;
      const { contestantIds, status } = req.body;
      
      if (!contestantIds || !Array.isArray(contestantIds) || contestantIds.length === 0) {
        return res.status(400).json({ 
          error: "Vui lòng cung cấp danh sách ID thí sinh hợp lệ" 
        });
      }
      
      // Cập nhật trạng thái cho tất cả thí sinh được chọn
      const resultUpdate = await ContestantService.updateContestant(contestantIds, {
        status: status
      });
      
      // Lấy danh sách thí sinh sau khi cập nhật để gửi qua socket
      const contestants = await ContestantService.getContestantsByMatchId(matchId);
      
      // Lấy tổng số thí sinh và số thí sinh còn lại
      const contestantTotal = await ContestantService.getContestantTotal(matchId);
      
      // Gửi các thông báo qua socket
      emitEliminatedContestants(matchId, contestants);
      
      emitContestantsAdmin(matchId, 1); // Trigger client refresh
      
      res.json({
        message: `Cập nhật trạng thái ${contestantIds.length} thí sinh thành công`,
        contestants: contestants
      });
    } catch (error) {
      console.error("Error updating contestants in bulk:", error);
      res.status(400).json({ error: error.message });
    }
  }

  // DAT: cập nhật trạng thái thí sinh "Được cứu" hàng loạt thành "Đang thi"
  static async updateRescuedContestantsToCompeting(req, res) {
    try {
      const matchId = req.params.match_id;
      
      // Get all contestant IDs with status "Được cứu"
      const contestantIds = await ContestantService.getContestantsRescue(matchId);
      if (contestantIds.length === 0) {
        return res.status(200).json({
          message: "Không có thí sinh nào được cứu để cập nhật",
          contestants: []
        });
      }
      
      // Add contestantIds and status to the request body
      req.body.contestantIds = contestantIds;
      req.body.status = "Đang thi";
      
      // Call updateContestantsBulk
      return await ContestantController.updateContestantsBulk(req, res);
      
    } catch (error) {
      console.error("Error getting rescued contestants:", error);
      if (!res.headersSent) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  

  /**
   * DAT: PHẦN CỨU MÀN HÌNH CHIẾU
   * ===========================================================
   */
  // DAT: API lấy total thí sinh và thí sinh còn lại trong trận hiện tại
  static async getContestantTotalAndRemaining(req, res) {
    try {
      const matchId = req.params.match_id;
      const { total, remaining } = await ContestantService.getContestantTotal(
        matchId
      );
      res.json({
        message: "Lấy total thí sinh và thí sinh còn lại thành công",
        total: total,
        remaining: remaining,
        matchId: matchId,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // DAT: lấy cột rescue_1, rescue_2, plane: sử dụng ở câu mấy (order question) (-1 là chưa sử dụng) và cột rescued_count_1, rescued_count_2: cứu được bao nhiêu người
  // không cần ghi dựa vào match service lấy toàn bộ tran đấu

  // DAT: API lấy danh sách thí sinh "Đang thi"
  static async getCompetingContestants(req, res) {
    try {
      const matchId = req.params.match_id;
      const contestants = await ContestantService.getCompetingContestants(
        matchId
      );
      res.json({ contestants: contestants });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async downloadExcelMatch(req, res) {
    try {
      const excle = await ContestantService.downloadExcelMatch(
        req.params.match_id
      );
      const name = encodeURIComponent(excle[0].match_name); // Mã hóa tên file tránh lỗi
      const buffer = await ContestantService.downloadExcel(excle);

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${name}.xlsx"`
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.send(buffer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  /**
   * TOP 20 THÍ SINH
   */
  /**DAT
   * cập nhật tất cả thí sinh đang thi thành Bị loại trừ thí sinh gold
   * Đồng thời cập nhật số câu hiện tại của thí sinh vào bảng MatchContestant
   * DÙNG: 
   *  - ContestantService : updateContestantsToEliminated
   * 
   * @return {boolean} : true nếu cập nhật thành công, false nếu thất bại
   */
  static async updateContestantsToEliminated(req, res) {
    try {
      const matchId = req.params.match_id;
      const { questionOrder } = req.body;
      const goldContestantId = await matchService.getGoldWinnerId(matchId);
      
      if (!questionOrder) {
        return res.status(400).json({
          status: "error",
          message: "Vui lòng cung cấp thứ tự câu hỏi"
        });
      }
      
      const result = await ContestantService.updateContestantsToEliminated(matchId, questionOrder, goldContestantId);
      
      if (!result) {
        return res.status(404).json({
          status: "error",
          message: "Không tìm thấy thí sinh phù hợp để cập nhật"
        });
      }
      
      // Lấy danh sách thí sinh sau khi cập nhật để gửi qua socket
      const contestants = await ContestantService.getContestantsByMatchId(matchId);
      
      // Emit socket event để cập nhật UI
      emitEliminatedContestants(matchId, contestants);
      emitContestantsAdmin(matchId, 1);
      
      return res.status(200).json({
        status: "success",
        message: "Cập nhật trạng thái thí sinh thành công",
        contestants: contestants
      });
    } catch (error) {
      console.error("Error in updateContestantsToEliminated:", error);
      return res.status(500).json({
        status: "error",
        message: error.message || "Đã có lỗi xảy ra khi cập nhật thí sinh"
      });
    }
  }
  /**
   * Dat: lấy danh sách 20 thí sinh vào vòng trong tương tự như cứu trợ chỉ khác là lấy cố định 20 thí sinh
   * có thêm tham số để loại trừ thí sinh gold (nếu có)
   * DÙNG:
   * - ContestantService : getContestants20WithInclusion
   * 
   * @return {Array} contestants - danh sách 20 thí sinh vào vòng trong
   * contestant_id, created_at, eliminated_at_question_order, id (của match_contestants), match_id, registration_number, status, updated_at
   */
  static async getContestants20WithInclusion(req, res) {
    try {
      const matchId = req.params.match_id;
      const contestantIdToExclude = await matchService.getGoldWinnerId(matchId); // ID của thí sinh cần loại trừ (nếu có)

      const contestants = await ContestantService.getContestants20WithInclusion(
        matchId,
        contestantIdToExclude
      );

      res.json({
        message: "Lấy danh sách 20 thí sinh thành công",
        contestants: contestants,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
module.exports = ContestantController;
