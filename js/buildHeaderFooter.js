var headerDiv, footerDiv;
var navLogoButtonLeft, navHomeButton, navAboutButton, navThanksButton, navLogoButtonRight;

function initNav() {
	headerDiv = document.getElementById('header');
	footerDiv = document.getElementById('footer');
	
	var headerHTML = [];
	var footerHTML = [];
	
	headerHTML.push(
		'<br>',
		'<div class="btn-group" role="group">',
			'<button type="button" class="btn btn-custom" id="navLogoButtonLeft"><img alt="How many drinks in that drink?" class="icon" src="img/beer-icon.png"></button>',
			'<button type="button" class="btn btn-custom" id="navHomeButton">Home</button>',
			'<button type="button" class="btn btn-custom" id="navAboutButton">About</button>',
			'<button type="button" class="btn btn-custom" id="navThanksButton">Thanks</button>',
			'<button type="button" class="btn btn-custom" id="navLogoButtonRight"><img alt="How many drinks in that drink?" class="icon" src="img/beer-icon.png"></button>',
		'</div>',
		'<br><br>',
		'<img src="img/header.png"><br><br>'
	);
	footerHTML.push(
		'<hr class="colored-hr">',
		'<h6>',
			'© Copyright 2016 Steven Kitzes<br>',
			'Formula for BAC calculations borrowed from the <a href="http://www.ndaa.org/pdf/toxicology_final.pdf" title="NDAA">NDAA</a><br>',
			'Beer icon made from Creative Commons Attribution licensed images courtesy of:<br>',
			'<a href="http://www.freepik.com" title="Freepik">Freepik</a> via <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> (licensed under <a rel="license" href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons Attribution License 3.0">CC Attr 3.0</a>) and <a href="http://www.tOrange.us" title="tOrange">tOrange</a> via <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> (licensed under <a rel="license" href="http://creativecommons.org/licenses/by/4.0/" title="Creative Commons Attribution License 4.0">CC Attr 4.0</a>)<br>',
		'</h6>'
	);
	
	header.innerHTML = headerHTML.join('');
	footer.innerHTML = footerHTML.join('');
	
	navLogoButtonLeft = document.getElementById('navLogoButtonLeft');
	navHomeButton = document.getElementById('navHomeButton');
	navAboutButton = document.getElementById('navAboutButton');
	navThanksButton = document.getElementById('navThanksButton');
	navLogoButtonRight = document.getElementById('navLogoButtonRight');

	navLogoButtonLeft.addEventListener('click', handleClick, false);
	navHomeButton.addEventListener('click', handleClick, false);
	navAboutButton.addEventListener('click', handleClick, false);
	navThanksButton.addEventListener('click', handleClick, false);
	navLogoButtonRight.addEventListener('click', handleClick, false);
}

function handleClick(clickEvent) {
	if(clickEvent.target == navLogoButtonLeft) {
		window.location = 'index.html';
		return;
	}
	if(clickEvent.target == navHomeButton) {
		window.location = 'index.html';
		return;
	}
	if(clickEvent.target == navAboutButton) {
		window.location = 'about.html';
		return;
	}
	if(clickEvent.target == navThanksButton) {
		window.location = 'thanks.html';
		return;
	}
	if(clickEvent.target == navLogoButtonRight) {
		window.location = 'index.html';
		return;
	}
}

window.addEventListener('load', initNav, false);