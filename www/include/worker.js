//define global vars

let enableTooltips = false;

window.onload = function() {
	//show page contents at this point
	document.getElementsByClassName('container')[0].style = 'display:block;';

	//page settings
	document.title = gSettings.page.title;
	document.getElementById('pageTitle').innerHTML = gSettings.page.title;
	
	//create widgets
	if (gSettings.widgets.length > 0)
	{
		for (let n1 = 0; n1 < gSettings.widgets.length; n1++) {
			if (gSettings.widgets[n1].disable) {
				//allows quickly disabling a widget
				continue;
			}
			document.getElementById('areaWidgets').style = 'display:flex;';
			
			//glances
			if(gSettings.widgets[n1].type === "glances") {
				createWidgetGlances(n1);
				setInterval(refreshWidgetGlances, gSettings.widgets[n1].settings.refreshMs, n1);
				refreshWidgetGlances(n1);
			}
		}
	}
	
	//create sections+tiles for services
	createSections();

	//apply theme now
	applyTheme();
	
	//check online status of all tiles
	for (let n1 = 0; n1 < gSettings.sections.length; n1++) {
		if (gSettings.sections[n1].disable) {
			//allows quickly disabling a section
			continue;
		}
		
		for (let n2 = 0; n2 < gSettings.sections[n1].tiles.length; n2++) {
    		if (gSettings.sections[n1].tiles[n2].disable) {
    			//allows quickly disabling a tile
    			continue;
    		}
			
			let thisUrl = gSettings.sections[n1].tiles[n2].url;
			let thisDot = document.getElementById('dot' + gSettings.sections[n1].name + gSettings.sections[n1].tiles[n2].name)
			
    		if (gSettings.sections[n1].tiles[n2].disableCheck) {
    			//allows quickly disabling a tile online check
    			thisDot.remove();
    			continue;
    		}
			
			checkOnline(thisUrl, thisDot)
		}
	}
	
	//enable tooltips only if used anywhere
	if (enableTooltips === true) {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
	}
};


function createSections() {
	let hostDiv = document.getElementById('areaSections');
	for (let n1 = 0; n1 < gSettings.sections.length; n1++) {
		if (gSettings.sections[n1].disable) {
			//allows quickly disabling a section
			continue;
		}
		
		let thisSec = gSettings.sections[n1].name;

		let secDiv = document.createElement('div');
		
		secDiv.classList.add('col');
		secDiv.classList.add('col-sm-6');

		hostDiv.appendChild(secDiv);
		
		let secTitle = document.createElement('div');
		
		secTitle.classList.add('h6');
		
		//add tooltip to section
		if (gSettings.sections[n1].info) {
			enableTooltips = true;
			secTitle.setAttribute("data-bs-toggle", "tooltip");
			secTitle.setAttribute("data-bs-placement", "bottom");
			secTitle.setAttribute("data-bs-title", gSettings.sections[n1].info);
		}
		
		secTitle.innerHTML = thisSec + '<hr>';
			
		secDiv.appendChild(secTitle);
		
		//create tiles
		for (let n2 = 0; n2 < gSettings.sections[n1].tiles.length; n2++) {
    		if (gSettings.sections[n1].tiles[n2].disable) {
    			//allows quickly disabling a tile
    			continue;
    		}
            let thisTile = gSettings.sections[n1].tiles[n2].name;

			//add indicator dot
			let tileDot = document.createElement('span');
			tileDot.id = 'dot' + thisSec + thisTile;
			tileDot.classList.add('dot');
			
			secDiv.appendChild(tileDot);
			
			
			//add link to tile
			let tileLink = document.createElement('a');
			tileLink.id = 'tile' + thisSec + thisTile;
			tileLink.href = gSettings.sections[n1].tiles[n2].url;
			
			//check if this tile has a different openTab setting, if not, use the page setting
			let thisOpenTab;
			if(gSettings.sections[n1].tiles[n2].openTab) {
				thisOpenTab = gSettings.sections[n1].tiles[n2].openTab;
			} else {
				thisOpenTab = gSettings.page.openTab;
			}
			
			if (thisOpenTab === 'new') {
				tileLink.target = '_blank';
			}
			
			tileLink.classList.add('tile');
			tileLink.classList.add('btn');
			tileLink.classList.add('overflow-hidden');

			//add tooltip to tile
			if (gSettings.sections[n1].tiles[n2].info) {
				enableTooltips = true;
				tileLink.setAttribute("data-bs-toggle", "tooltip");
				tileLink.setAttribute("data-bs-placement", "bottom");
				tileLink.setAttribute("data-bs-title", gSettings.sections[n1].tiles[n2].info);
			}
			
			secDiv.appendChild(tileLink);
			
			//add fontawesome icon to tile
			if (gSettings.sections[n1].tiles[n2].faIcon) {
				let tileIcon = document.createElement('i');
				tileIcon.id = 'icon' + thisSec + thisTile;
				tileIcon.className = gSettings.sections[n1].tiles[n2].faIcon;
				tileIcon.classList.add('fa-fw');
				tileIcon.style = 'margin-right: 5px;';
				
				tileLink.appendChild(tileIcon);
			} else if (gSettings.sections[n1].tiles[n2].icon) {
				let tileIcon = document.createElement('img');
				tileIcon.id = 'iconImg' + thisSec + thisTile;
				tileIcon.src = gSettings.sections[n1].tiles[n2].icon;
				tileIcon.width = 20;
				tileIcon.className = gSettings.sections[n1].tiles[n2].icon;
				//tileIcon.classList.add('fa-fw');
				tileIcon.style = 'margin-right: 5px;';
				
				tileLink.appendChild(tileIcon);
			}

			tileLink.innerHTML = tileLink.innerHTML + thisTile;
		}
	}
}

