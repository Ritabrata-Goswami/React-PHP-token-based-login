DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_details`(IN `hash` VARCHAR(300))
BEGIN
	SELECT * FROM `user_registration` WHERE hashed_account_id=`hash`;
END$$
DELIMITER ;