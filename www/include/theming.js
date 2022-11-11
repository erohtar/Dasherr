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
}
