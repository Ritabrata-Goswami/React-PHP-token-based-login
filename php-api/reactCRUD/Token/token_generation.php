<?php

    function Generate_Token($user_id, $name){
        $header_Token_Info = [
            "type"=>"JWT",
            "algorithem"=>"HS256",
            "exp"=>time()+1800
        ];
        
        $payload = [
            "user_id"=>$user_id,
            "user_name"=>$name
        ];
    
        $key = "l9gWjicDs3b5XvL8cxJ2qoSa3U4zR_Ht4S7Jo6p8K";
        
        $header_encoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header_Token_Info)));
    
        // print($header_encoded);
    
        $payload_encoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    
        $signature_Token_Info = hash_hmac("SHA256", $header_encoded.".".$payload_encoded, $key, true);
        $signature_encode = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature_Token_Info));
    
        $JWT = $header_encoded . "." . $payload_encoded . "." . $signature_encode;
    
        return $JWT;


    }

?>