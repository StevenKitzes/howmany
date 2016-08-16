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
	
	window.scrollTo(0,0);
}

function handleClick(clickEvent) {
	if(clickEvent.currentTarget == navLogoButtonLeft) {
		window.location = './';
		return;
	}
	if(clickEvent.currentTarget == navHomeButton) {
		window.location = './';
		return;
	}
	if(clickEvent.currentTarget == navAboutButton) {
		window.location = './about.html';
		return;
	}
	if(clickEvent.currentTarget == navThanksButton) {
		window.location = './thanks.html';
		return;
	}
	if(clickEvent.currentTarget == navLogoButtonRight) {
		window.location = './';
		return;
	}
}

window.addEventListener('load', initNav, false);
