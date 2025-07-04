<?php
// Allow CORS for all origins (you can restrict this to your domain if needed)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$apiUrl = "http://airbest.ddns.net:8081/IntegraOntrackService/IntegraOntrackService.svc/TrackDetailsWithStages";

// Get the raw POST body
$requestBody = file_get_contents('php://input');

// Forward the request to the API
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to connect to API']);
} else {
    echo $response;
}

curl_close($ch);
?>
