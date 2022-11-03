//globals
var gSettings = JSON.parse(fileReader("settings.json"));
var currTheme = gSettings.page.theme;

//setup widget auto-refresh
setInterval(glances, gSettings.widgets.glances.refreshMs);

//start on load and then regularly refresh
window.onload = function() {
	//show page here for debugging
	//document.getElementsByClassName("container")[0].style = "display:block;";

	//page settings
	document.title = gSettings.page.title;
	document.getElementById("pageTitle").innerHTML = gSettings.page.title;
	
	//refresh widgets on page load
	if(gSettings.widgets.glances.url != "") {
		glances();
	};
	
	createSections();
	applyTheme();
	
	//show page now after creating elements
	document.getElementsByClassName("container")[0].style = "display:block;";
	//return;

	//check online status of all tiles
	for (var n1 = 0; n1 < gSettings.sections.length; n1++) {
		if (gSettings.sections[n1].disable) {
			//allows quickly disabling a section
			continue
		};
		for (var n2 = 0; n2 < gSettings.sections[n1].tiles.length; n2++) {
			var thisUrl = gSettings.sections[n1].tiles[n2].url;
			var thisDot = document.getElementById("dot" + gSettings.sections[n1].tiles[n2].name)
			
			checkOnline(thisUrl, thisDot)
		}
	}
};

//to read settings file
function fileReader(pathOfFileToReadFrom)
{
	var request = new XMLHttpRequest();
	request.open("GET", pathOfFileToReadFrom, false);
	request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	request.setRequestHeader("Access-Control-Allow-Origin", "*");
	request.send(null);
	var returnValue = request.responseText;

	return returnValue;
}


//widget refresh functions
function glances() {
	$.getJSON({url: gSettings.widgets.glances.url + "api/3/quicklook"}).done(function (result, status, xhr) {
		document.getElementById("cpuPrct").innerText = result.cpu + "%"
		document.getElementById("memPrct").innerText = result.mem + "%"
	});
	
	$.getJSON({url: gSettings.widgets.glances.url + "api/3/sensors"}).done(function (result, status, xhr) {
		document.getElementById("cpuTemp").innerText = result[0].value + "C"
	});
}


function createSections() {
	var hostDiv = document.getElementById("tilesServices");
	for (var n1 = 0; n1 < gSettings.sections.length; n1++) {
		if (gSettings.sections[n1].disable) {
			//allows quickly disabling a section
			continue
		};
		
		var secDiv = document.createElement("div");
		
		secDiv.classList.add("col");
		secDiv.classList.add("col-sm-6");
		
		hostDiv.appendChild(secDiv);
		
		var secTitle = document.createElement("div");
		
		secTitle.classList.add("h6");
		secTitle.innerHTML = gSettings.sections[n1].name + "<hr>";
		
		secDiv.appendChild(secTitle);
		
		for (var n2 = 0; n2 < gSettings.sections[n1].tiles.length; n2++) {
			//add indicator dot
			var tileDot = document.createElement("span");
			tileDot.id = "dot" + gSettings.sections[n1].tiles[n2].name;
			tileDot.classList.add("dot");
			
			secDiv.appendChild(tileDot);
			
			
			//add link to tile
			var tileLink = document.createElement("a");
			tileLink.id = "tile" + gSettings.sections[n1].tiles[n2].name;
			tileLink.href = gSettings.sections[n1].tiles[n2].url;
			
			tileLink.classList.add("tile");
			tileLink.classList.add("btn");

			secDiv.appendChild(tileLink);
			
			//add fontawesome icon to tile
			if (gSettings.sections[n1].tiles[n2].faIcon != "") {
				var tileIcon = document.createElement("i");
				tileIcon.id = "icon" + gSettings.sections[n1].tiles[n2].name;
				tileIcon.className = gSettings.sections[n1].tiles[n2].faIcon;
				tileIcon.style = "margin-right: 5px;";
				
				tileLink.appendChild(tileIcon);
			}
			tileLink.innerHTML = tileLink.innerHTML + gSettings.sections[n1].tiles[n2].name;
		}
	}
}

function applyTheme() {
	//all theming done here except 'green' indicator of services, which needs to be done right after online check applies the updated class to it

	if (gSettings.themes[gSettings.page.theme].background) {
		$('body').css("background-image", "url('" + gSettings.themes[gSettings.page.theme].background +"')");
	}
	$('body').css("--bs-body-color", gSettings.themes[gSettings.page.theme].colorSc);
	$('body').css("background-color", gSettings.themes[gSettings.page.theme].colorBg);
	$('.dot').css("background-color", gSettings.themes[gSettings.page.theme].colorOf);
	$('.tile').css("color", gSettings.themes[gSettings.page.theme].colorPr);
	$('.widget').css("color", gSettings.themes[gSettings.page.theme].colorPr);
}

async function checkOnline(thisUrl, thisId) {
	//reads all tiles from settings and sets their respective indicators to green
	const options = {
		method: "GET",
		mode: "no-cors"
	};

	const response = await fetch(thisUrl,options);
	if (response.status = 200) {
		thisId.className = thisId.className.replace(/dot(?!\S)/g, "dot dot-green");
		
		//this theming needs to be done here because js can't change style of future elements of a class
		$('.dot-green').css("background-color", gSettings.themes[gSettings.page.theme].colorOn);
	} else {
		//console.log(thisUrl + " : " + response.status);
	}
}