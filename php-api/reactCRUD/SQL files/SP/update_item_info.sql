DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_item_info`(IN `item_id` INT, IN `u_id` INT, IN `type` VARCHAR(35), IN `name` VARCHAR(100), IN `qty` INT, IN `pay` VARCHAR(10), IN `u_price` FLOAT(10,3), IN `total` FLOAT(12,3), IN `trans` VARCHAR(50))
BEGIN
	UPDATE item_information SET Item_Type=`type`, Item_Name=`name`, Quantity=`qty`,
Payable=`pay`, Unit_price=`u_price`, Total=`total`, Transport=`trans`
WHERE id=`item_id` AND User_id=`u_id`;
END$$
DELIMITER ;