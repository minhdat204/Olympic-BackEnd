const matchContestantService = require("../services/matchContestantService");
const ContestantService = require("../services/contestantService");
const { emit } = require("process");
const {
  emitTotalContestants,
  emitContestants,
  emitContestantsjudge_id,
  emitContestantsAdmin,
} = require("../socketEmitters/contestantEmitter");
// tạo trận đấu

exports.createMatchContestants = async (req, res) => {
  try {
    const match_contestant =
      await matchContestantService.createMatchContestants(req.body);
    res.status(201).json(match_contestant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách các trận đấu
exports.getMatchContestants = async (req, res) => {
  try {
    const match_contestants =
      await matchContestantService.getMatchContestants();
    res.json(match_contestants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Chi tiết trận đấu
exports.getMatchContestant = async (req, res) => {
  try {
    const match_contestant = await matchContestantService.getMatchContestant(
      req.params.id
    );
    res.json(match_contestant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// cập nhật trạng thái trận đấu của trọng tài
exports.updateMatchContestantsJudge = async (req, res) => {
  try {
    const { match_id, judge_id, status, eliminated_at_question_order } =
      req.body;
    await matchContestantService.updateStatus(
      req.params.id,
      status,
      eliminated_at_question_order
    );
    const total = await ContestantService.getContestantTotal(match_id);
    emitTotalContestants(match_id, total.total, total.remaining);
    const contestants = await ContestantService.getContestantsByMatchId(
      match_id
    );
    emitContestants(match_id, contestants);
    const contestants_judge_id =
      await ContestantService.getContestantByJudgeAndMatch(judge_id, match_id);
    emitContestantsjudge_id(match_id, judge_id, contestants_judge_id);
    res.json(contestants_judge_id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật trạng thái trận đấu
exports.updateMatchContestants = async (req, res) => {
  try {
    const match_contestant =
      await matchContestantService.updateMatchContestants(
        req.params.id,
        req.body
      );
    res.json(match_contestant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa trận đấu
exports.deleteMatch = async (req, res) => {
  try {
    const match = await matchContestantService.deleteMatchContestant(
      req.params.id
    );
    res.json("Xóa thí sinh trong trận đấu thành công");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách trạng thái
exports.getListStatus = async (req, res) => {
  try {
    const listStatus = await matchContestantService.getListStatus();
    res.json({ listStatus: listStatus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách thí sinh theo trận đấu
exports.getListContestantsByMatch = async (req, res) => {
  try {
    const list = await matchContestantService.getListContestantsByMatch(
      req.body.matches
    );
    res.json({ list: list });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật nhóm thí sinh trong trận đấu
exports.updateContestantGroupByMatch = async (req, res) => {
  try {
    const status = await matchContestantService.updateContestantGroupByMatch(
      req.body.match_id,
      req.body.matches
    );
    res.json({ status: status });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật trạng thái
exports.updateStatus = async (req, res) => {
  try {
    await matchContestantService.updateStatus(req.params.id, req.body.status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa kết quả chia nhóm
exports.deleteDividedGroup = async (req, res) => {
  try {
    const match_id = req.params.match_id;
    await matchContestantService.deleteDividedGroup(match_id);
    res.status(200).json({ message: "Xóa kết quả chia nhóm thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Lỗi khi xóa kết quả chia nhóm", details: error.message });
  }
};

// Kiểm tra trạng thái chia nhóm
exports.checkDivided = async (req, res) => {
  try {
    const match_id = req.params.match_id;
    const isDivided = await matchContestantService.checkDivided(match_id);
    res.status(200).json({ isDivided });
  } catch (error) {
    res.status(500).json({
      error: "Lỗi khi kiểm tra trạng thái chia nhóm",
      details: error.message,
    });
  }
};
// Cập nhật trạng thái thí sinh của
exports.updateMatchContestantsAdmin = async (req, res) => {
  try {
    const { match_id, status, question_order } = req.body;
    await matchContestantService.updateStatus(req.params.id, status);
    const total = await ContestantService.getContestantTotal(match_id);
    emitTotalContestants(match_id, total.total, total.remaining);
    const contestants = await ContestantService.getContestantsByMatchId(
      match_id
    );
    emitContestants(match_id, contestants);
    emitContestantsAdmin(match_id, 1);
    res.json("Thành công");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//
exports.updateContestantGroupByMatchLoai = async (req, res) => {
  try {
    const { match_id, question_order } = req.body;

    const status =
      await matchContestantService.updateContestantGroupByMatchLoai(
        match_id,
        question_order
      );
    const contestants = await ContestantService.getContestantsByMatchId(
      match_id
    );
    emitContestants(match_id, contestants);
    res.json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
