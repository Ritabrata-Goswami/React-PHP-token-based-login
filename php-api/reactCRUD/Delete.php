<?php
header("Access-Control-Allow-Methods:GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json");
header("Access-Control-Allow-Headers: access");


include_once("./class_file.php");
include_once('./db_connection.php');
include_once('./Token/token_validation.php');

$id=$_GET["item_id"];
$token=$_GET["token"];

try{
    if(Validate_Token($token)){
        $del=$React_Login_Crud->delete("CALL delete_item_info('$id')");

        if($del){
            print(json_encode([
                "status_code"=>200,
                "message"=>"Data deleted successfully"
                ]
            ));
        }else{
            print(json_encode([
                "status_code"=>500,
                "message"=>"Something went wrong!"
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