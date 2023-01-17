<!doctype html>
<html lang="en">
  <head>
	<title>Dasherr Settings</title>

	<meta http-equiv='cache-control' content='no-cache'>
	<meta http-equiv='expires' content='0'>
	<meta http-equiv='pragma' content='no-cache'>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
	<link href="include/bootstrap.min.css" rel="stylesheet">
	<link href="include/custom.css" rel="stylesheet">
	<link rel="icon" href="res/favicon.svg" sizes="32x32" type="image/png">

	<script src="include/preload.js"></script>
	<script src="include/theming.js"></script>

	<script src="include/bootstrap.bundle.min.js"></script>
	<script src="include/jquery.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    
	<script type="text/javascript" src="include/jquery.json-editor.min.js"></script>
  </head>
  <body>
	<!-- Window Contents -->
	
	<div class="container col-lg-12 col-xl-10">

		<!-- Container Contents -->
		<a href="#" onclick="javascript:settingsFile? window.location = 'index.php?s=' + settingsFile : window.location = 'index.php';" class="iconButton float-end"><i class="fa-solid fa-server"></i></a>
		
		<div class="row">
			<h2 id="pageTitle">Dasherr Settings</h2>
			<hr>
		</div>
		
		<a href="#" class="iconButton"><i id="saveFile" class="fa-solid fa-floppy-disk"></i></a>
		<pre id="json-display"></pre>

		<!-- End Container Contents -->
	</div>

	<!-- editor.js needs to be loaded at the end -->
	<?php include 'include/editor_js.php';?>

	<!-- End Window Contents -->
	</body>
</html>
