const QuestionService = require("../services/questionService");
// Biến lưu trữ thông tin về thời gian của các trận đấu
const matchTimers = new Map();
// Xử lý các sự kiện liên quan đến thời gian
const handleTimerSockets = (io, socket) => {
  /**
   * Lắng nghe sự kiện từ màn hình điều khiển
   * */

  // Sự kiện bắt đầu hoặc tạm dừng timer
  socket.on("start_pause_timer", (data) => {
    const { matchId, timeRemaining, currentQuestionId } = data;
    // lấsy hoặc tạo thông tin timer cho trận đấu
    if (!matchTimers.has(matchId)) {
      matchTimers.set(matchId, {
        timerStatus: "paused",
        time_remaining: timeRemaining,
        intervalId: null,
        current_question_id: currentQuestionId, // Thiết lập lần đầu
      });
    }

    const timerData = matchTimers.get(matchId);

    // Cập nhật current_question_id mỗi lần gọi sự kiện
    timerData.current_question_id = currentQuestionId;
    console.log(`current_question_id: ${timerData.current_question_id}`);

    // Dọn dẹp interval cũ nếu có
    if (timerData.intervalId) {
      clearInterval(timerData.intervalId);
      timerData.intervalId = null;
    }

    // Xử lý trạng thái của timer
    if (timerData.timerStatus === "paused") {
      timerData.timerStatus = "running";
      // Bắt đầu timer
      timerData.intervalId = setInterval(() => {
        if (
          timerData.timerStatus === "running" &&
          timerData.time_remaining > 0
        ) {
          timerData.time_remaining--;

          try {
            // Cập nhật time_left của câu hỏi hiện tại
            if (timerData.current_question_id) {
              QuestionService.updateQuestionBy(timerData.current_question_id, {
                time_left: timerData.time_remaining,
              }).catch((error) =>
                console.error(`Lỗi khi cập nhật time_left: ${error.message}`)
              );
            }
          } catch (error) {
            console.error(
              `Lỗi trong quá trình cập nhật timer: ${error.message}`
            );
          }

          // Gửi cập nhật thời gian còn lại
          io.to(`match_${matchId}`).emit("timer_update", {
            timeRemaining: timerData.time_remaining,
          });

          // Dọn dẹp khi hết thời gian
          if (timerData.time_remaining === 0) {
            clearInterval(timerData.intervalId);
            timerData.intervalId = null;
            timerData.timerStatus = "paused";
          }
        }
      }, 1000);
    } else {
      timerData.timerStatus = "paused";
    }

    // Cập nhật thời gian còn lại
    if (typeof timeRemaining === "number") {
      timerData.time_remaining = timeRemaining;
    }

    // Gửi trạng thái và thời gian còn lại
    io.to(`match_${matchId}`).emit("timer_status", {
      status: timerData.timerStatus,
      timeRemaining: timerData.time_remaining,
    });
  });

  // Add this new handler inside handleTimerSockets function

  // Reset timer event
  socket.on("reset_timer", async (data) => {
    const { matchId, questionId } = data;
    console.log(
      `📢 Resetting timer for match ${matchId}, question ${questionId}`
    );

    // Get timer data for this match
    if (matchTimers.has(matchId)) {
      const timerData = matchTimers.get(matchId);

      // Stop any running timer
      if (timerData.intervalId) {
        clearInterval(timerData.intervalId);
        timerData.intervalId = null;
      }

      // Reset timer status
      timerData.timerStatus = "paused";

      try {
        // Get original timer value from database
        const question = await QuestionService.getQuestionById(questionId);
        const originalTime = question.timer;

        // Update timer in memory
        timerData.time_remaining = originalTime;
        timerData.current_question_id = questionId;

        // Update database
        await QuestionService.updateQuestionBy(questionId, {
          time_left: originalTime,
        });

        // Notify all clients
        io.to(`match_${matchId}`).emit("timer_status", {
          status: "paused",
          timeRemaining: originalTime,
        });

        // Send specific reset event to trigger any special UI handling
        io.to(`match_${matchId}`).emit("time_left_reset", {
          timeLeft: originalTime,
        });
      } catch (error) {
        console.error(`Error resetting timer: ${error.message}`);
      }
    }
  });

  // Add this new handler inside handleTimerSockets function
  socket.on("update_timer", async (data) => {
    const { matchId, timeRemaining, questionId } = data;
    console.log(
      `📢 Updating timer for match ${matchId}, question ${questionId} to ${timeRemaining}s`
    );

    // Get or create timer data for this match
    if (!matchTimers.has(matchId)) {
      matchTimers.set(matchId, {
        timerStatus: "paused",
        time_remaining: timeRemaining,
        intervalId: null,
        current_question_id: questionId,
      });
    }

    const timerData = matchTimers.get(matchId);

    // Stop any running timer
    if (timerData.intervalId) {
      clearInterval(timerData.intervalId);
      timerData.intervalId = null;
    }

    // Update timer data
    timerData.timerStatus = "paused";
    timerData.time_remaining = timeRemaining;
    timerData.current_question_id = questionId;

    try {
      // Update database
      await QuestionService.updateQuestionBy(questionId, {
        time_left: timeRemaining,
        timer : timeRemaining,
      });

      // Notify all clients in the match room
      io.to(`match_${matchId}`).emit("timer_status", {
        status: "paused",
        timeRemaining: timeRemaining,
      });
      io.to(`match_${matchId}`).emit("time_left_reset", {
        timeLeft: timeRemaining,
      });
    } catch (error) {
      console.error(`Error updating timer: ${error.message}`);
    }
  });
};

module.exports = { handleTimerSockets };
