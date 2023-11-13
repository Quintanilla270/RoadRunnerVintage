<?php
include('rrv_database.php');
$query="SELECT * FROM items;";
$result = $conn->query($query);
$products = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($products);

$conn->close();
?>
