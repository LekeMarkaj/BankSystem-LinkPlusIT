CREATE DATABASE  IF NOT EXISTS `bankSystem_directory`;
USE `bankSystem_directory`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `account`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `balance` double DEFAULT 0.0,
  `email` varchar(45) DEFAULT NULL,
  `password` char(68) NOT NULL,
  `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

-- Admin-- 
INSERT INTO `account` (`name`, `email`, `password`)
VALUES
('Leke Markaj', 'markaj.leka@gmail.com', '$2a$10$lAZ7fMTXoALYWY.C4rAs7u7Bdzz4qd7SIwAkWNOX5XQkTRe7vo4P.');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `bank`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `bank` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_name` varchar(45) DEFAULT NULL,
  `total_transaction_fee_amount` double DEFAULT 0.0,
  `total_transfer_amount` double DEFAULT 0.0,
  `transaction_flat_fee_amount` double DEFAULT 0.0,
  `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `account_bank`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `account_bank` (
  `bank_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  
  PRIMARY KEY (`bank_id`,`account_id`),
  
  KEY `FK_ACCOUNT_idx` (`account_id`),
  
  CONSTRAINT `FK_BANK_ACCOUNT` FOREIGN KEY (`bank_id`) 
  REFERENCES `bank` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  
  CONSTRAINT `FK_ACCOUNT_BANK` FOREIGN KEY (`account_id`) 
  REFERENCES `account` (`id`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `roles`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `roles`(`role`)
VALUES
('ROLE_USER'),('ROLE_ADMIN');

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `user_roles`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `user_roles` (
  `account_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  
  PRIMARY KEY (`account_id`,`role_id`),
  
  KEY `FK_ROLE_idx` (`role_id`),
  
  CONSTRAINT `FK_ACCOUNT_ROLES` FOREIGN KEY (`account_id`) 
  REFERENCES `account` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION,
  
  CONSTRAINT `FK_ROLES_ACCOUNT` FOREIGN KEY (`role_id`) 
  REFERENCES `roles` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_roles` (account_id,role_id)
VALUES 
(1, 2);


SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `transaction`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT 0.0,
  `bank_id` int DEFAULT 0,
  `originating_id` int DEFAULT 0,
  `resulting_id` int DEFAULT 0,
  `transaction_reason` varchar(255) DEFAULT NULL,
  `date_added` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;