async function checkOnline(thisUrl, thisId) {
	//reads all tiles from settings and sets their respective indicators to green
	const options = {
		method: 'GET',
		mode: 'no-cors',
		connection: 'close'
	};


	const response = await fetch(thisUrl,options);
	if (response.status = 200) {
		thisId.className = thisId.className.replace(/dot(?!\S)/g, 'dot dot-green');
		
		//this theming needs to be done here because js can't change style of future elements of a class
		$('.dot-green').css('background-color', currTheme.colorOn);
	} else {
		//console.log(thisUrl + ' : ' + response.status);
	}
}

//widget create functions
function createWidgetGlances(nW) {
	let hostDiv = document.getElementById('areaWidgets');
	
	let wgtDiv = document.createElement('div');
	
	wgtDiv.classList.add('col');
	wgtDiv.classList.add('col-sm-6');

	//add tooltip to widget
	if (gSettings.widgets[nW].info) {
		enableTooltips = true;
		wgtDiv.setAttribute("data-bs-toggle", "tooltip");
		wgtDiv.setAttribute("data-bs-placement", "bottom");
		wgtDiv.setAttribute("data-bs-title", gSettings.widgets[nW].info);
	}
	
	//add widget's name and hr under it only if name is specified
	wgtDiv.innerHTML = (gSettings.widgets[nW].name ? '<h7>' + gSettings.widgets[nW].name + '</h7><hr>' : '')
		+ '		<div class="widget widgetGlances text-end">'
		+ '			<div class="row">'
		+ '				<span class="col-2"><i class="fa fa-temperature-low"></i></span>'
		+ '				<span class="col-7" id="cpuTemp' + nW + '"></span>'
		+ '			</div>'
		+ '			<div class="row">'
		+ '				<span class="col-2"><i class="fa fa-microchip"></i></span>'
		+ '				<span class="col-7" id="cpuPrct' + nW + '"></span>'
		+ '			</div>'
		+ '			<div class="row">'
		+ '				<span class="col-2"><i class="fa fa-memory"></i></span>'
		+ '				<span class="col-7" id="memPrct' + nW + '"></span>'
		+ '			</div>'
		+ '		</div>'
	
	hostDiv.appendChild(wgtDiv);
}

//widget refresh functions
function refreshWidgetGlances(nW) {
	$.getJSON({url: gSettings.widgets[nW].settings.url + 'api/3/quicklook'}).done(function (result, status, xhr) {
		document.getElementById('cpuPrct' + nW).innerText = result.cpu + '%'
		document.getElementById('memPrct' + nW).innerText = result.mem + '%'
	});
	
	$.getJSON({url: gSettings.widgets[nW].settings.url + 'api/3/sensors'}).done(function (result, status, xhr) {
		document.getElementById('cpuTemp' + nW).innerText = (result.length > 0? result[0].value + 'C' : '-')
	});
}