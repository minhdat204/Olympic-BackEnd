const { getIO } = require("../socketManager");
const EmitVideoUrl = async (match_id, video_url) => {
  const io = getIO();
  console.log(`Emit ${video_url} ,match_id ${match_id} `);
  io.to(`match_${match_id}`).emit("url_video", { video_url });
};
module.exports = { EmitVideoUrl };
