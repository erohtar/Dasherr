<?php

$ALLOWED_PROTOCOLS = CURLPROTO_HTTP | CURLPROTO_HTTPS;
$TIMEOUT = 10;

if (!empty($_POST['url'])) {
        $url = $_POST['url'];

        $request = curl_init($url);

	curl_setopt($request, CURLOPT_PROTOCOLS, $ALLOWED_PROTOCOLS);
        curl_setopt($request, CURLOPT_CONNECTTIMEOUT, $TIMEOUT);
        curl_setopt($request, CURLOPT_FOLLOWLOCATION, true);

        $response = curl_exec($request);

        if ($response)
                $status_code = curl_getinfo($request, CURLINFO_HTTP_CODE);
        else
                $status_code = 502;

        curl_close($request);

        http_response_code($status_code);
}
?>
