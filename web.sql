-- --------------------------------------------------------
-- Máy chủ:                      127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Phiên bản:           12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table olympic_tinhoc.answers
CREATE TABLE IF NOT EXISTS `answers` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `score` tinyint DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `contestant_id` smallint DEFAULT NULL,
  `question_id` smallint DEFAULT NULL,
  `match_id` smallint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contestant_id` (`contestant_id`),
  KEY `question_id` (`question_id`),
  KEY `match_id` (`match_id`),
  CONSTRAINT `answers_ibfk_73` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_74` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_75` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.answers: ~100 rows (approximately)
INSERT INTO `answers` (`id`, `score`, `is_correct`, `contestant_id`, `question_id`, `match_id`, `created_at`, `updated_at`) VALUES
	(1, 1, 0, 14, 13, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(2, 1, 1, 18, 5, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(3, 1, 1, 12, 6, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(4, 1, 1, 14, 12, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(5, 1, 0, 25, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(6, 1, 0, 31, 6, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(7, 1, 0, 33, 13, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(8, 1, 0, 50, 12, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(9, 1, 0, 42, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(10, 1, 0, 37, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(11, 1, 1, 51, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(12, 1, 0, 20, 5, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(13, 1, 1, 1, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(14, 1, 1, 6, 2, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(15, 1, 0, 8, 6, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(16, 1, 1, 34, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(17, 1, 1, 12, 5, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(18, 1, 1, 55, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(19, 1, 1, 40, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(20, 1, 1, 21, 5, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(21, 1, 1, 40, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(22, 1, 0, 24, 13, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(23, 1, 0, 49, 2, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(24, 1, 1, 44, 4, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(25, 1, 0, 34, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(26, 1, 0, 28, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(27, 1, 0, 45, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(28, 1, 0, 16, 6, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(29, 1, 1, 27, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(30, 1, 0, 52, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(31, 1, 0, 33, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(32, 1, 0, 53, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(33, 1, 0, 25, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(34, 1, 0, 53, 4, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(35, 1, 0, 60, 6, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(36, 1, 1, 41, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(37, 1, 1, 55, 5, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(38, 1, 0, 46, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(39, 1, 1, 24, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(40, 1, 1, 6, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(41, 1, 0, 25, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(42, 1, 0, 15, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(43, 1, 1, 48, 2, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(44, 1, 1, 3, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(45, 1, 1, 6, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(46, 1, 1, 26, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(47, 1, 0, 25, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(48, 1, 0, 14, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(49, 1, 0, 40, 4, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(50, 1, 0, 58, 7, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(51, 1, 1, 55, 12, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(52, 1, 0, 4, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(53, 1, 1, 10, 13, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(54, 1, 1, 3, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(55, 1, 1, 13, 6, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(56, 1, 0, 12, 2, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(57, 1, 1, 57, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(58, 1, 0, 45, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(59, 1, 0, 46, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(60, 1, 1, 41, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(61, 1, 0, 43, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(62, 1, 1, 20, 4, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(63, 1, 1, 58, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(64, 1, 1, 4, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(65, 1, 1, 41, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(66, 1, 0, 10, 7, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(67, 1, 0, 37, 2, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(68, 1, 1, 31, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(69, 1, 0, 36, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(70, 1, 1, 51, 2, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(71, 1, 0, 34, 5, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(72, 1, 0, 24, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(73, 1, 1, 31, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(74, 1, 1, 46, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(75, 1, 0, 23, 12, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(76, 1, 0, 5, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(77, 1, 0, 14, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(78, 1, 0, 44, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(79, 1, 1, 31, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(80, 1, 1, 41, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(81, 1, 1, 1, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(82, 1, 1, 51, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(83, 1, 1, 50, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(84, 1, 0, 60, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(85, 1, 1, 20, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(86, 1, 0, 3, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(87, 1, 1, 59, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(88, 1, 1, 11, 12, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(89, 1, 1, 47, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(90, 1, 0, 37, 1, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(91, 1, 1, 14, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(92, 1, 0, 36, 8, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(93, 1, 0, 31, 3, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(94, 1, 0, 29, 11, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(95, 1, 1, 58, 9, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(96, 1, 0, 21, 4, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(97, 1, 0, 43, 6, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(98, 1, 1, 3, 4, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(99, 1, 1, 55, 7, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(100, 1, 1, 22, 12, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11');

-- Dumping structure for table olympic_tinhoc.awards
CREATE TABLE IF NOT EXISTS `awards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `awards_name` enum('Giải nhất','Giải nhì','Giải ba','Giải video ấn tượng','Giải Gold') NOT NULL,
  `contestant_id` smallint DEFAULT NULL,
  `video_submission_id` smallint DEFAULT NULL,
  `question_id` smallint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `video_submission` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contestant_id` (`contestant_id`),
  KEY `video_submission_id` (`video_submission_id`),
  KEY `video_submission` (`video_submission`),
  CONSTRAINT `awards_ibfk_72` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `awards_ibfk_73` FOREIGN KEY (`video_submission_id`) REFERENCES `video_submissions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `awards_ibfk_74` FOREIGN KEY (`video_submission`) REFERENCES `video_submissions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.awards: ~0 rows (approximately)

-- Dumping structure for table olympic_tinhoc.contestants
CREATE TABLE IF NOT EXISTS `contestants` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `class` varchar(20) NOT NULL,
  `class_year` tinyint NOT NULL,
  `qualifying_score` tinyint DEFAULT NULL,
  `group_id` smallint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `contestants_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.contestants: ~60 rows (approximately)
