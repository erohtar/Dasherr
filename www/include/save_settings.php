<?php

// https://stackoverflow.com/questions/6041741/fastest-way-to-check-if-a-string-is-json-in-php
function isJson($string) {
	$jsd = json_decode($string);
    return ((is_string($string) &&
            (is_object($jsd) ||
            is_array($jsd)))) ? true : false;
}

// check post data
if(!empty($_POST["data"])){

	// validate json
	$data = $_POST["data"];
	if (!isJson($data)) {
		echo "<script>alert('ERROR: Invalid JSON data submitted');</script>";
		return;
	}

	// validate setings path
	$spath = preg_replace("/[^A-Za-z0-9\-.]/", "", $_POST["file"]);  // strip out special characters (except .)
	if (!str_ends_with($spath, ".json")) {
		echo "<script>alert('ERROR: Invalid filename submitted');</script>";
		return;
	}

	// write setings file
	$file = fopen("../$spath", "w");
	fwrite($file, $data);
	fclose($file);
}
?>