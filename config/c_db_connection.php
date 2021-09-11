<?php
class c_db_connection {
    
    private $host;
    private $user;
    private $password;
    private $database;
    public $link;
    public function __construct() {
        $this->host = "localhost";
        $this->user = "root";
        $this->password = "";
        $this->database = "mydb";

        $this->link = new mysqli($this->host, $this->user, $this->password, $this->database);

        if ($this->link->connect_error) {

           die("Ha fallado la conexión:");
        } else {

            $this->link->query( "SET NAMES 'utf8'");

            return $this->link;
       }
    }
}
