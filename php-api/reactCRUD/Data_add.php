<?php
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json");
header("Access-Control-Allow-Headers: access");


include_once("./class_file.php");
include_once('./db_connection.php');
include_once('./Token/token_validation.php');

$token=$_POST["token"];
$user_id=$_POST["user_id"];
$item_type=$_POST["item_type"];
$item_name=$_POST["item_name"];
$qty=$_POST["quantity"];
$payable=$_POST["payable"];
$per_unit_price=$_POST["price"];
$total=$_POST["total_price"];
$transport_mode=$_POST["mode_of_trans"];



try{
    if(Validate_Token($token)){

        $return_res=$React_Login_Crud->add_data("CALL insert_item_info('$user_id','$item_type','$item_name','$qty','$payable','$per_unit_price','$total','$transport_mode')");
        if($return_res)
        {
            print(json_encode(array(
                "status_code"=>200,
                "message"=>"Data Added Successfully."
                )
            ));
        }
        else
        {
            print(json_encode(array(
                "status_code"=>500,
                "message"=>"Data Can not Added."
                )
            ));
        }
    }else{
        print(json_encode(array("token"=>"", "message"=>"Please Login Again!")));
    }
}catch(Exception $e){
    print(json_encode(array("message"=>$e)));
}

?>