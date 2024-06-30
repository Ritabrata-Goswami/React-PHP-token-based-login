<?php

class React_Login_Crud
{
    public $hostname;
    public $username;
    public $password;
    public $dbname;


    function __construct($hostname,$username,$password,$dbname)
    {
        try{
            $this->conn = mysqli_connect($hostname,$username,$password,$dbname);
        }catch(Exception $e){
            return json_encode(array("message"=>"connection couldn't established due to, " . $e));
        }
        
    }


    public function registration($args)
    {
        return mysqli_query($this->conn, $args);
    }

    public function user_login($args)
    {
        return mysqli_query($this->conn, $args);
    }

    public function add_data($args)
    {
        return mysqli_query($this->conn, $args);
    }

    public function show_data($args){
        return mysqli_query($this->conn, $args);
    }

    public function update($args){
        return mysqli_query($this->conn, $args);
    }

    public function delete($args){
        return mysqli_query($this->conn, $args);
    }
}

?>