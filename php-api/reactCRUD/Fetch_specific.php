<?php
header("Access-Control-Allow-Methods:GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Content-Type:application/json");
header("Access-Control-Allow-Headers: access");

include_once("./class_file.php");
include_once('./db_connection.php');
include_once('./Token/token_validation.php');

$item_id=$_GET["item_id"];
$user_id=$_GET["user_id"];
$token=$_GET["token"];


try{
    if(Validate_Token($token)){
        $fetch=$React_Login_Crud->show_data("CALL display_specific_item_info('$user_id','$item_id')");

        if($fetch){

            $new_array=[];
            $new_array["display_specific"]=[];

            if(mysqli_num_rows($fetch)>0){
                while($arr_val=mysqli_fetch_array($fetch))
                {
                    $all_val=[
                        "id"=>$arr_val["id"],
                        "user_id"=>$arr_val["User_id"],
                        "type"=>$arr_val["Item_Type"],
                        "item_name"=>$arr_val["Item_Name"],
                        "qty"=>$arr_val["Quantity"],
                        "payable"=>$arr_val["Payable"],
                        "unit_price"=>$arr_val["Unit_price"],
                        "total"=>$arr_val["Total"],
                        "transport"=>$arr_val["Transport"]
                    ];
                    array_push($new_array["display_specific"], $all_val);
                }
                print(json_encode($new_array));
            }else{
                print(json_encode([
                    "status_code"=>404,
                    "message"=>"No Records Available!"
                    ]
                ));
            }    
        }else{
            print(json_encode([
                "status_code"=>500,
                "message"=>"Something went wrong."]
            ));
        }
    }else{
        print(json_encode(["token"=>"", "message"=>"Please Login Again!"]));
    }
}catch(Exception $e){
    print(json_encode(["message"=>$e]));
}

?>