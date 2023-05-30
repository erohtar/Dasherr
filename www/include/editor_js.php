<?php
echo "<script type = 'text/javascript'>

//globals

//load file
const editor = new JsonEditor('#json-display', readSettingsJson());
editor.load(readSettingsJson());
applyTheme();


function readSettingsJson() {
	try {
		return JSON.parse(fileReader(settingsFile));
	} catch (e) {
		alert('Wrong JSON Format: ' + e);
	}
}

function updateSettingsJson(fileData) {
	var data = new FormData();
	data.append('data' , fileData);
	data.append('file', settingsFile);
	var xhr = new XMLHttpRequest();
	xhr.open( 'POST', 'include/save_settings.php', false );
	xhr.send(data);
	window.location.href = `/?s=\${settingsFile}`;
}

$('#saveFile').on('click', function () {
	updateSettingsJson(JSON.stringify(editor.get(readSettingsJson()), null, '\t'));
});
$('#resetFile').on('click', () => {
	if (confirm(`This will reset your \${settingsFile} to default. Confirm action?`)) {
		updateSettingsJson(fileReader('settings.sample.json'));
	}
})

</script>";
;?>