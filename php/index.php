<?php

// Set the cookie name and value
$cookie_name = "roadrunner_vintage";
$cookie_value = "true";

// Set the cookie expiration time to 30 days
$expiration_time = time() + (60 * 60 * 24 * 30);

// Set the cookie
setcookie($cookie_name, $cookie_value, $expiration_time);

// Check if the cookie is set
if(isset($_COOKIE[$cookie_name])) {
    alert("Cookie '" . $cookie_name . "' is set.");
} else {
    alert("Cookie '" . $cookie_name . "' is not set.");
}

?>