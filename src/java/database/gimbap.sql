/* ****************************************************************************
** Author: Eunji Elly Lee
** Created: May 22, 2022
** Description: 
***************************************************************************** */

DROP SCHEMA IF EXISTS `gimbap`;
CREATE SCHEMA IF NOT EXISTS `gimbap` DEFAULT CHARACTER SET latin1;
USE `gimbap`;

-- -----------------------------------------------------
-- Table `gimbap`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gimbap`.`user` (
  `user_id` INT(12) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(120) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `code` VARCHAR(10),
  `salt` VARCHAR(50),
  PRIMARY KEY (`user_id`));
