<?php
session_start();
require_once 'rrv_database.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username'])) {
        $username = mysqli_real_escape_string($conn, $_POST['username']);

        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['fname'] = $row['fname'];
            $_SESSION['lname'] = $row['lname'];
            $_SESSION['address'] = $row['address'];
            $_SESSION['city'] = $row['city'];
            $_SESSION['state'] = $row['state'];
            $_SESSION['zipcode'] = $row['zipcode'];

            echo json_encode([
                'success' => true,
                'message' => 'User logged in successfully',
                'user_id' => $_SESSION['user_id'],
                'username' => $_SESSION['username'],
                'fname' => $_SESSION['fname'],
                'lname' => $_SESSION['lname'],
                'address' => $_SESSION['address'],
                'city' => $_SESSION['city'],
                'state' => $_SESSION['state'],
                'zipcode' => $_SESSION['zipcode']
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'User information not found in our data'
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Username not provided in the request'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
?>