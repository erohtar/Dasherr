//globals
var gSettings = JSON.parse(fileReader("settings.json"));
var currTheme = gSettings.themes[gSettings.page.theme];

//load file
const editor = new JsonEditor('#json-display', getJson());
editor.load(getJson());
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

function getJson() {
	try {
		return JSON.parse(fileReader('settings.json'));
	} catch (ex) {
		alert('Wrong JSON Format: ' + ex);
	}
}

$('#saveFile').on('click', function () {
	let fileData = JSON.stringify(editor.get(getJson()), null, '\t');
	
	var data = new FormData();
	data.append("file" , '../settings.json');
	data.append("data" , fileData);
	var xhr = new XMLHttpRequest();
	xhr.open( 'POST', 'include/filesave.php', false );
	xhr.send(data);
	console.log('done');
	location.reload();
	return false;
});

function applyTheme() {
	//hate duplicating code here. there has to be a better way to include theming code in just a single file

	if (currTheme.background) {
		$('body').css("background-image", "url('" + currTheme.background +"')");
	}
	$('body').css("--bs-body-color", currTheme.colorSc);
	$('body').css("background-color", currTheme.colorBg);
	$('.dot').css("background-color", currTheme.colorOf);
	$('.tile').css("color", currTheme.colorPr);
	$('.widget').css("color", currTheme.colorPr);
}

