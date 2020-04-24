-- Create Employees table
CREATE TABLE `tbl_employees` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT 0,
  `updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_by` int(11) NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `tbl_employees_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `tbl_reviews` (`rid`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- Create Reviews table
CREATE TABLE `tbl_reviews` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `responsibility` int(1) NOT NULL DEFAULT 0,
  `learningAbility` int(1) NOT NULL DEFAULT 0,
  `creativity` int(1) NOT NULL DEFAULT 0,
  `punctuality` int(11) NOT NULL,
  `communication` int(11) NOT NULL,
  `comments` tinytext NOT NULL,
  `from` int(10) NOT NULL,
  `to` int(10) NOT NULL,
  `updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_by` int(10) NOT NULL,
  PRIMARY KEY (`rid`),
  KEY `from` (`from`),
  KEY `to` (`to`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `tbl_reviews_ibfk_1` FOREIGN KEY (`from`) REFERENCES `tbl_employees` (`uid`),
  CONSTRAINT `tbl_reviews_ibfk_2` FOREIGN KEY (`to`) REFERENCES `tbl_employees` (`uid`),
  CONSTRAINT `tbl_reviews_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `tbl_employees` (`uid`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;