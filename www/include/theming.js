function applyTheme() {
	//all theming done here except 'green' indicator of services, which needs to be done right after online check applies the updated class to them

	if (currTheme.background) {
		$('body').css("background-image", "url('" + currTheme.background +"')");
	}
	$('body').css("--bs-body-color", currTheme.colorSc);
	$('body').css("background-color", currTheme.colorBg);
	$('.dot').css("background-color", currTheme.colorOf);
	$('.tile').css("color", currTheme.colorPr);
	$('.iconButton').css("color", currTheme.colorPr);
	$('.widget').css("color", currTheme.colorPr);

	let iconObjs = document.querySelectorAll('object[id^="iconObj"]');
	iconObjs.forEach(function(iconObj) {
		iconObj.addEventListener('load', function() {
		let svgDoc = iconObj.contentDocument;
		if (svgDoc) {
			let svgElements = svgDoc.querySelectorAll('*');
			svgElements.forEach(function(element) {
			if (element.tagName === 'path' || element.tagName === 'circle' || element.tagName === 'rect') {
				element.setAttribute('fill', currTheme.colorPr);
			}
			});
		}
		});
	});
}
