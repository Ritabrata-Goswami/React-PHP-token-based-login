DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_item_info`(IN `item_id` INT)
BEGIN
	DELETE FROM item_information WHERE id=`item_id`;
END$$
DELIMITER ;