<?php
$host = "Salvadors-MacBook.local";
$username = "rrv_admin";
$password = "rrv_password";
$database = "rrv_schema";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
