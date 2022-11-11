//globals
var gSettings = JSON.parse(fileReader("settings.json"));
var currTheme = gSettings.themes[gSettings.page.theme];

//load file
const editor = new JsonEditor('#json-display', readSettingsJson());
editor.load(readSettingsJson());
applyTheme();

function fileReader(pathOfFileToReadFrom)
{
	var request = new XMLHttpRequest();
	request.open("GET", pathOfFileToReadFrom, false);
	request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	request.setRequestHeader("Access-Control-Allow-Origin", "*");
	request.send(null);
	return request.responseText;
}

function readSettingsJson() {
	try {
		return JSON.parse(fileReader('settings.json'));
	} catch (ex) {
		alert('Wrong JSON Format: ' + ex);
	}
}

$('#saveFile').on('click', function () {
	let fileData = JSON.stringify(editor.get(readSettingsJson()), null, '\t');
	
	var data = new FormData();
	//for the php file, settings.json is in parent folder
	data.append("file" , '../settings.json');
	data.append("data" , fileData);
	var xhr = new XMLHttpRequest();
	xhr.open( 'POST', 'include/filesave.php', false );
	xhr.send(data);
	
	setTimeout(() => {
		window.location.href = 'index.html';
	}, 1000);
});
