<?php
header("Access-Control-Allow-Methods:POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Content-code:application/json");
header("Access-Control-Allow-Headers: access");


include_once("./class_file.php");
include_once('./db_connection.php');


$path="./upload_files/";

$get_name = $_POST['user_name'];
$get_pass = $_POST['user_pass'];
$get_email = $_POST['user_email'];


try{
    if($get_name=="" || $get_pass=="" || $get_email=="")
    {
        print(json_encode(array("code"=>0,"message"=>"Every fields are mandatory!")));
    }
    else
    {
        $get_file = basename($_FILES['user_file']['name']);
        $img_extension = strtolower(pathinfo($get_file, PATHINFO_EXTENSION));

        if($img_extension != 'jpg' && $img_extension != 'jpeg' && $img_extension != "png"){
            print(json_encode(array("code"=>2,"message"=>"File is not supported!")));
        }
        else{
            $hased_password = md5($get_pass);
            $file_arr = explode('.',$get_file);
            $new_file = base64_encode($file_arr[0]).'.'.$file_arr[1];
            $new_email= base64_encode($get_email);
            $hashed_unique_account_id=base64_encode($get_email).'_'.time().rand(1111,9999);

            move_uploaded_file($_FILES['user_file']['tmp_name'], $path.$new_file);

            $addUser=$React_Login_Crud->registration("CALL add_user('$get_name','$new_email','$hased_password','$new_file','$hashed_unique_account_id')");

            if($addUser)
            {
                print(json_encode(array("code"=>3,"message"=>"User Added Successfully!")));
            }
            else
            {
                print(json_decode(array("code"=>4,"message"=>"Did not added user.")));
            }
        }

    }


}catch(Exception $e){
    print(json_encode(array("message"=>$e)));
}

?>