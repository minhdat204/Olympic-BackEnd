const MatchService = require("../services/matchService");

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
exports.updateMatchStatus = async (req, res) => {
  try {
    const match = await MatchService.updateStatus(
      req.params.id,
      req.body.status
    );
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
