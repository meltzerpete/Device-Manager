-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 01, 2016 at 06:00 PM
-- Server version: 5.6.33
-- PHP Version: 7.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loan_system2`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `category_parentid` int(11) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_parentid`, `date_added`) VALUES
(3, 'Phones', NULL, '2016-12-01 16:19:19'),
(5, 'Tablets', NULL, '2016-12-01 16:25:14'),
(6, 'VR Device', NULL, '2016-12-01 16:25:14'),
(7, 'Apple', 0, '2016-12-01 16:25:14'),
(8, 'Nokia', 0, '2016-12-01 16:25:14'),
(9, 'Samsung', 0, '2016-12-01 16:25:14'),
(10, 'Apple', 1, '2016-12-01 16:25:14'),
(11, 'Nexus', 1, '2016-12-01 16:25:14'),
(12, 'Oculus', 2, '2016-12-01 16:25:14'),
(13, 'Samsung', 2, '2016-12-01 16:25:14');

-- --------------------------------------------------------

--
-- Table structure for table `cliengroup`
--

CREATE TABLE `cliengroup` (
  `clientgroup_id` int(11) NOT NULL,
  `clientgroup_name` varchar(50) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_email` varchar(50) NOT NULL,
  `client_firstname` varchar(20) NOT NULL,
  `client_lastname` varchar(20) NOT NULL,
  `client_course` varchar(50) DEFAULT NULL,
  `client_type` varchar(20) NOT NULL,
  `client_studentno` int(11) DEFAULT NULL,
  `client_supervisor` varchar(50) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_email`, `client_firstname`, `client_lastname`, `client_course`, `client_type`, `client_studentno`, `client_supervisor`, `date_added`) VALUES
(2, 'lizhulu@ucl.ac.uk', 'Lizhi', 'Lu', 'GC02 App Design', 'Msc student', 12079028, NULL, '2016-12-01 16:36:27'),
(3, 'melzzer.peter@ucl.ac.uk', 'Peter', 'Melzer', 'GC02 App Design', 'Msc student', 16092222, NULL, '2016-12-01 16:36:27'),
(4, 'zhenninglou@ucl.ac.uk', 'Zhenning', 'Lou', 'GC02 App Design ', 'Msc student', 16052311, NULL, '2016-12-01 16:36:27');

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `device_id` int(11) NOT NULL,
  `device_availablefrom` date DEFAULT NULL,
  `device_dateofpurchase` date DEFAULT NULL,
  `device_dateoutofservice` date DEFAULT NULL,
  `device_defaultloantime` int(11) NOT NULL,
  `device_description` text,
  `type_id` int(1) NOT NULL,
  `device_isworking` tinyint(1) NOT NULL,
  `device_notes` text,
  `device_serial` varchar(50) NOT NULL,
  `device_visible` tinyint(1) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`device_id`, `device_availablefrom`, `device_dateofpurchase`, `device_dateoutofservice`, `device_defaultloantime`, `device_description`, `type_id`, `device_isworking`, `device_notes`, `device_serial`, `device_visible`, `date_added`) VALUES
(1, '2016-12-01', '2015-08-02', NULL, 30, NULL, 7, 1, NULL, '3874-2873-2938-0091', 1, '2016-12-01 16:51:28'),
(2, '2016-12-15', '2015-07-09', NULL, 30, NULL, 7, 1, NULL, '2234-8736-2938-0032', 1, '2016-12-01 16:51:28'),
(3, '2016-12-01', '2016-03-01', NULL, 20, NULL, 11, 1, 'working fine', '123-987', 1, '2016-12-01 16:54:08'),
(4, '2016-12-01', '2016-04-15', '2016-05-01', 20, NULL, 11, 0, 'completely broken - thrown away', '1234-5678', 0, '2016-12-01 16:54:08'),
(5, '2016-12-18', '2016-04-02', NULL, 20, NULL, 11, 1, 'working fine', '0987-0987', 1, '2016-12-01 16:55:39');

-- --------------------------------------------------------

--
-- Table structure for table `findclientgroup`
--

CREATE TABLE `findclientgroup` (
  `client_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `findgrouptype`
--

CREATE TABLE `findgrouptype` (
  `type_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `loan`
--

CREATE TABLE `loan` (
  `loan_id` int(11) NOT NULL,
  `loan_damagereported` text,
  `loan_due` date NOT NULL,
  `loan_extensionrequested` date DEFAULT NULL,
  `loan_onthefly` tinyint(1) NOT NULL,
  `loan_returned` tinyint(1) DEFAULT NULL,
  `loan_datestarted` date DEFAULT NULL,
  `loan_length` int(11) DEFAULT NULL,
  `loan_approved` tinyint(1) DEFAULT NULL,
  `device_id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `signout_staff_id` int(11) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `staff_isadmin` tinyint(1) NOT NULL,
  `staff_password` varchar(20) NOT NULL,
  `staff_email` varchar(50) NOT NULL,
  `staff_firstname` varchar(20) NOT NULL,
  `staff_lastname` varchar(20) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `staff_isadmin`, `staff_password`, `staff_email`, `staff_firstname`, `staff_lastname`, `date_added`) VALUES
(1, 0, '12345678', 'dave.something@ucl.ac.uk', 'dave', 'something', '2016-12-01 16:45:22');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`, `category_id`, `date_added`) VALUES
(7, 'iPhone 5', 7, '2016-12-01 16:40:29'),
(8, 'iPhone 6', 7, '2016-12-01 16:40:29'),
(9, 'Lumia', 8, '2016-12-01 16:41:19'),
(10, '3210', 8, '2016-12-01 16:41:19'),
(11, 'S6', 9, '2016-12-01 16:41:43'),
(12, 'S7 Edge', 9, '2016-12-01 16:41:43'),
(13, 'iPad Mini', 10, '2016-12-01 16:42:09'),
(14, 'iPad 3', 10, '2016-12-01 16:42:09'),
(15, 'Rift 1', 11, '2016-12-01 16:42:36'),
(16, 'Rift 2', 11, '2016-12-01 16:42:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `cliengroup`
--
ALTER TABLE `cliengroup`
  ADD PRIMARY KEY (`clientgroup_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`device_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`loan_id`),
  ADD KEY `device_id` (`device_id`),
  ADD KEY `device_id_2` (`device_id`),
  ADD KEY `device_id_3` (`device_id`),
  ADD KEY `client_id` (`client_id`,`signout_staff_id`),
  ADD KEY `signout_staff_id` (`signout_staff_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `cliengroup`
--
ALTER TABLE `cliengroup`
  MODIFY `clientgroup_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `device`
--
ALTER TABLE `device`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `loan`
--
ALTER TABLE `loan`
  MODIFY `loan_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `device_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`);

--
-- Constraints for table `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`device_id`),
  ADD CONSTRAINT `loan_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `loan_ibfk_3` FOREIGN KEY (`signout_staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `type`
--
ALTER TABLE `type`
  ADD CONSTRAINT `type_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
