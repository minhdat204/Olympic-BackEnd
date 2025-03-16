

const handleQuestionSockets = (io, socket) => {
    socket.on('show_answer', (questionId, matchId) => {
        console.log(`📢 Client ${socket.id} requested to show answer for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_answer');
    });

    socket.on('show_question', (questionId, matchId) => {
        console.log(`📢 Client ${socket.id} requested to show question for match_${matchId}`);
        io.to(`match_${matchId}`).emit('show_question');
    });


    
};

// Biến lưu trữ thông tin về thời gian của các trận đấu
const matchTimers = new Map();
// Xử lý các sự kiện liên quan đến thời gian
const handleTimerSockets = (io, socket) => {
    // Lắng nghe sự kiện từ màn hình điều khiển
    socket.on('start_pause_timer', (matchId, timeRemaining, currentQuestionId) => {
        // Get or create timer data for this match
        if (!matchTimers.has(matchId)) {
            matchTimers.set(matchId, {
                timerStatus: 'paused',
                time_remaining: timeRemaining,
                intervalId: null,
                current_question_id: currentQuestionId,
            });
        }
        
        const timerData = matchTimers.get(matchId);
        
        // trạng thái của timer
        if (timerData.timerStatus === 'paused') {
            timerData.timerStatus = 'running';
            // băắt đầu timer
            if (!timerData.intervalId) {
                timerData.intervalId = setInterval(() => {
                    if (timerData.timerStatus === 'running' && timerData.time_remaining > 0) {
                        timerData.time_remaining--;

                        const QuestionService = require('../services/questionService');
                        // ở đây tôi muốn truy vấn cập nhật time_left lại liên tục
                        try {
                            // cập nhật time_left của câu hỏi hiện tại
                            if (timerData.current_question_id) {
                                QuestionService.updateQuestionBy(timerData.current_question_id, 
                                    { time_left: timerData.time_remaining })
                                .catch(error => console.error(`Lỗi khi cập nhật time_left: ${error.message}`));
                            }
                        } catch (error) {
                            console.error(`Lỗi trong quá trình cập nhật timer: ${error.message}`);
                        }

                        // gửi status timer
                        io.to(`match_${matchId}`).emit('timer_update', { timeRemaining: timerData.time_remaining });
                        
                        // dọn dẹp khi hết thời gian
                        if (timerData.time_remaining === 0) {
                            clearInterval(timerData.intervalId);
                            timerData.intervalId = null;
                            timerData.timerStatus = 'paused';
                        }
                    }
                }, 1000);
            }
        } else {
            timerData.timerStatus = 'paused';
        }
        
        // câp nhật thời gian còn lại
        if (typeof timeRemaining === 'number') {
            timerData.time_remaining = timeRemaining;
        }
        
        // Gửi trạng thái và thời gian còn lại
        io.to(`match_${matchId}`).emit('timer_status', { 
            status: timerData.timerStatus, 
            timeRemaining: timerData.time_remaining 
        });
    });
    
    // dọjn dẹp
    socket.on('disconnect', () => {
        matchTimers.forEach((timerData, matchId) => {
            if (timerData.intervalId) {
                clearInterval(timerData.intervalId);
                matchTimers.delete(matchId);
            }
        });
    });
};

module.exports = { handleQuestionSockets, handleTimerSockets };