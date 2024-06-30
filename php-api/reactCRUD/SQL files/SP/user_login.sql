DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_login`(IN `email` VARCHAR(300), IN `pass` VARCHAR(500))
BEGIN
	SELECT * FROM user_registration WHERE user_email=`email` AND user_password=`pass`;
END$$
DELIMITER ;