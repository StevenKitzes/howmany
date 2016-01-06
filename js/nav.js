var navLogoButtonLeft, navHomeButton, navAboutButton, navThanksButton, navLogoButtonRight;

function initNav() {
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