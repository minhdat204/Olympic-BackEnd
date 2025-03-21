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
