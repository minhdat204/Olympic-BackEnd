const MatchService = require("../services/matchService");
const ContestantService = require("../services/contestantService");
const { emitGoldWinUpdate } = require("../socketEmitters/matchEmitter");
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
    console.log(listRounds);
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
