DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_item_info`(IN `u_id` INT, IN `type` VARCHAR(20), IN `name` VARCHAR(100), IN `qty` INT, IN `pay` VARCHAR(15), IN `u_price` FLOAT(10,3), IN `total` FLOAT(12,3), IN `trans` VARCHAR(50))
BEGIN
	INSERT INTO item_information (User_id,Item_Type,Item_Name,Quantity,Payable,Unit_price,Total,Transport)
VALUES (`u_id`,`type`,`name`,`qty`,`pay`,`u_price`,`total`,`trans`);
END$$
DELIMITER ;