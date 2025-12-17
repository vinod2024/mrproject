-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2025 at 01:07 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mrproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rest_password` enum('0','1') NOT NULL DEFAULT '0',
  `contact_no` varchar(15) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `age` int(10) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT '''user''',
  `is_varified` enum('0','1') NOT NULL DEFAULT '0',
  `token` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `rest_password`, `contact_no`, `profile_image`, `age`, `role`, `is_varified`, `token`, `is_active`, `last_login_at`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 'gurdeep', 'gurdeep103@yopmail.com', '$2b$10$uwKGHR6U1IJanV5WEHo5xe35mqaG2seYBmhSunMMIlky6HccxymMu', '0', NULL, NULL, NULL, '\'user\'', '0', NULL, 0, NULL, '2025-12-11 22:09:03', '2025-12-11 22:09:03', 0),
(2, 'gurdeep', 'gurdeep101@yopmail.com', '$2b$10$yAQbq3g1KIjJxgwZ3MdVousedXTqB5i5wtATwtpbG2HyupaB9bY1C', '0', NULL, NULL, NULL, '\'user\'', '0', NULL, 0, NULL, '2025-12-11 22:10:02', '2025-12-11 22:50:24', 0),
(3, 'vinod gupta 37', 'gurdeep102@yopmail.com', '$2b$10$70z6ERkyEbebh8WcSgBgguHkCMJQH72VZgwPTh40wUrIn7sfdksaq', '0', NULL, '1765814487759-man.png', 37, '\'user\'', '1', NULL, 0, '2025-12-15 21:28:30', '2025-12-11 22:13:06', '2025-12-15 21:31:29', 0),
(4, 'vinod gupta', 'ashok4web@gmail.com', '$2b$10$nRycJOHTBu6.m91T4su6VORlRqbeL0KDOec.kFJ0.XO0L.0HuIzAe', '0', NULL, NULL, NULL, '\'user\'', '1', NULL, 0, NULL, '2025-12-13 22:40:27', '2025-12-16 15:52:27', 0),
(5, 'vinod gupta', 'vinod101@yopmail.com', '$2b$10$HKIwddHQGJteU5yC.QxyR.4uA8ImirJ3W8McAFvN.qA.vvfsDNj0S', '0', NULL, NULL, NULL, '\'user\'', '1', NULL, 0, '2025-12-14 18:58:27', '2025-12-13 22:41:36', '2025-12-14 18:58:27', 0),
(6, 'vinod gupta', 'vinod102@yopmail.com', '$2b$10$dhyAswcAtTTZaxcfcO7iq.xjW.6rRy.9iAQ8hLUWQGq5aP7d6R2dm', '0', NULL, NULL, NULL, '\'user\'', '0', 'zqfs2dmzW4Ho5RY7hTDuGe0ZlNkFnTUk', 0, NULL, '2025-12-13 23:13:53', '2025-12-13 23:13:53', 0),
(7, 'Sanju s', 'sanju@yopmail.com', '$2b$10$yH0UOZCyCzV4N6H1e16jOuS7UwOMXfJG4xyd.VmkDg8mdyK7kBk1C', '0', NULL, '1765970643242-man.png', 35, '\'user\'', '1', NULL, 0, '2025-12-17 17:20:37', '2025-12-16 15:53:40', '2025-12-17 17:20:37', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
