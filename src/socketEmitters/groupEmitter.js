const { getIO } = require("../socketManager");
const emitte_group_judge = async (match_id, judge_id) => {
  const io = getIO();
  io.to(`match_${match_id}`).emit("emitte_group_judge", {
    match_id,
    judge_id,
  });
};
const emitte_group_admin = async (match_id, groups) => {
  const io = getIO();
  io.to(`match_${match_id}`).emit("emitte_group_admin", {
    match_id,
    groups,
  });
};

module.exports = { emitte_group_admin, emitte_group_judge };
