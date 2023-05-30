//support for alt settings file (default being settings.json)
const urlParams = new URLSearchParams(window.location.search);
let settingsFile = urlParams.get('s') || 'settings.json';

const gSettings = JSON.parse(fileReader(settingsFile));

const currTheme = gSettings.themes[gSettings.page.theme];

function fileReader(pathOfFileToReadFrom)
{
	var request = new XMLHttpRequest();
	request.open("GET", pathOfFileToReadFrom, false);
	request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	request.setRequestHeader("Access-Control-Allow-Origin", "*");
	request.send(null);
	return request.responseText;
}
