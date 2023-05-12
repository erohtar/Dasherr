<?php
echo "<script type = 'text/javascript'>

//globals

//load file
const editor = new JsonEditor('#json-display', readSettingsJson());
editor.load(readSettingsJson());
applyTheme();


function readSettingsJson() {
	try {
		if (settingsFile)
			return JSON.parse(fileReader(settingsFile));
		else
			return JSON.parse(fileReader('settings.json'));
	} catch (e) {
		alert('Wrong JSON Format: ' + e);
	}
}

$('#saveFile').on('click', function () {
	let fileData = JSON.stringify(editor.get(readSettingsJson()), null, '\t');
	
	var data = new FormData();
	data.append('data' , fileData);
	var xhr = new XMLHttpRequest();
	xhr.open( 'POST', 'include/save_settings.php', false );
	xhr.send(data);
	
	setTimeout(() => {
		window.location.href = 'index.php';
	}, 1000);
});

</script>";
;?>