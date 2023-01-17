<!doctype html>
<html lang="en">

  <?php include 'include/samplesettings.php';?>

  <head>
	<title>Dasherr</title>

	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />	
	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<link href="include/bootstrap.min.css" rel="stylesheet">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
	<link href="include/custom.css" rel="stylesheet">
	<link rel="icon" href="res/favicon.svg" sizes="32x32" type="image/png">
	
	<script src="include/bootstrap.bundle.min.js"></script>
	<script src="include/jquery.min.js"></script>
	
	<!-- theming.js and preload.js need to be loaded before worker.js -->
	<script src="include/preload.js"></script>
	<script src="include/theming.js"></script>
	<script src="include/worker.js"></script>
	
  </head>
  <body>
	<!-- Window Contents -->
	<div class="container col-lg-12 col-xl-10" style="display:none">
		<!-- Dashboard Contents -->

		<!-- Top right icons -->
		<a href="#" onclick="javascript:settingsFile? window.location = 'editor.php?s=' + settingsFile : window.location = 'editor.php';" class="iconButton float-end"><i class="fa-solid fa-wrench"></i></a>
		<a href="https://github.com/erohtar/Dasherr/" target="_blank" class="iconButton float-end"><i class="fa-brands fa-github"></i></a>
		
		<!-- Dashboard Title -->
		<div class="row">
			<h2 id="pageTitle"></h2>
			<hr>
		</div>
		
		<!-- Widgets get added here -->
		<div id="areaWidgets" class="row row-cols-3 row-cols-sm-4 row-cols-md-6 row-cols-lg-10 row-cols-xl-12 gy-5" style="display:none">
		</div>
	
		<br>

		<!-- Sections/Tiles get added here -->
		<div id="areaSections" class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-5">
		</div>
			
		<!-- End Dashboard Contents -->
	</div>


	<!-- End Window Contents -->
  </body>
</html>
