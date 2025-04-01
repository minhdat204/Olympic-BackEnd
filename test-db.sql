-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2025 at 09:30 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` smallint(6) NOT NULL,
  `score` tinyint(4) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `contestant_id` smallint(6) DEFAULT NULL,
  `question_id` smallint(6) DEFAULT NULL,
  `match_id` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
  `id` int(11) NOT NULL,
  `awards_name` enum('Giải nhất','Giải nhì','Giải ba','Giải video ấn tượng','Giải Gold') NOT NULL,
  `contestant_id` smallint(6) DEFAULT NULL,
  `video_submission_id` smallint(6) DEFAULT NULL,
  `question_id` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `video_submission` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contestants`
--

CREATE TABLE `contestants` (
  `id` smallint(6) NOT NULL,
  `mssv` varchar(12) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `class` varchar(20) NOT NULL,
  `class_year` tinyint(4) NOT NULL,
  `qualifying_score` tinyint(4) DEFAULT NULL,
  `group_id` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contestants`
--

INSERT INTO `contestants` (`id`, `mssv`, `fullname`, `email`, `class`, `class_year`, `qualifying_score`, `group_id`, `created_at`, `updated_at`) VALUES
(174, '0306241349', 'Nguyễn Văn Chung', '0306241349@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(175, '0306241360', 'Lê Anh Hào', '0306241360@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(176, '0306241412', 'Trần Minh Tiến', '0306241412@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(177, '0306241377', 'Nguyễn Trọng Lam', '0306241377@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(178, '0306241399 ', 'Đào Phước Tài', '0306241399@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(179, '0306241378', 'Bùi Phi Long', '0306241378@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(180, '0306241382 ', 'Phan Tố Thanh Ngọc', '0306241382@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(181, '0306241398 ', 'Võ Trần Đỉnh Sơn', '0306241398@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(182, '0306241385', 'Nguyễn Hữu Phát', '0306241385@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(183, '0306241358', 'Nguyễn Chí Đức', '0306241358@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(184, '0306241356 ', 'Phạm Nguyễn Tiến Đạt', '0306241356@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(185, '0306241366', 'Nguyễn Trung Hòa', '0306241366@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(186, '0306241419 ', 'Nguyễn Văn  Truyền', '0306241419@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(187, '0306241411', 'Võ Ngọc Tiên', '0306241411@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(188, '0306241344', 'Hồ Nhật Thiên Ân', '0306241344@caothang.edu.vn', 'CĐ CNTT 24 E', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(189, '0306241257', ' Trần Nguyễn Kim Anh', '0306241257@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(190, '0306241332', 'Lê Văn Trường', '0306241332@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(191, '0306241328', 'Trần Lộc Thọ', '0306241328@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(192, '0306241334', 'Lâm Vĩnh Tường', '0306241334@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(193, '0306241330', 'Cam Thị Ngọc Trâm', '0306241330@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(194, '0306241331', 'Thạch Minh Trí', '0306241331@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(195, '0306241270', 'Tống Viết Linh Dương', '0306241270@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(196, '0306241305', 'Nguyễn Thị Triệu Mẫn', '0306241305@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(197, '0306241333', 'Nguyễn Hùng Tuấn', '0306241333@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(198, '0306241310', 'Nguyễn Vĩnh Nghi', '0306241310@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(199, '0306241281', 'Lê Văn Huy', '0306241281@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(200, '0306241292', 'Trần Thị Diễm Khanh', '0306241292@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(201, '0306241320', 'Phạm Thiên Phúc', '0306241320@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(202, '0306241276', 'Nguyễn Chí Hải', '0306241276@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(203, '0306241258', 'Võ Bảo Ân', '0306241258@caothang.edu.vn', 'CĐ CNTT 24 D', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(204, '0306241200', 'Trương Gia Huy', '0306241200@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(205, '0306241174', 'Nguyễn Vân Anh', '0306241174@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(206, '0306241177', 'Lê Gia Bảo', '0306241177@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(207, '0306241199', 'Trần Quốc Huy', '0306241199@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(208, '0306241209', 'Lưu Quốc Kiệt', '0306241209@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(209, '0306241240', 'Trần Ngọc Anh Tài', '0306241240@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(210, '0306241183', 'Nguyễn Văn Chiến', '0306241183@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(211, '0306241184', 'Lê Phú Cường', '0306241184@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(212, '0306241187', 'Nguyễn Trần Ngọc Duyên', '0306241187@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(213, '0306241197', 'Nguyễn Phạm Anh Huy', '0306241197@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(214, '0306241201', 'Lương Võ Khôi Hùng', '0306241201@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(215, '0306241206', 'Trần Quốc Khánh', '0306241206@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(216, '0306241254', 'Nguyễn Hoàng Anh Vũ', '0306241254@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(217, '0306241226', 'Nguyễn Thuận Phát', '0306241226@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(218, '0306241514', 'Lê Thành Hưng', '0306241514@caothang.edu.vn', 'CĐ CNTT 24 C', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(219, '0306241146', 'Nguyễn Minh Tài', '0306241146@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(220, '0306241086', 'Huỳnh Duy An', '0306241086@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(221, '0306241102', 'Nguyễn Quốc Đương', '0306241102@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(222, '0306241137', 'Nguyễn An Phong', '0306241137@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(223, '0306241131', 'Trần Văn Ngọc', '0306241131@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 2, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(224, '0306241089', 'Lê Thị Ngọc Ánh', '0306241089@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(225, '0306241170', 'Võ Thành Vinh', '0306241170@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(226, '0306241166', 'Nguyễn Thanh Tuấn', '0306241166@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(227, '0306241150', 'Lê Quốc Thắng', '0306241150@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(228, '0306241103', 'Hoàng Thanh Hải', '0306241103@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(229, '0306241125', 'Đặng Duy Lam', '0306241125@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(230, '0306241088', 'Võ Thị Thúy An', '0306241088@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 1, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(231, '0306241145', 'Lê Minh Tài', '0306241145@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(232, '0306241167', 'Nguyễn Văn Tuấn', '0306241167@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26'),
(233, '0306241126', 'Nguyễn Hoài Linh', '0306241126@caothang.edu.vn', 'CĐ CNTT 24 B', 24, NULL, 3, '2025-03-31 07:23:19', '2025-03-31 07:26:26');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` smallint(6) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `match_id` smallint(6) DEFAULT NULL,
  `judge_id` smallint(6) DEFAULT NULL,
  `chot` tinyint(4) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `match_id`, `judge_id`, `chot`, `created_at`, `updated_at`) VALUES
