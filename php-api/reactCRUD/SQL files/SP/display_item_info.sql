DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `display_item_info`(IN `u_id` INT)
BEGIN
	SELECT * FROM item_information WHERE User_id=`u_id`;
END$$
DELIMITER ;