INSERT INTO `contestants` (`id`, `fullname`, `email`, `class`, `class_year`, `qualifying_score`, `group_id`, `created_at`, `updated_at`) VALUES
	(1, 'Thí sinh 1', 'thisinh1@gmail.com', '10A1', 22, 52, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(2, 'Thí sinh 2', 'thisinh2@gmail.com', '10A1', 22, 24, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(3, 'Thí sinh 3', 'thisinh3@gmail.com', '10A1', 22, 10, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(4, 'Thí sinh 4', 'thisinh4@gmail.com', '10A1', 22, 27, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(5, 'Thí sinh 5', 'thisinh5@gmail.com', '10A1', 22, 77, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(6, 'Thí sinh 6', 'thisinh6@gmail.com', '10A1', 22, 44, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(7, 'Thí sinh 7', 'thisinh7@gmail.com', '10A1', 22, 67, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(8, 'Thí sinh 8', 'thisinh8@gmail.com', '10A1', 22, 66, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(9, 'Thí sinh 9', 'thisinh9@gmail.com', '10A1', 22, 71, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(10, 'Thí sinh 10', 'thisinh10@gmail.com', '10A1', 22, 18, 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(11, 'Thí sinh 11', 'thisinh11@gmail.com', '10A1', 22, 86, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(12, 'Thí sinh 12', 'thisinh12@gmail.com', '10A1', 22, 6, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(13, 'Thí sinh 13', 'thisinh13@gmail.com', '10A1', 22, 65, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(14, 'Thí sinh 14', 'thisinh14@gmail.com', '10A1', 22, 83, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(15, 'Thí sinh 15', 'thisinh15@gmail.com', '10A1', 22, 88, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(16, 'Thí sinh 16', 'thisinh16@gmail.com', '10A2', 22, 22, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(17, 'Thí sinh 17', 'thisinh17@gmail.com', '10A2', 22, 87, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(18, 'Thí sinh 18', 'thisinh18@gmail.com', '10A2', 22, 73, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(19, 'Thí sinh 19', 'thisinh19@gmail.com', '10A2', 22, 44, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(20, 'Thí sinh 20', 'thisinh20@gmail.com', '10A2', 22, 95, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(21, 'Thí sinh 21', 'thisinh21@gmail.com', '10A2', 22, 33, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(22, 'Thí sinh 22', 'thisinh22@gmail.com', '10A2', 22, 22, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(23, 'Thí sinh 23', 'thisinh23@gmail.com', '10A2', 22, 15, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(24, 'Thí sinh 24', 'thisinh24@gmail.com', '10A2', 22, 6, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(25, 'Thí sinh 25', 'thisinh25@gmail.com', '10A2', 22, 23, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(26, 'Thí sinh 26', 'thisinh26@gmail.com', '10A2', 22, 81, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(27, 'Thí sinh 27', 'thisinh27@gmail.com', '10A2', 22, 18, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(28, 'Thí sinh 28', 'thisinh28@gmail.com', '10A2', 22, 27, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(29, 'Thí sinh 29', 'thisinh29@gmail.com', '10A2', 22, 74, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(30, 'Thí sinh 30', 'thisinh30@gmail.com', '10A2', 22, 3, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(31, 'Thí sinh 31', 'thisinh31@gmail.com', '10A3', 22, 73, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(32, 'Thí sinh 32', 'thisinh32@gmail.com', '10A3', 22, 48, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(33, 'Thí sinh 33', 'thisinh33@gmail.com', '10A3', 22, 30, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(34, 'Thí sinh 34', 'thisinh34@gmail.com', '10A3', 22, 76, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(35, 'Thí sinh 35', 'thisinh35@gmail.com', '10A3', 22, 73, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(36, 'Thí sinh 36', 'thisinh36@gmail.com', '10A3', 22, 18, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(37, 'Thí sinh 37', 'thisinh37@gmail.com', '10A3', 22, 84, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(38, 'Thí sinh 38', 'thisinh38@gmail.com', '10A3', 22, 58, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(39, 'Thí sinh 39', 'thisinh39@gmail.com', '10A3', 22, 38, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(40, 'Thí sinh 40', 'thisinh40@gmail.com', '10A3', 22, 64, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(41, 'Thí sinh 41', 'thisinh41@gmail.com', '10A3', 22, 100, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(42, 'Thí sinh 42', 'thisinh42@gmail.com', '10A3', 22, 52, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(43, 'Thí sinh 43', 'thisinh43@gmail.com', '10A3', 22, 51, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(44, 'Thí sinh 44', 'thisinh44@gmail.com', '10A3', 22, 73, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(45, 'Thí sinh 45', 'thisinh45@gmail.com', '10A3', 22, 67, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(46, 'Thí sinh 46', 'thisinh46@gmail.com', '10A4', 22, 38, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(47, 'Thí sinh 47', 'thisinh47@gmail.com', '10A4', 22, 55, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(48, 'Thí sinh 48', 'thisinh48@gmail.com', '10A4', 22, 22, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(49, 'Thí sinh 49', 'thisinh49@gmail.com', '10A4', 22, 65, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(50, 'Thí sinh 50', 'thisinh50@gmail.com', '10A4', 22, 29, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(51, 'Thí sinh 51', 'thisinh51@gmail.com', '10A4', 22, 1, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(52, 'Thí sinh 52', 'thisinh52@gmail.com', '10A4', 22, 83, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(53, 'Thí sinh 53', 'thisinh53@gmail.com', '10A4', 22, 31, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(54, 'Thí sinh 54', 'thisinh54@gmail.com', '10A4', 22, 54, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(55, 'Thí sinh 55', 'thisinh55@gmail.com', '10A4', 22, 41, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(56, 'Thí sinh 56', 'thisinh56@gmail.com', '10A4', 22, 54, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(57, 'Thí sinh 57', 'thisinh57@gmail.com', '10A4', 22, 99, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(58, 'Thí sinh 58', 'thisinh58@gmail.com', '10A4', 22, 69, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(59, 'Thí sinh 59', 'thisinh59@gmail.com', '10A4', 22, 88, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(60, 'Thí sinh 60', 'thisinh60@gmail.com', '10A4', 22, 6, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11');

-- Dumping structure for table olympic_tinhoc.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  `match_id` smallint DEFAULT NULL,
  `judge_id` smallint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `match_id` (`match_id`),
  KEY `judge_id` (`judge_id`),
  CONSTRAINT `groups_ibfk_49` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `groups_ibfk_50` FOREIGN KEY (`judge_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.groups: ~6 rows (approximately)
INSERT INTO `groups` (`id`, `group_name`, `match_id`, `judge_id`, `created_at`, `updated_at`) VALUES
	(1, 'Nhóm 1', 1, 2, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(2, 'Nhóm 2', 1, 3, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(3, 'Nhóm 3', 1, 4, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(4, 'Nhóm 4', 1, 5, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(5, 'Nhóm 5', 1, 6, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(6, 'Nhóm 6', 1, 7, '2025-03-25 07:03:11', '2025-03-25 07:03:11');

-- Dumping structure for table olympic_tinhoc.matches
CREATE TABLE IF NOT EXISTS `matches` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `match_name` varchar(255) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('Chưa diễn ra','Đang diễn ra','Đã kết thúc') DEFAULT 'Chưa diễn ra',
  `current_question_id` smallint DEFAULT NULL,
  `rescue_1` tinyint DEFAULT '-1',
  `rescue_2` tinyint DEFAULT '-1',
  `plane` tinyint DEFAULT '-1',
  `rescued_count_1` tinyint DEFAULT '-1',
  `rescued_count_2` tinyint DEFAULT '-1',
  `class_names` json DEFAULT NULL,
  `round_name` enum('Vòng loại','Tứ Kết','Bán Kết','Chung Kết') NOT NULL,
  `gold_winner_id` smallint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `current_question_id` (`current_question_id`),
  KEY `gold_winner_id` (`gold_winner_id`),
  CONSTRAINT `matches_ibfk_49` FOREIGN KEY (`current_question_id`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `matches_ibfk_50` FOREIGN KEY (`gold_winner_id`) REFERENCES `contestants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.matches: ~1 rows (approximately)
INSERT INTO `matches` (`id`, `match_name`, `start_time`, `end_time`, `status`, `current_question_id`, `rescue_1`, `rescue_2`, `plane`, `rescued_count_1`, `rescued_count_2`, `class_names`, `round_name`, `gold_winner_id`, `created_at`, `updated_at`) VALUES
	(1, 'Trận đấu bán kết khóa 23', '2025-03-25 07:03:11', NULL, 'Chưa diễn ra', 4, 3, 6, 1, 8, 6, NULL, 'Bán Kết', 14, '2025-03-25 07:03:11', '2025-03-26 07:11:11');

-- Dumping structure for table olympic_tinhoc.match_contestants
CREATE TABLE IF NOT EXISTS `match_contestants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registration_number` smallint DEFAULT NULL,
  `status` enum('Chưa thi','Đang thi','Xác nhận 1','Xác nhận 2','Bị loại','Cấm thi','Qua vòng') DEFAULT 'Chưa thi',
  `eliminated_at_question_order` tinyint DEFAULT NULL,
  `match_id` smallint NOT NULL,
  `contestant_id` smallint NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `match_id` (`match_id`),
  KEY `contestant_id` (`contestant_id`),
  CONSTRAINT `match_contestants_ibfk_49` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `match_contestants_ibfk_50` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.match_contestants: ~60 rows (approximately)
INSERT INTO `match_contestants` (`id`, `registration_number`, `status`, `eliminated_at_question_order`, `match_id`, `contestant_id`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Xác nhận 2', NULL, 1, 1, '2025-03-25 07:03:11', '2025-03-25 13:37:14'),
	(2, 2, 'Xác nhận 2', NULL, 1, 2, '2025-03-25 07:03:11', '2025-03-25 13:37:14'),
	(3, 3, 'Xác nhận 2', NULL, 1, 3, '2025-03-25 07:03:11', '2025-03-25 13:05:03'),
	(4, 4, 'Xác nhận 2', NULL, 1, 4, '2025-03-25 07:03:11', '2025-03-25 13:41:59'),
	(5, 5, 'Xác nhận 2', NULL, 1, 5, '2025-03-25 07:03:11', '2025-03-25 13:41:59'),
	(6, 6, 'Đang thi', 10, 1, 6, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(7, 7, 'Đang thi', 10, 1, 7, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(8, 8, 'Đang thi', 10, 1, 8, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(9, 9, 'Xác nhận 2', NULL, 1, 9, '2025-03-25 07:03:11', '2025-03-25 13:05:03'),
	(10, 10, 'Xác nhận 2', 10, 1, 10, '2025-03-25 07:03:11', '2025-03-26 02:42:09'),
	(11, 11, 'Đang thi', 10, 1, 11, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(12, 12, 'Đang thi', 10, 1, 12, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(13, 13, 'Đang thi', 10, 1, 13, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(14, 14, 'Đang thi', 10, 1, 14, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(15, 15, 'Đang thi', 10, 1, 15, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(16, 16, 'Xác nhận 2', 10, 1, 16, '2025-03-25 07:03:11', '2025-03-26 02:45:41'),
	(17, 17, 'Đang thi', 10, 1, 17, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(18, 18, 'Xác nhận 2', 10, 1, 18, '2025-03-25 07:03:11', '2025-03-26 02:45:42'),
	(19, 19, 'Đang thi', 10, 1, 19, '2025-03-25 07:03:11', '2025-03-26 02:49:49'),
	(20, 20, 'Xác nhận 2', 10, 1, 20, '2025-03-25 07:03:11', '2025-03-26 02:45:41'),
	(21, 21, 'Cấm thi', NULL, 1, 21, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(22, 22, 'Cấm thi', NULL, 1, 22, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(23, 23, 'Xác nhận 1', NULL, 1, 23, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(24, 24, 'Đang thi', NULL, 1, 24, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(25, 25, 'Đang thi', NULL, 1, 25, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(26, 26, 'Đang thi', 6, 1, 26, '2025-03-25 07:03:11', '2025-03-25 18:14:35'),
	(27, 27, 'Xác nhận 1', NULL, 1, 27, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(28, 28, 'Đang thi', NULL, 1, 28, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(29, 29, 'Đang thi', NULL, 1, 29, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(30, 30, 'Đang thi', NULL, 1, 30, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(31, 31, 'Cấm thi', NULL, 1, 31, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(32, 32, 'Xác nhận 1', NULL, 1, 32, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(33, 33, 'Đang thi', 1, 1, 33, '2025-03-25 07:03:11', '2025-03-25 18:14:35'),
	(34, 34, 'Đang thi', NULL, 1, 34, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(35, 35, 'Đang thi', NULL, 1, 35, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(36, 36, 'Xác nhận 1', NULL, 1, 36, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(37, 37, 'Đang thi', 2, 1, 37, '2025-03-25 07:03:11', '2025-03-25 18:14:35'),
	(38, 38, 'Đang thi', NULL, 1, 38, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(39, 39, 'Đang thi', 8, 1, 39, '2025-03-25 07:03:11', '2025-03-25 18:14:35'),
	(40, 40, 'Đang thi', NULL, 1, 40, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(41, 41, 'Đang thi', NULL, 1, 41, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(42, 42, 'Đang thi', NULL, 1, 42, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(43, 43, 'Đang thi', NULL, 1, 43, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(44, 44, 'Đang thi', NULL, 1, 44, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(45, 45, 'Đang thi', NULL, 1, 45, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(46, 46, 'Đang thi', NULL, 1, 46, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(47, 47, 'Cấm thi', NULL, 1, 47, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(48, 48, 'Đang thi', 10, 1, 48, '2025-03-25 07:03:11', '2025-03-25 18:14:35'),
	(49, 49, 'Đang thi', 11, 1, 49, '2025-03-25 07:03:11', '2025-03-25 18:14:35'),
	(50, 50, 'Đang thi', 13, 1, 50, '2025-03-25 07:03:11', '2025-03-25 18:14:35'),
	(51, 51, 'Đang thi', NULL, 1, 51, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(52, 52, 'Xác nhận 1', NULL, 1, 52, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(53, 53, 'Xác nhận 1', NULL, 1, 53, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(54, 54, 'Cấm thi', NULL, 1, 54, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(55, 55, 'Đang thi', NULL, 1, 55, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(56, 56, 'Đang thi', NULL, 1, 56, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(57, 57, 'Đang thi', NULL, 1, 57, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(58, 58, 'Đang thi', NULL, 1, 58, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(59, 59, 'Đang thi', NULL, 1, 59, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(60, 60, 'Xác nhận 1', NULL, 1, 60, '2025-03-25 07:03:11', '2025-03-25 07:03:11');

-- Dumping structure for table olympic_tinhoc.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `question_text` text,
  `question_intro` text,
  `question_topic` text,
  `question_explanation` text,
  `question_type` enum('Trắc Nghiệm','Hình Ảnh','Âm Thanh','Video','Tự Luận') NOT NULL,
  `media_url` json DEFAULT NULL,
  `correct_answer` text,
  `correct_answer_type` enum('Text','Image','Audio','Video') NOT NULL DEFAULT 'Text',
  `options` json DEFAULT NULL,
  `question_order` tinyint DEFAULT NULL,
  `timer` smallint NOT NULL,
  `time_left` smallint DEFAULT NULL,
  `dificulty` enum('Alpha','Beta','RC','Gold') NOT NULL,
  `match_id` smallint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `match_id` (`match_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.questions: ~13 rows (approximately)
INSERT INTO `questions` (`id`, `question_text`, `question_intro`, `question_topic`, `question_explanation`, `question_type`, `media_url`, `correct_answer`, `correct_answer_type`, `options`, `question_order`, `timer`, `time_left`, `dificulty`, `match_id`, `created_at`, `updated_at`) VALUES
	(1, 'Ngôn ngữ lập trình nào phổ biến nhất năm 2025?', 'Chọn một ngôn ngữ lập trình được sử dụng rộng rãi.', 'Lập trình', 'Theo khảo sát của Stack Overflow, ngôn ngữ này được sử dụng nhiều nhất.', 'Tự Luận', '[]', 'Python', 'Text', '[]', 1, 30, 30, 'Alpha', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(2, 'Hệ điều hành nào được phát triển bởi Microsoft?', 'Chọn hệ điều hành đúng.', 'Hệ điều hành', 'Microsoft phát triển hệ điều hành phổ biến này.', 'Trắc Nghiệm', '[]', 'Windows', 'Text', '[{"text": "Windows", "media_url": null}, {"text": "Linux", "media_url": null}, {"text": "macOS", "media_url": null}, {"text": "Ubuntu", "media_url": null}]', 2, 30, 30, 'Alpha', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(3, 'Hình ảnh này là logo của ngôn ngữ lập trình nào?', 'Chọn ngôn ngữ lập trình tương ứng với hình ảnh.', 'Lập trình', 'Logo này thuộc về một ngôn ngữ lập trình nổi tiếng.', 'Hình Ảnh', '["/uploads/questions/python_logo.png"]', '/uploads/questions/python_logo.png', 'Image', '[]', 3, 30, 30, 'Alpha', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(4, 'Nghe đoạn âm thanh và cho biết đây là âm thanh của hệ điều hành nào?', 'Lắng nghe và chọn đáp án chính xác.', 'Âm thanh', 'Âm thanh này rất quen thuộc với người dùng máy tính.', 'Âm Thanh', '"[\\"/uploads/questions/1742970970287_2m.mp3\\"]"', '/uploads/questions/1742972950538_1m.mp3', 'Audio', '[]', 4, 30, 30, 'Alpha', 1, '2025-03-25 07:03:11', '2025-03-26 07:09:10'),
	(5, 'Công nghệ nào sau đây liên quan đến bảo mật mạng?', 'Chọn công nghệ bảo mật phù hợp.', 'Bảo mật', 'Công nghệ này giúp bảo vệ dữ liệu trên internet.', 'Trắc Nghiệm', '[]', 'SSL/TLS', 'Text', '[{"text": "SSL/TLS", "media_url": null}, {"text": "Blockchain", "media_url": null}, {"text": "Wi-Fi", "media_url": null}, {"text": "AI", "media_url": null}]', 5, 30, 30, 'Beta', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(6, 'Phương pháp nào được dùng để mã hóa dữ liệu?', 'Chọn phương pháp mã hóa đúng.', 'Bảo mật', 'Phương pháp này giúp dữ liệu an toàn hơn.', 'Trắc Nghiệm', '[]', 'AES', 'Text', '[{"text": "AES", "media_url": null}, {"text": "RSA", "media_url": null}, {"text": "MD5", "media_url": null}, {"text": "SHA-256", "media_url": null}]', 6, 30, 30, 'Beta', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(7, 'Phần mềm nào là một trình duyệt web?', 'Chọn trình duyệt web chính xác.', 'Phần mềm', 'Phần mềm này giúp truy cập internet.', 'Trắc Nghiệm', '[]', 'Google Chrome', 'Text', '[{"text": "Google Chrome", "media_url": "/uploads/questions/chrome_logo.png"}, {"text": "Microsoft Word", "media_url": "/uploads/questions/word_logo.png"}, {"text": "Photoshop", "media_url": "/uploads/questions/photoshop_logo.png"}, {"text": "Visual Studio Code", "media_url": "/uploads/questions/vscode_logo.png"}]', 7, 30, 30, 'Beta', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(8, 'Hệ thống quản lý cơ sở dữ liệu nào là mã nguồn mở?', 'Chọn hệ thống phù hợp.', 'Cơ sở dữ liệu', 'Hệ thống này được sử dụng phổ biến trên web.', 'Trắc Nghiệm', '[]', 'MySQL', 'Text', '[{"text": "MySQL", "media_url": null}, {"text": "SQL Server", "media_url": null}, {"text": "Oracle", "media_url": null}, {"text": "MongoDB", "media_url": null}]', 8, 30, 30, 'Beta', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(9, 'Giao thức nào được sử dụng để truyền dữ liệu trên web?', 'Chọn giao thức chính xác.', 'Mạng máy tính', 'Giao thức này giúp truyền dữ liệu trên internet.', 'Trắc Nghiệm', '[]', 'HTTP', 'Text', '[{"text": "HTTP", "media_url": null}, {"text": "FTP", "media_url": null}, {"text": "SMTP", "media_url": null}, {"text": "SSH", "media_url": null}]', 9, 30, 30, 'RC', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(10, 'Công cụ nào giúp quản lý mã nguồn?', 'Chọn công cụ phù hợp.', 'Lập trình', 'Công cụ này giúp quản lý và theo dõi thay đổi.', 'Video', '"[\\"/uploads/questions/test.mp4\\"]"', '/uploads/questions/1742972836657_abc.mp4', 'Video', '[]', 10, 30, 30, 'RC', 1, '2025-03-25 07:03:11', '2025-03-26 07:07:16'),
	(11, 'Dịch vụ nào của Google cung cấp lưu trữ đám mây?', 'Chọn dịch vụ lưu trữ đám mây chính xác.', 'Điện toán đám mây', 'Dịch vụ này của Google giúp lưu trữ và chia sẻ dữ liệu trực tuyến.', 'Trắc Nghiệm', '[]', 'Google Drive', 'Text', '[{"text": "Google Drive", "media_url": null}, {"text": "OneDrive", "media_url": null}, {"text": "Dropbox", "media_url": null}, {"text": "iCloud", "media_url": null}]', 11, 30, 30, 'RC', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(12, 'Dịch vụ nào của Google cung cấp lưu trữ đám mây?', 'Chọn dịch vụ lưu trữ đám mây chính xác.', 'Điện toán đám mây', 'Dịch vụ này của Google giúp lưu trữ và chia sẻ dữ liệu trực tuyến.', 'Trắc Nghiệm', '[]', 'Google Drive', 'Text', '[{"text": "Google Drive", "media_url": null}, {"text": "OneDrive", "media_url": null}, {"text": "Dropbox", "media_url": null}, {"text": "iCloud", "media_url": null}]', 12, 30, 30, 'RC', 1, '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(13, 'Công nghệ nào sau đây được sử dụng trong trí tuệ nhân tạo?', 'Chọn công nghệ AI chính xác.', 'AI', 'Công nghệ này giúp máy tính học hỏi từ dữ liệu.', 'Hình Ảnh', '"[\\"/uploads/questions/1742970027716_python_logo.png\\"]"', '/uploads/questions/1742970027729_python_logo.png', 'Image', '[{"text": "Machine Learning", "media_url": null}, {"text": "Cloud Computing", "media_url": null}, {"text": "5G", "media_url": null}, {"text": "Blockchain", "media_url": null}]', 13, 30, 30, 'Gold', 1, '2025-03-25 07:03:11', '2025-03-26 06:20:27');

-- Dumping structure for table olympic_tinhoc.score_logs
CREATE TABLE IF NOT EXISTS `score_logs` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `score` tinyint DEFAULT NULL,
  `rescued` tinyint(1) DEFAULT '0',
  `contestant_id` smallint DEFAULT NULL,
  `match_id` smallint DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contestant_id` (`contestant_id`),
  KEY `match_id` (`match_id`),
  CONSTRAINT `score_logs_ibfk_49` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `score_logs_ibfk_50` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.score_logs: ~0 rows (approximately)

-- Dumping structure for table olympic_tinhoc.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table olympic_tinhoc.sequelizemeta: ~11 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20250311015504-create-users.js'),
	('20250311015538-create-video-submissions.js'),
	('20250311015642-create-contestants.js'),
	('20250311015654-create-answers.js'),
	('20250311015703-create-groups.js'),
	('20250311015721-create-matches.js'),
	('20250311015735-create-score-logs.js'),
	('20250311025813-create-questions.js'),
	('20250311034022-create-awards.js'),
	('20250311034023-create-match-contestant.js'),
	('20250311034024-add-foreign-key-constraints.js');

-- Dumping structure for table olympic_tinhoc.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','judge') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.users: ~8 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
	(1, 'admin', 'admin@gmail.com', '$2b$10$0RfeHYgrvmkn39KjscNOre9D/fxNohUhlAQkjyRK42s7u7C4NeCJS', 'admin', '2025-03-25 07:03:10', '2025-03-25 07:03:10'),
	(2, 'Trọng Tài 1', 'trongtai1@gmail.com', '$2b$10$pIWo4O1U/slcHZwZw7wOBOaQc.ysPpfrWpdsot46g6eARNdR1EL.y', 'judge', '2025-03-25 07:03:10', '2025-03-25 07:03:10'),
	(3, 'Trọng Tài 2', 'trongtai2@gmail.com', '$2b$10$CaMjAuEZJdGWfI3ajxI6rO4SfhCBpcz7ZtMdX6LTbDjt3S833e89u', 'judge', '2025-03-25 07:03:10', '2025-03-25 07:03:10'),
	(4, 'Trọng Tài 3', 'trongtai3@gmail.com', '$2b$10$5xWj.cCnWBbeIZgDdT0HL.f1OtAttK6gjjkuu9jEI9kCXt/SK3UXu', 'judge', '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(5, 'Trọng Tài 4', 'trongtai4@gmail.com', '$2b$10$0e3cRsTMIZdtazW3KO2HIenreA3yCczwxYHsEWldYaRPv2v0FDAOC', 'judge', '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(6, 'Trọng Tài 5', 'trongtai5@gmail.com', '$2b$10$lPgFZKW1dBZxCnNZKHfVLeBCWQEXGxv/zlDf5QN0kulOz1WRwb9lm', 'judge', '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(7, 'Trọng Tài 6', 'trongtai6@gmail.com', '$2b$10$XX3XZmDr5/4ksQierZMXzuVxiciVqpmtb4ONIZ.PPotBPkeZQijCC', 'judge', '2025-03-25 07:03:11', '2025-03-25 07:03:11'),
	(8, 'Trọng Tài 7', 'trongtai7@gmail.com', '$2b$10$ftCASKKN/AMWwmADKQG8WOmVIhmQBln7j2Lp15vG2qkaHaCxIUMWa', 'judge', '2025-03-25 07:03:11', '2025-03-25 07:03:11');

-- Dumping structure for table olympic_tinhoc.video_submissions
CREATE TABLE IF NOT EXISTS `video_submissions` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `type` enum('Team','Sponsor') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table olympic_tinhoc.video_submissions: ~0 rows (approximately)
INSERT INTO `video_submissions` (`id`, `name`, `video_url`, `type`, `created_at`, `updated_at`) VALUES
	(1, 'data', '/uploads/videos/1742958764704-test.mp4', 'Team', '2025-03-26 03:12:44', '2025-03-26 03:12:44');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
