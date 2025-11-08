<?php
// Set a default timezone to avoid potential issues
date_default_timezone_set('Asia/Baku');

// Start with today's date
$date = new DateTime();

// Try to find the latest XML file, going back up to 7 days
for ($i = 0; $i < 7; $i++) {
    // Format the date as dd.mm.YYYY
    $formattedDate = $date->format('d.m.Y');
    $url = "https://cbar.az/currencies/{$formattedDate}.xml";
    
    // Use cURL for a more robust request
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); // 10-second timeout
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $xml = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    // Check if the request was successful and returned valid XML content
    if ($http_code == 200 && $xml && strpos($xml, '<ValCurs') !== false) {
        // Successfully fetched the XML, send it to the client
        header('Content-Type: application/xml');
        echo $xml;
        exit; // Stop the script
    }
    
    // If not found or failed, go to the previous day
    $date->modify('-1 day');
}

// If no XML was found in the last 7 days, return an error
http_response_code(404);
echo "Could not find currency data from cbar.az for the last 7 days.";
?>
