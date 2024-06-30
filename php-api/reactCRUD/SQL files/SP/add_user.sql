DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(IN `name` VARCHAR(100), IN `email` VARCHAR(300), IN `pass` VARCHAR(300), IN `file` VARCHAR(500), IN `hash_id` VARCHAR(300))
BEGIN
	INSERT INTO user_registration (hashed_account_id, full_user_name, user_email, user_password, user_file) VALUES (`hash_id`,`name`,`email`,`pass`,`file`);
END$$
DELIMITER ;