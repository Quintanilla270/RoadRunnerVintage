<?php
session_start();
require_once 'rrv_database.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);

        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $_POST['username']);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['password'];
    
            if (password_verify($password, $hashedPassword)) {
                $_SESSION['username'] = $username;
                echo json_encode(['success' => true, 'message' => 'Login successful']);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to validate with hashed password',
                    'debug' => [
                        'entered_password' => $_POST['password'],
                        'hashed_password' => $hashedPassword,
                        'password_verify_result' => password_verify($_POST['password'], $hashedPassword),
                    ],
                ]);
            }
        } else {
            $hashedPassword = '';
            echo json_encode([
                'success' => false,
                'message' => 'Login user information not found in our data',
                'debug' => [
                    'entered_password' => $_POST['password'],
                    'hashed_password' => $hashedPassword,
                    'password_verify_result' => password_verify($_POST['password'], $hashedPassword),
                ],
            ]);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'No user or password entered']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>