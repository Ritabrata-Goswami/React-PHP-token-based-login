<?php
header("Access-Control-Allow-Methods:GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json");
header("Access-Control-Allow-Headers: access");


include_once("./class_file.php");
include_once('./db_connection.php');


$hash_id = $_GET['user_hash_id'];

$file_path="http://127.0.0.1/projects/php-api/reactCRUD/upload_files/";

try{
    $user_details = $React_Login_Crud->user_login("CALL user_details('$hash_id')");

    $new_array = array();
    $new_array["get_user_data"] = array();

    if(mysqli_num_rows($user_details) > 0)
    {
        while($array_val = mysqli_fetch_array($user_details))
        {
            $fetch = array(
                "login"=>"success",
                "status_code"=>200,
                "id"=>$array_val["id"], 
                "hash_id"=>$array_val["hashed_account_id"],
                "user_name"=>$array_val["full_user_name"],
                "user_email"=>base64_decode($array_val["user_email"]),
                "user_photo"=>$array_val["user_file"],
                "file_path"=>$file_path,                                             

            );
            array_push($new_array["get_user_data"],$fetch);
        }
        print(json_encode($new_array));
    }
    else
    {
        array_push($new_array["get_login_data"],array(
            "status_code"=>404, 
            "message"=>"No User Available Based On This User Id."
            ));
        print(json_encode($new_array));
    }

}catch(Exception $e){
    print(json_encode(["message"=>$e]));
}
?>