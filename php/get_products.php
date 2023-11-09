<?php
include('rrv_database.php');

$result = $conn->query("SELECT * FROM items");
$products = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($products);
?>
