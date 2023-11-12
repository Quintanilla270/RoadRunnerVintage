<?php
$db_host="cs4413-mysql-server.mysql.database.azure.com";
$db_user="rrvadmin";
$db_pass="roadrunnervintagecs4413";
$db_name="rrv_schema";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
