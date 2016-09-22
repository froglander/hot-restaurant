CREATE SCHEMA `restaurant` ;

CREATE TABLE `restaurant`.`reservation` (
  `reservation_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `num_in_party` INT NULL,
  `current_reservation` TINYINT(1) NULL,
  PRIMARY KEY (`reservation_id`));

