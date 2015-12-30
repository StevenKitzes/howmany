var navLogoButtonLeft, navHomeButton, navAboutButton, navLogoButtonRight;

function init() {
	navLogoButtonLeft = document.getElementById('navLogoButtonLeft');
	navHomeButton = document.getElementById('navHomeButton');
	navAboutButton = document.getElementById('navAboutButton');
	navLogoButtonRight = document.getElementById('navLogoButtonRight');

	navLogoButtonLeft.addEventListener('click', handleClick, false);
	navHomeButton.addEventListener('click', handleClick, false);
	navAboutButton.addEventListener('click', handleClick, false);
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
	if(clickEvent.target == navLogoButtonRight) {
		window.location = 'index.html';
		return;
	}
}

window.addEventListener('load', init, false);