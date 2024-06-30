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
$id=$_POST["id"];
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
        $update=$React_Login_Crud->update("CALL update_item_info('$id','$user_id','$item_type','$item_name','$qty','$payable','$per_unit_price','$total','$transport_mode')");

        if($update){
            print(json_encode([
                "status_code"=>200,
                "message"=>"Item updated successfully."
                ]
            ));
        }else{
            print(json_encode([
                "status_code"=>500,
                "message"=>"Did not updated."
                ]
            ));
        }
    }else{
        print(json_encode(["token"=>"", "message"=>"Please Login Again!"]));
    }
}catch(Exception $e){
    print(json_encode(["message"=>$e]));
}

?>