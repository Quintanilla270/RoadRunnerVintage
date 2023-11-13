<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db_host="cs4413-mysql-server.mysql.database.azure.com";
$db_user="rrvadmin";
$db_pass="roadrunnervintagecs4413";
$db_name="rrv_schema";

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// if (mysqli_connect_errno())
// {
//     echo 'Connection to database failed:'.mysqli_connect_error();
//     exit();
// }

// echo "database connection success<br>";
// echo "<strong>now showing results from a database query...</strong>";
?>