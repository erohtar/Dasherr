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

function updateSettingsJson(fileData) {
	var data = new FormData();
	data.append('data' , fileData);
	var xhr = new XMLHttpRequest();
	xhr.open( 'POST', 'include/save_settings.php', false );
	xhr.send(data);
	window.location.href = 'index.php';
}

$('#saveFile').on('click', function () {
	updateSettingsJson(JSON.stringify(editor.get(readSettingsJson()), null, '\t'));
});
$('#resetFile').on('click', () => {
	if (confirm('This will reset your settings.json to default. Confirm action?')) {
		updateSettingsJson(fileReader('settings.sample.json'));
	}
})

</script>";
;?>