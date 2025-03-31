const MatchService = require("../services/matchService");
const ContestantService = require("../services/contestantService");
const { emitGoldWinUpdate } = require("../socketEmitters/matchEmitter");
const { json } = require("sequelize");
// tạo trận đấu
exports.createMatch = async (req, res) => {
  try {
    const match = await MatchService.createMatch(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// lấy danh sách các trận đấu
exports.getMatches = async (req, res) => {
  try {
    const matches = await MatchService.getMatches();
    res.json(matches);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// chi tiết trận đấu
exports.getMatchById = async (req, res) => {
  try {
    const match = await MatchService.getMatchById(req.params.id);
    res.json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// cập nhật trạng thái trận đấu
exports.updateMatch = async (req, res) => {
  try {
    const match = await MatchService.updateMatch(req.params.id, req.body);
    res.json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteMatch = async (req, res) => {
  try {
    const match = await MatchService.deteleMatch(req.params.id);
    res.json("Xóa trận đấu thành công");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateMatchBy = async (req, res) => {
  try {
    const match = await MatchService.updateMatchBy(req.params.id, req.body);
    res.json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getListRounds = async (req, res) => {
  try {
    const listRounds = await MatchService.getListRounds();
    res.json({ listRounds: listRounds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getMatchByIdRounds = async (req, res) => {
  try {
    const listMatchByIdRounds = await MatchService.getMatchByIdRounds(
      req.params.round_name
    );
    res.json({ listMatch: listMatchByIdRounds });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getListStatus = async (req, res) => {
  try {
    const listStatus = await MatchService.getListStatus();
    res.json({ listStatus: listStatus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.UpdateWinGold = async (req, res) => {
  try {
    const { contestant_id } = req.body;
    const { id } = req.params;
    await MatchService.UpdateWinGold(id, contestant_id);
    const info = await ContestantService.getContestantByGoldMatch(id);
    emitGoldWinUpdate(id, info);
    res.json({ info: info });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * gọi api từ RescueControl.jsx
 */
// Dat: caạp nhật rescue_1, rescue_2, plane
exports.updateRescue = async (req, res) => {
  try {
    // lấy thông tin trận đấu hiện tại
    // const currentMatch = await MatchService.getMatchById(req.params.id);
    
    // tạo mới một object updatedData từ req.body
    const updatedData = { ...req.body };
    
    // Kiểm tra nếu rescue_1 được cung cấp và không phải là undefined => cộng dồn 
    // if (updatedData.rescued_count_1 !== undefined) {
    //   const currentCount = currentMatch.rescued_count_1 || 0;
    //   updatedData.rescued_count_1 = currentCount + parseInt(updatedData.rescued_count_1);
    // }
    
    // Kiểm tra nếu rescue_2 được cung cấp và không phải là undefined => cộng dồn 
    // if (updatedData.rescued_count_2 !== undefined) {
    //   const currentCount = currentMatch.rescued_count_2 || 0;
    //   updatedData.rescued_count_2 = currentCount + parseInt(updatedData.rescued_count_2);
    // }
    
    // Cập nhật lại thông tin trận đấu với dữ liệu mới
    const match = await MatchService.updateRescue(req.params.id, updatedData);
    res.json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getListMatchByJudge = async (req, res) => {
  try {
    const { judge_id } = req.params;
    const list = await MatchService.getListMatchByJudge(judge_id);
    res.json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
