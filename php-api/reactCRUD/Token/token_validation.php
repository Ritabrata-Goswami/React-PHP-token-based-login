<?php

function Validate_Token($jwt_token){
    // $jwt_token = "eyJ0eXBlIjoiSldUIiwiYWxnb3JpdGhlbSI6IkhTMjU2IiwiZXhwIjoxNzE0NTY2NDQzfQ.eyJ1c2VyX2lkIjoiamFuaWRvZUBnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJKYW5pIERvZSJ9.U9Y3B3B92Uj55_H1B533KtU7v25l6FL1AK-9x1vgSSY";

    if($jwt_token == ""){
        return false;
    }

    $token_parts = explode(".", $jwt_token);
    $first = json_decode(base64_decode($token_parts[0]), true);

    if($first==null || $first["exp"] < time()){
        return false;
    }else{
        return true;
    }
}

?>