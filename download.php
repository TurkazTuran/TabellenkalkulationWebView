<?php
// Set a default timezone
date_default_timezone_set('Asia/Baku');

// Expect a date in YYYY-MM-DD format from the query string
$dateStr = $_GET['date'] ?? '';

if (empty($dateStr)) {
    http_response_code(400); // Bad Request
    echo "Error: A date must be provided in YYYY-MM-DD format.";
    exit;
}

// Create a DateTime object from the input format
$date = DateTime::createFromFormat('Y-m-d', $dateStr);

if ($date === false) {
    http_response_code(400); // Bad Request
    echo "Error: Invalid date format. Please use YYYY-MM-DD.";
    exit;
}

// Format the date to dd.m.YYYY for the cbar.az URL
$formattedDate = $date->format('d.m.Y');
$url = "https://cbar.az/currencies/{$formattedDate}.xml";

// Use a stream context to fetch the URL and handle potential errors
$context = stream_context_create(['http' => [
    'timeout' => 10,
    'ignore_errors' => true
]]);
$response = @file_get_contents($url, false, $context);

// Check the HTTP status code from the response headers
$http_code = 0;
if (isset($http_response_header[0])) {
    preg_match('/HTTP\/[12]\.[01] (\d{3})/', $http_response_header[0], $matches);
    $http_code = isset($matches[1]) ? (int)$matches[1] : 0;
}

// Check for a successful response and validate the XML
if ($http_code === 200 && $response) {
    libxml_use_internal_errors(true);
    $xmlObject = simplexml_load_string($response);
    libxml_clear_errors();
    
    if ($xmlObject !== false) {
        // Success: send the valid XML to the client
        header('Content-Type: application/xml');
        echo $response;
        exit;
    }
}

// If we reach here, it means no valid XML was found for the selected date
http_response_code(404);
echo "No currency data was found for the selected date ({$formattedDate}). It might be a weekend, a holiday, or a future date.";
?>
