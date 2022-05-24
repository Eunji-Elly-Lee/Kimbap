/* ****************************************************************************
** Author: Eunji Elly Lee
** Created: May 24, 2022
** Description: As a database of the Gimbap application,
**              it creates and manages tables
**              that contain information about user, Gimbaps, and orders. 
***************************************************************************** */

DROP SCHEMA IF EXISTS `gimbapdb`;
CREATE SCHEMA IF NOT EXISTS `gimbapdb` DEFAULT CHARACTER SET latin1;
USE `gimbapdb`;

-- -----------------------------------------------------
-- Table `gimbapdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gimbapdb`.`user` (
  `email` VARCHAR(120) NOT NULL,
  `code` VARCHAR(100),
  `salt` VARCHAR(50),
  PRIMARY KEY (`email`));

-- -----------------------------------------------------
-- Table `gimbapdb`.`gimbap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gimbapdb`.`gimbap` (
  `gimbap_id` INT(12) NOT NULL AUTO_INCREMENT,
  `gimbap_name` VARCHAR(50) NOT NULL,
  `price` DOUBLE NOT NULL,
  PRIMARY KEY (`gimbap_id`));

-- -----------------------------------------------------
-- Table `gimbapdb`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gimbapdb`.`location` (
  `location_id` INT(12) NOT NULL AUTO_INCREMENT,
  `location_detail` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`location_id`));

-- -----------------------------------------------------
-- Table `gimbapdb`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gimbapdb`.`order` (
  `order_id` INT(12) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `location` INT(12) NOT NULL,
  PRIMARY KEY (`order_id`),
  CONSTRAINT `fk_order_location`
    FOREIGN KEY (`location`)
    REFERENCES `gimbapdb`.`location` (`location_id`));

-- -----------------------------------------------------
-- Table `gimbapdb`.`order_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gimbapdb`.`order_detail` (
  `email` VARCHAR(120) NOT NULL,
  `order_id` INT(12) NOT NULL,
  `gimbap_id` INT(12) NOT NULL,
  `quantity` INT(10) NOT NULL,
  PRIMARY KEY (`email`, `order_id`, `gimbap_id`),
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`email`)
    REFERENCES `gimbapdb`.`user` (`email`),
  CONSTRAINT `fk_order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `gimbapdb`.`order` (`order_id`),
  CONSTRAINT `fk_order_gimbap`
    FOREIGN KEY (`gimbap_id`)
    REFERENCES `gimbapdb`.`gimbap` (`gimbap_id`));
