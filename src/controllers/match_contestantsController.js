const matchContestantService = require("../services/matchContestantService");

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

// lấy danh sách các trận đấu
exports.getMatchContestants = async (req, res) => {
  try {
    const match_contestants =
      await matchContestantService.getMatchContestants();
    res.json(match_contestants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// chi tiết trận đấu
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

// cập nhật trạng thái trận đấu
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
exports.getListStatus = async (req, res) => {
  try {
    const listStatus = await matchContestantService.getListStatus();
    res.json({ listStatus: listStatus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
