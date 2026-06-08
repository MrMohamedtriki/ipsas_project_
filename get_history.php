<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require 'db.php';

$device_id = $_SERVER['REMOTE_ADDR'];

$stmt = $pdo->prepare("SELECT password FROM passwords WHERE device_id = ? ORDER BY created_at DESC");
$stmt->execute([$device_id]);
$rows = $stmt->fetchAll(PDO::FETCH_COLUMN); 
echo json_encode($rows);
?>
