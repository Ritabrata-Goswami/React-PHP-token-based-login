DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `display_specific_item_info`(IN `u_id` INT, IN `item_id` INT)
BEGIN
	SELECT * FROM item_information WHERE User_id=`u_id` AND id=`item_id`;
END$$
DELIMITER ;