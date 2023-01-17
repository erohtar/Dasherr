<?php
if(!empty($_POST['data'])){
	$fname = $_POST['file'];

	//check if file name ends with .json
	if(substr($fname, -1, 5) != '.json') {
		echo '<script>alert("ERROR: Incorrect file type submitted")</script>';
		return;
	}

	$data = $_POST['data'];

	$file = fopen($fname, "w");
	fwrite($file, $data);
	fclose($file);
}
?>