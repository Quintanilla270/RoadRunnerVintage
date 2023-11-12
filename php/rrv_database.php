<?php
$db_host="cs4413-mysql-server.mysql.database.azure.com";
$db_user="rrvadmin";
$db_pass="roadrunnervintagecs4413";
$db_name="rrv_schema";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
