<?php
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json");
header("Access-Control-Allow-Headers: access");

include_once("./class_file.php");
include_once('./db_connection.php');
include_once('./Token/token_generation.php');

$get_email = base64_encode($_POST['user_email']);
$get_pass = md5($_POST['user_pass']);


try{

    if($get_email !="" || $get_pass !="")
    {
        $return_login = $React_Login_Crud->user_login("CALL user_login('$get_email','$get_pass')");

        $new_array = array();
        $new_array["get_login_data"] = array();
    
        if(mysqli_num_rows($return_login) > 0)
        {
            while($array_val = mysqli_fetch_array($return_login))
            {
                $fetch = array(
                    "login"=>"success",
                    "status_code"=>200,
                    "id"=>$array_val["id"], 
                    "hash_id"=>$array_val["hashed_account_id"],
                    // "user_name"=>$array_val["full_user_name"],
                    // "user_email"=>base64_decode($array_val["user_email"]),
                    // "user_photo"=>$array_val["user_file"],                                           
                    "token"=>Generate_Token(base64_decode($array_val["user_email"]), $array_val["full_user_name"])    //Token returning.

                );
                array_push($new_array["get_login_data"],$fetch);
            }
            print(json_encode($new_array));
        }
        else
        {
            array_push($new_array["get_login_data"],array(
                "status_code"=>404, 
                "message"=>"No User Available Based On This Credentials."
                ));
            print(json_encode($new_array));
        }
    }
    else
    {
        print(json_encode(array("message"=>"Every fields are mandatory!")));
    }


}catch(Exception $e){
    print(json_encode(array("message"=>$e)));
}
?>