(1, 'Nhóm 1', 1, 2, 0, '2025-03-31 07:25:38', '2025-03-31 07:25:38'),
(2, 'Nhóm 2', 1, 3, 0, '2025-03-31 07:25:44', '2025-03-31 07:25:44'),
(3, 'Nhóm 3', 1, 4, 0, '2025-03-31 07:25:52', '2025-03-31 07:25:52');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` smallint(6) NOT NULL,
  `match_name` varchar(255) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('Chưa diễn ra','Đang diễn ra','Đã kết thúc') DEFAULT 'Chưa diễn ra',
  `current_question_id` smallint(6) DEFAULT NULL,
  `rescue_1` tinyint(4) DEFAULT -1,
  `rescue_2` tinyint(4) DEFAULT -1,
  `plane` tinyint(4) DEFAULT -1,
  `rescued_count_1` text DEFAULT NULL,
  `rescued_count_2` text DEFAULT NULL,
  `class_names` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`class_names`)),
  `round_name` enum('Tứ Kết','Bán Kết','Chung Kết') NOT NULL,
  `gold_winner_id` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `match_name`, `start_time`, `end_time`, `status`, `current_question_id`, `rescue_1`, `rescue_2`, `plane`, `rescued_count_1`, `rescued_count_2`, `class_names`, `round_name`, `gold_winner_id`, `created_at`, `updated_at`) VALUES
(1, 'Tứ Kết 1 ', '2025-03-31 07:59:00', NULL, 'Chưa diễn ra', NULL, -1, -1, -1, NULL, NULL, NULL, 'Tứ Kết', NULL, '2025-03-31 06:59:09', '2025-03-31 06:59:09');

-- --------------------------------------------------------

--
-- Table structure for table `match_contestants`
--

CREATE TABLE `match_contestants` (
  `id` int(11) NOT NULL,
  `registration_number` smallint(6) DEFAULT NULL,
  `status` enum('Chưa thi','Đang thi','Xác nhận 1','Xác nhận 2','Bị loại','Được cứu','Cấm thi','Qua vòng') DEFAULT 'Đang thi',
  `eliminated_at_question_order` tinyint(4) DEFAULT NULL,
  `match_id` smallint(6) NOT NULL,
  `contestant_id` smallint(6) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `match_contestants`
--

INSERT INTO `match_contestants` (`id`, `registration_number`, `status`, `eliminated_at_question_order`, `match_id`, `contestant_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'Đang thi', NULL, 1, 200, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(2, 2, 'Đang thi', NULL, 1, 208, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(3, 3, 'Đang thi', NULL, 1, 193, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(4, 4, 'Đang thi', NULL, 1, 210, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(5, 5, 'Đang thi', NULL, 1, 194, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(6, 6, 'Đang thi', NULL, 1, 214, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(7, 7, 'Đang thi', NULL, 1, 217, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(8, 8, 'Đang thi', NULL, 1, 179, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(9, 9, 'Đang thi', NULL, 1, 178, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(10, 10, 'Đang thi', NULL, 1, 196, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(11, 11, 'Đang thi', NULL, 1, 197, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(12, 12, 'Đang thi', NULL, 1, 215, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(13, 13, 'Đang thi', NULL, 1, 226, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(14, 14, 'Đang thi', NULL, 1, 230, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(15, 15, 'Đang thi', NULL, 1, 195, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(16, 16, 'Đang thi', NULL, 1, 176, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(17, 17, 'Đang thi', NULL, 1, 175, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(18, 18, 'Đang thi', NULL, 1, 227, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(19, 19, 'Đang thi', NULL, 1, 224, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(20, 20, 'Đang thi', NULL, 1, 204, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(21, 21, 'Đang thi', NULL, 1, 184, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(22, 22, 'Đang thi', NULL, 1, 223, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(23, 23, 'Đang thi', NULL, 1, 180, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(24, 24, 'Đang thi', NULL, 1, 181, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(25, 25, 'Đang thi', NULL, 1, 220, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(26, 26, 'Đang thi', NULL, 1, 189, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(27, 27, 'Đang thi', NULL, 1, 219, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(28, 28, 'Đang thi', NULL, 1, 203, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(29, 29, 'Đang thi', NULL, 1, 188, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(30, 30, 'Đang thi', NULL, 1, 174, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(31, 31, 'Đang thi', NULL, 1, 192, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(32, 32, 'Đang thi', NULL, 1, 222, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(33, 33, 'Đang thi', NULL, 1, 198, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(34, 34, 'Đang thi', NULL, 1, 205, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(35, 35, 'Đang thi', NULL, 1, 201, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(36, 36, 'Đang thi', NULL, 1, 218, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(37, 37, 'Đang thi', NULL, 1, 207, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(38, 38, 'Đang thi', NULL, 1, 202, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(39, 39, 'Đang thi', NULL, 1, 211, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(40, 40, 'Đang thi', NULL, 1, 177, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(41, 41, 'Đang thi', NULL, 1, 206, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(42, 42, 'Đang thi', NULL, 1, 225, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(43, 43, 'Đang thi', NULL, 1, 209, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(44, 44, 'Đang thi', NULL, 1, 221, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(45, 45, 'Đang thi', NULL, 1, 212, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(46, 46, 'Đang thi', NULL, 1, 186, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(47, 47, 'Đang thi', NULL, 1, 191, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(48, 48, 'Đang thi', NULL, 1, 216, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(49, 49, 'Đang thi', NULL, 1, 190, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(50, 50, 'Đang thi', NULL, 1, 182, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(51, 51, 'Đang thi', NULL, 1, 229, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(52, 52, 'Đang thi', NULL, 1, 213, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(53, 53, 'Đang thi', NULL, 1, 199, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(54, 54, 'Đang thi', NULL, 1, 233, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(55, 55, 'Đang thi', NULL, 1, 187, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(56, 56, 'Đang thi', NULL, 1, 232, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(57, 57, 'Đang thi', NULL, 1, 231, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(58, 58, 'Đang thi', NULL, 1, 183, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(59, 59, 'Đang thi', NULL, 1, 228, '2025-03-31 07:26:26', '2025-03-31 07:26:26'),
(60, 60, 'Đang thi', NULL, 1, 185, '2025-03-31 07:26:26', '2025-03-31 07:26:26');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` smallint(6) NOT NULL,
  `question_text` text DEFAULT NULL,
  `question_intro` text DEFAULT NULL,
  `question_topic` text DEFAULT NULL,
  `question_explanation` text DEFAULT NULL,
  `question_type` enum('Hình Ảnh','Âm Thanh','Video','Tự Luận') NOT NULL,
  `media_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`media_url`)),
  `correct_answer` text DEFAULT NULL,
  `correct_answer_type` enum('Text','Image','Audio','Video','Multiple Choice') NOT NULL DEFAULT 'Text',
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `question_order` tinyint(4) DEFAULT NULL,
  `timer` smallint(6) NOT NULL,
  `time_left` smallint(6) DEFAULT NULL,
  `dificulty` enum('Alpha','Beta','RC','Gold') NOT NULL,
  `match_id` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question_text`, `question_intro`, `question_topic`, `question_explanation`, `question_type`, `media_url`, `correct_answer`, `correct_answer_type`, `options`, `question_order`, `timer`, `time_left`, `dificulty`, `match_id`, `created_at`, `updated_at`) VALUES
(1, 'Con gì chân ngắn. Mỏ lại có màng. Mỏ bẹt màu vàng. Hay kêu cạp cạp?', 'Các câu hỏi dân gian luôn gắn liền với tuổi thơ của mỗi chúng ta, đây là những câu hỏi cửa miệng mà ngày xưa khi gặp bạn bè chúng ta thường xuyên hỏi nhau. Nó ẩn chứa những câu hỏi mẹo, các chơi chữ ẩn dụ và câu hỏi sau đây là một trong số đó.', 'Lớp 1', 'Loài vật được nhắc đến trong câu hỏi chính là Con Vịt, một loại gia cầm phổ biến thường được nuôi ở các gia đình đặc biệt là ở nông thôn. Ắt hẳn hình ảnh tuổi thơ chạy nhảy ngoài đồng lúa và bắt gặp những đàn vịt bơi lội tung tăng đã không còn quá xa lạ với tuổi thơ của mỗi chúng ta.', 'Tự Luận', NULL, 'Con Vịt', 'Multiple Choice', '\"[{\\\"text\\\":\\\"Con Gà\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Con Vịt\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Con Ngỗng\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Con Ngan\\\",\\\"media_url\\\":null}]\"', 1, 15, 0, 'Alpha', 1, '2025-03-29 02:25:04', '2025-03-29 10:12:09'),
(2, 'Hình ảnh sau đây nói về nền tảng quen thuộc nào ?', 'Khi phát triển phần mềm chúng ta luôn xài những công cụ để hỗ trợ việc lập trình và quản lý mã nguồn, có một số ứng dụng mà chỉ cần nhìn thấy logo thôi thì dân IT sẽ lập tức biết nó là gì, câu hỏi tiếp theo là một câu hỏi về hình ảnh logo. ', 'Lớp 2', 'Git hub là một nền tảng lưu trữ mã nguồn và quản lý phiên bản dựa trên Git, được thiết kế để hỗ trợ lập trình viên và nhóm phát triển phần mềm làm việc cùng nhau một cách hiệu quả.', 'Hình Ảnh', '\"[\\\"/uploads/questions/1743240406402_Cau2Test.png\\\"]\"', 'Github', 'Multiple Choice', '\"[{\\\"text\\\":\\\"jira\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Trello\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Facebook\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Github\\\",\\\"media_url\\\":null}]\"', 2, 15, 15, 'Alpha', 1, '2025-03-29 02:26:46', '2025-03-29 09:26:46'),
(3, 'Cá sấu thuộc lớp động vật nào? (Viết đáp án)', 'Thế giới động vật có muôn hình vạn trạng các loài sinh vật, chúng được phân chia thành các loài như bò sát, lưỡng cư, cá,… Có những loài sinh vật mang trong mình đặc điểm của loài này nhưng thực chất lại thuộc một loại khác, câu hỏi sau đây đề cập đến một trong số những sinh vật như vậy', 'Lớp 3', 'Cá sấu được xếp vào lớp bò sát vì chúng có đặc điểm chung của lớp bò sát là da khô, có vảy sừng. Chúng sống ở các vùng nhiệt đới rộng của châu Phi, châu Á, Bắc Mỹ, Nam Mỹ và châu Đại Dương.', 'Tự Luận', NULL, 'Bò sát', 'Text', NULL, 3, 15, 15, 'Alpha', 1, '2025-03-29 02:28:04', '2025-03-29 09:28:04'),
(4, 'Trong các loại thức uống sau loại nào uống gây nên tình trạng say nếu lạm dụng quá nhiều ?', 'Hiện nay trên thị trường có vô vàn các loại thực phẩm và nước uống, một trong số chúng có thể lợi cho sức khỏe, số còn lại có thể là thức uống gây hại. Câu hỏi tiếp sau đây là về lĩnh vực đồ uống giải khát.', 'Lớp 4', 'Khi uống cà phê, dưới tác dụng của caffeine cơ thể của bạn sẽ bắt đầu tiết ra nhiều adrenaline. Chất này khiến cho bạn cảm thấy lo lắng hoặc hưng phấn quá mức, một số người sẽ cảm thấy chóng mặt buồn nôn như say rượu bia nếu lạm dụng quá nhiều.', 'Tự Luận', NULL, 'Cà phê.', 'Multiple Choice', '\"[{\\\"text\\\":\\\"Cà phê.\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Trà sữa.\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Sinh tố.\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"Nước lọc.\\\",\\\"media_url\\\":null}]\"', 4, 15, 15, 'Alpha', 1, '2025-03-29 02:29:28', '2025-03-29 09:29:28'),
(5, 'Bạn có biết nam ca sĩ sinh năm 1997, quê Hà Nội, có nghệ danh bắt đầu bằng \"E\" và kết thúc bằng \"k\" – tên fandom của anh ấy là gì không?', 'Ở Việt Nam có nhiều ca sĩ tài năng do đó các fandom của các ca sĩ đó cũng có số lượng thành viên tương đối lớn, một trong những ca sĩ có lượng fan hâm mộ lớn vì tài năng sân khấu của anh ấy sẽ là chủ đề chính cho câu hỏi sau đây.', 'Lớp 5', 'Tên này là sự kết hợp giữa \"Erik\" và \"riel\", mang ý nghĩa tượng trưng cho sự gắn kết giữa Erik và người hâm mộ của anh. Các Eriel thường xuyên ủng hộ và đồng hành cùng Erik trong các hoạt động âm nhạc của anh.', 'Tự Luận', NULL, 'Eriel', 'Text', NULL, 5, 20, 20, 'Beta', 1, '2025-03-29 02:30:34', '2025-03-29 09:30:34'),
(6, 'Loài vật trong hình ảnh dưới đây là loài vật nào?', 'Trong văn hóa phương Đông chúng ta có 4 phương hướng Đông Tây Nam và Bắc kèm với đó tượng trung cho 4 loài linh thú. Loài vật tượng trưng cho hướng Đông là gì, câu hỏi hình ảnh tiếp theo sẽ là về loài vật ấy', 'Lớp 6', 'Trong văn hóa phương Đông, bốn phương gắn liền với bốn linh thú, mỗi linh thú tượng trưng cho một hướng, một yếu tố tự nhiên và một ý nghĩa nhất định. Đại diện cho hướng đông sẽ là Thanh Long – Loài Rồng trong truyền thuyết.', 'Hình Ảnh', '\"[\\\"/uploads/questions/1743240698240_Cau6Test.png\\\"]\"', 'Rồng', 'Text', NULL, 6, 20, 20, 'Beta', 1, '2025-03-29 02:31:38', '2025-03-29 09:31:38'),
(7, 'Lễ kỷ niệm 30/4 – 1/5 năm 2025 sẽ được nghỉ mấy ngày?', 'Nhắc đến các ngày lễ kỷ niệm quan trọng của Đất Nước thì không thể không nhắc đến dịp lễ kỷ niệm 30/4 - 1/5. Đây vừa là dịp để tưởng nhớ lại công ơn của các anh hùng dân tộc vừa là dịp để chúng ta nghỉ ngơi xả hơi sau những tuần làm việc mệt mỏi. Câu hỏi tiếp theo sẽ là về ngày lễ này', 'Lớp 7', '30/4 - 1/5 là hai ngày lễ quan trọng tại Việt Nam, gắn liền với lịch sử và quyền lợi của người lao động. Ngày 30/4 đánh dấu sự kiện Giải phóng miền Nam, thống nhất đất nước vào năm 1975, chấm dứt chiến tranh và mở ra kỷ nguyên hòa bình, độc lập cho Việt Nam. Và năm 2025 chúng ta sẽ được nghỉ lễ 5 ngày liên tục từ 30/4/2025 đến hết 04/05/2025.', 'Tự Luận', NULL, '5', 'Multiple Choice', '\"[{\\\"text\\\":\\\"5\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"4\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"3\\\",\\\"media_url\\\":null},{\\\"text\\\":\\\"6\\\",\\\"media_url\\\":null}]\"', 7, 20, 20, 'Beta', 1, '2025-03-29 02:33:59', '2025-03-29 09:33:59'),
(8, 'Tên bài hát vừa nghe là gì', 'Nguyễn Hưng là một ca sĩ, vũ công nổi tiếng của Việt Nam, được biết đến với phong cách trình diễn sôi động và vũ đạo điêu luyện. Một trong những bài hát nổi tiếng của ông ấy sẽ là chủ đề cho câu hỏi tiếp theo sau đây. Xin mời các thí sinh lắng nghe ', 'Lớp 8', 'Ngoài giai điệu, ca từ lôi cuốn, ca khúc thu hút nhờ màn trình diễn của Nguyễn Hưng. Trong ký ức người yêu nhạc thế hệ 8x, 9x, hình ảnh Nguyễn Hưng mặc vest đen, sơ mi trắng, đeo kính đen thường xuyên xuất hiện trên băng đĩa cuối thập niên 1990.', 'Âm Thanh', '\"[\\\"/uploads/questions/1743240947722_ChiRiengMinhTa-NguyenHung_3e9gs.mp3\\\"]\"', 'Chỉ riêng mình ta', 'Multiple Choice', '\"[{\\\"text\\\":\\\"Nàng thơ\\\"},{\\\"text\\\":\\\" Happy New Year\\\"},{\\\"text\\\":\\\"Chỉ riêng mình ta\\\"},{\\\"text\\\":\\\"Người lạ ơi\\\"}]\"', 8, 20, 20, 'Beta', 1, '2025-03-29 02:35:47', '2025-03-29 09:35:59'),
(9, 'Khi trang web gặp sự cố, bạn sẽ sử dụng tính năng nào để tải lại trang?', 'Trong lập trình web, sẽ có những chức năng phổ biến đến mức chỉ cần nhìn icon cũng đoán ra được nó đại diện cho chức năng nào. Sau đây là một câu hỏi về các chứng năng cơ bản của mọi ứng dụng web.', 'Lớp 9', 'Thông thường khi duyệt web gặp sự cố thì người dùng sẽ nhấn phím F5 để làm mới (refresh) trang web. Khi nhấn F5, trình duyệt sẽ yêu cầu máy chủ gửi lại nội dung trang web, giúp cập nhật những thay đổi mới nhất.', 'Tự Luận', NULL, 'Làm mới', 'Multiple Choice', '\"[{\\\"text\\\":\\\"Thêm mới \\\",\\\"media_url\\\":\\\"/uploads/questions/1743243995314_add.png\\\"},{\\\"text\\\":\\\"Xóa \\\",\\\"media_url\\\":\\\"/uploads/questions/1743241693653_trash.jpg\\\"},{\\\"text\\\":\\\"Cập nhật\\\",\\\"media_url\\\":\\\"/uploads/questions/1743241693654_edit.jpg\\\"},{\\\"text\\\":\\\"Làm mới\\\",\\\"media_url\\\":\\\"/uploads/questions/1743241184749_LamMoi.png\\\"}]\"', 9, 30, 30, 'RC', 1, '2025-03-29 02:39:44', '2025-03-29 10:26:35'),
(10, 'Cơm nước gì chưa người đẹp bắt nguồn từ mạng xã hội nào?', 'Hiện nay mạng xã hội không chỉ là nơi giải trí mà nó còn là nơi bắt nguồn nhiều trend mà giới trẻ rất hay áp dụng nó vào giao tiếp cũng như mang tính chất gây cười. Một trong những trend phổ biến mà ngay cả Olympic Tin học cũng sử dụng sẽ là nội dung câu hỏi tiếp theo ', 'Lớp 10', 'Thực tế, “Cơm nước gì chưa người đẹp?” không phải một câu nói mới. Trước đây, nó phổ biến trong giao tiếp của những người trung niên, lớn tuổi. Tuy nhiên, khi được Gen Z phát hiện và lan truyền rộng rãi trên mạng xã hội, câu nói này bỗng trở nên thú vị và tạo nên trào lưu thịnh hành.', 'Tự Luận', NULL, 'Tiktok', 'Text', NULL, 10, 30, 30, 'RC', 1, '2025-03-29 02:40:45', '2025-03-29 09:40:45'),
(11, 'Theo bạn hai nhân vật trong bức ảnh này làm nghề nghiệp gì?', 'Tiếp theo sẽ là một câu đố về hình ảnh. ', 'Lớp 11', 'Đối với lập trình viên class là một khái niệm quen thuộc và gắn bó sâu sắc với sự nghiệp lập trình. Class (Lớp) là một khái niệm quan trọng trong Lập trình Hướng Đối Tượng. Nó là một khuôn mẫu để tạo ra đối tượng, trong đó định nghĩa các thuộc tính và phương thức mà đối tượng có thể sử dụng.', 'Hình Ảnh', '\"[\\\"/uploads/questions/1743241352088_Cau11Test.png\\\"]\"', 'Lập trình viên', 'Text', NULL, 11, 30, 30, 'RC', 1, '2025-03-29 02:42:32', '2025-03-29 09:42:32'),
(12, 'Hãy cho biết hình ảnh sau là biểu tượng của ngôn ngữ gì', 'Người khác khi nói đến ngôn ngữ họ sẽ liên tưởng đến tiếng Anh Pháp Trung,.. còn đối với lập trình viên Ngôn ngữ sẽ là là tập hợp các quy tắc và cú pháp dùng để viết chương trình điều khiển máy tính thực hiện các tác vụ mong muốn. Câu hỏi sau đây là về một trong những ngôn ngữ phổ biến nhất trên thế giới', 'Lớp 12', 'Python là một ngôn ngữ lập trình bậc cao, đa năng, dễ học và dễ đọc, được sử dụng rộng rãi trong nhiều lĩnh vực như trí tuệ nhân tạo (AI), khoa học dữ liệu, phát triển web, tự động hóa và nhiều hơn nữa.', 'Hình Ảnh', '\"[\\\"/uploads/questions/1743241405157_Python.png\\\"]\"', 'Python', 'Text', NULL, 12, 30, 30, 'RC', 1, '2025-03-29 02:43:25', '2025-03-29 09:43:25'),
(13, 'Các thí sinh cùng xem một đoạn video và trả lời câu hỏi', 'Tiếp theo sẽ là một câu hỏi video.', 'Thi tốt nghiệp', '\"Đám giỗ bên cồn\" là nét văn hóa đặc trưng tại vùng quê sông nước. Thông qua những video của Lê Tuấn Khang, hình ảnh đám giỗ miền Tây được tái hiện sinh động, khơi gợi sự tò mò của khán giả.', 'Video', '\"[\\\"/uploads/questions/1743241506565_videoplayback.mp4\\\"]\"', 'Bên Cồn', 'Text', NULL, 13, 30, 30, 'Gold', 1, '2025-03-29 02:45:06', '2025-03-29 09:45:06');

-- --------------------------------------------------------

--
-- Table structure for table `score_logs`
--

CREATE TABLE `score_logs` (
  `id` smallint(6) NOT NULL,
  `score` tinyint(4) DEFAULT NULL,
  `rescued` tinyint(1) DEFAULT 0,
  `contestant_id` smallint(6) DEFAULT NULL,
  `match_id` smallint(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','judge') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$ejRwOX7g1pyPvv29zZ2dyOdE4H5b.83W2s6O9Jop7w41bAxYPBL22', 'admin', '2025-03-31 07:04:15', '2025-03-31 07:04:15'),
(2, 'trongtai1', 'trongtai1@gmail.com', '$2b$10$GCSZavDRGSe/4G5RSIsYhujov8kUbLgX4BruPZfYzibeLvbBO1V3m', 'judge', '2025-03-31 07:04:16', '2025-03-31 07:04:16'),
(3, 'trongtai2', 'trongtai2@gmail.com', '$2b$10$Z1LGUJY4Q6o2xY/oYzxnHutP.q2bljbdiBOGekWAX0a5EcFs1Dx1q', 'judge', '2025-03-31 07:04:16', '2025-03-31 07:04:16'),
(4, 'trongtai3', 'trongtai3@gmail.com', '$2b$10$97QpO8zBH9Bh/fsmSD3M9uSJHa2x1g5WXnEEjxRN64N4r4s3vvwgW', 'judge', '2025-03-31 07:04:16', '2025-03-31 07:04:16');

-- --------------------------------------------------------

--
-- Table structure for table `video_submissions`
--

CREATE TABLE `video_submissions` (
  `id` smallint(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `type` enum('Team','Sponsor') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video_submissions`
--

INSERT INTO `video_submissions` (`id`, `name`, `video_url`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Giới thiệu EnGenius & Wifi 7', '/uploads/videos/1742958600703-Giá»i thiá»u EnGenius & Wifi 7.mp4', 'Sponsor', '2025-03-26 03:10:01', '2025-03-26 03:10:01'),
(2, 'Lexar', '/uploads/videos/1742958626356-Lexar.mp4', 'Sponsor', '2025-03-26 03:10:26', '2025-03-26 03:10:26'),
(3, 'Nvidia', '/uploads/videos/1742958640887-Nvidia.mp4', 'Sponsor', '2025-03-26 03:10:41', '2025-03-26 03:10:41'),
(4, 'SMNET-CT', '/uploads/videos/1742958658806-VIDEO SMNET-CT.mp4', 'Sponsor', '2025-03-26 03:10:59', '2025-03-26 03:10:59'),
(5, 'ANTA6', '/uploads/videos/1742958676214-What Is ANTA6 V2_7.mp4', 'Sponsor', '2025-03-26 03:11:16', '2025-03-26 03:11:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contestant_id` (`contestant_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contestant_id` (`contestant_id`),
  ADD KEY `video_submission_id` (`video_submission_id`),
  ADD KEY `video_submission` (`video_submission`);

--
-- Indexes for table `contestants`
--
ALTER TABLE `contestants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mssv` (`mssv`),
  ADD UNIQUE KEY `contestants_mssv_unique` (`mssv`),
  ADD UNIQUE KEY `mssv_2` (`mssv`),
  ADD UNIQUE KEY `mssv_3` (`mssv`),
  ADD UNIQUE KEY `mssv_4` (`mssv`),
  ADD UNIQUE KEY `mssv_5` (`mssv`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `match_id` (`match_id`),
  ADD KEY `judge_id` (`judge_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `current_question_id` (`current_question_id`),
  ADD KEY `gold_winner_id` (`gold_winner_id`);

--
-- Indexes for table `match_contestants`
--
ALTER TABLE `match_contestants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `match_id` (`match_id`),
  ADD KEY `contestant_id` (`contestant_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indexes for table `score_logs`
--
ALTER TABLE `score_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contestant_id` (`contestant_id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `video_submissions`
--
ALTER TABLE `video_submissions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `match_contestants`
--
ALTER TABLE `match_contestants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `score_logs`
--
ALTER TABLE `score_logs`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `video_submissions`
--
ALTER TABLE `video_submissions`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_10` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `answers_ibfk_11` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `answers_ibfk_12` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `awards`
--
ALTER TABLE `awards`
  ADD CONSTRAINT `awards_ibfk_10` FOREIGN KEY (`video_submission_id`) REFERENCES `video_submissions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `awards_ibfk_11` FOREIGN KEY (`video_submission`) REFERENCES `video_submissions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `awards_ibfk_9` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `contestants`
--
ALTER TABLE `contestants`
  ADD CONSTRAINT `contestants_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_7` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_8` FOREIGN KEY (`judge_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_7` FOREIGN KEY (`current_question_id`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_8` FOREIGN KEY (`gold_winner_id`) REFERENCES `contestants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `match_contestants`
--
ALTER TABLE `match_contestants`
  ADD CONSTRAINT `match_contestants_ibfk_7` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `match_contestants_ibfk_8` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `score_logs`
--
ALTER TABLE `score_logs`
  ADD CONSTRAINT `score_logs_ibfk_7` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `score_logs_ibfk_8` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
