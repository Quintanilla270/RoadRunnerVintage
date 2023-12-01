<?php

// Set the cookie name and value
$cookie_name = "roadrunner_vintage";
$cookie_value = "true";

// Set the cookie expiration time to 30 days
$expiration_time = time() + (60 * 60 * 24 * 30);

if (!isset($_COOKIE[$cookie_name])) {
    // Set the cookie
    setcookie($cookie_name, $cookie_value, $expiration_time);

    // Tell the user that the cookie has been set
    echo "The cookie has been set.";
} 
else {
    // Tell the user that the cookie is already set
    echo "The cookie is already set.";
}

?>

?>