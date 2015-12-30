var DEBUG = true;
var MAX_DECIMAL_FACTOR = 4;
var conversionValue = 29.5735;

var DEBUG_updateCounter;
var navLogoButtonLeft, navHomeButton, navAboutButton, navLogoButtonRight;
var clearButton;
var textOZ, textML, textABV;
var textCost;
var focusedTextInput;
var resultDiv, resultSpan;

function init() {
	DEBUG_updateCounter = 0;
	
	navLogoButtonLeft = document.getElementById('navLogoButtonLeft');
	navHomeButton = document.getElementById('navHomeButton');
	navAboutButton = document.getElementById('navAboutButton');
	navLogoButtonRight = document.getElementById('navLogoButtonRight');
	clearButton = document.getElementById('clearButton');
	textOZ = document.getElementById('ounces');
	textML = document.getElementById('milliliters');
	textABV = document.getElementById('abv');
	textCost = document.getElementById('cost');
	resultDiv = document.getElementById('resultDiv');
	resultSpan = document.getElementById('result');

	navLogoButtonLeft.addEventListener('click', handleClick, false);
	navHomeButton.addEventListener('click', handleClick, false);
	navAboutButton.addEventListener('click', handleClick, false);
	navLogoButtonRight.addEventListener('click', handleClick, false);
	clearButton.addEventListener('click', handleClick, false);
	textOZ.addEventListener('focus', handleFocus, false);
	textML.addEventListener('focus', handleFocus, false);
	textABV.addEventListener('focus', handleFocus, false);
	textCost.addEventListener('focus', handleFocus, false);
	textOZ.addEventListener('keyup', handleKeyUp, false);
	textML.addEventListener('keyup', handleKeyUp, false);
	textABV.addEventListener('keyup', handleKeyUp, false);
	textCost.addEventListener('keyup', handleKeyUp, false);
	
	textOZ.focus();
	
	updateResult();
	
	window.scrollTo(0,0);
	
	dOut('init complete, no errors');
}

function handleClick(clickEvent) {
	dOut('click detected');
	
	if(clickEvent.target == clearButton) {
		textOZ.value = '';
		textML.value = '';
		textABV.value = '';
		textCost.value = '';
		
		textOZ.focus();
		
		updateResult();
		
		return;
	}
	
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

function handleKeyUp(keyEvent) {
	dOut('key event detected: ' + keyEvent.which);
	
	if(keyEvent.which == 13) {
		moveFocus(textOZ.value != '' && parseFloat(textOZ.value) != 0);
		return;
	}
	
	var target = keyEvent.target;
	dOut('value before formatNumber: ' + target.value);
	target.value = formatNumber(target.value);
	
	// if ML entered, modify OZ
	if(keyEvent.target == textML) {
		if(textML.value == '') {
			textOZ.value = '';
		}
		else if(parseFloat(textML.value) == 0) {
			textOZ.value = 0;
		}
		else {
			var ml = parseFloat(textML.value);
			var oz = ml / conversionValue;
			textOZ.value = oz;
		}
	}
	// else if OZ entered, modify ML
	else if(keyEvent.target == textOZ) {
		if(textOZ.value == '') {
			textML.value = '';
		}
		else {
			var oz = parseFloat(textOZ.value);
			var ml = oz * conversionValue;
			textML.value = ml;
		}
	}
	
	cleanInputs();
	updateResult();
}

function handleFocus(focusEvent) {
	focusedTextInput = focusEvent.target;
}

function moveFocus(validVolume) {
	if(focusedTextInput == textOZ) {
		if(validVolume) {
			textABV.focus();
			focusedTextInput = textABV;
			return;
		}
		textML.focus();
		if(parseFloat(textML.value) == 0) {
			textML.value = '';
		}
		focusedTextInput = textML;
	}
	else if(focusedTextInput == textML) {
		textABV.focus();
		focusedTextInput = textABV;
	}
	else if(focusedTextInput == textABV) {
		textCost.focus();
		focusedTextInput = textCost;
	}
	else if(focusedTextInput == textCost) {
		if(!validVolume) {
			textOZ.focus();
			focusedTextInput = textOZ;
			return;
		}
		resultDiv.scrollIntoView(true);
	}
}

function updateML() {
	if(textOZ.value == '') {
		textML.value = '';
	}
	else {
		var oz = parseFloat(textOZ.value);
		var ml = oz * conversionValue;
		textML.value = ml;
	}
}

function updateResult() {
	DEBUG_updateCounter++;
	
	var errFound = false, genderDefined = false;
	
	var resultHTML = [];
	
	var ml = parseFloat(textML.value);
	var oz = parseFloat(textOZ.value);
	var abv = parseFloat(textABV.value);
	var cost = parseFloat(textCost.value);

	// begin status notifications
	debugPushString(resultHTML, '<ul class="list-group">');
	
	if(textML.value == '' || textOZ.value == '' || ml == 0 || oz == 0) {
		errFound = true;
		debugPushString(resultHTML, '<li class="list-group-item list-group-item-danger">');
		debugPushString(resultHTML, '<img class="icon v-align-middle" src="img/err-mark.png"> ');
		debugPushString(resultHTML, '<span class="v-align-middle">');
		debugPushString(resultHTML, 'Invalid volume');
		debugPushString(resultHTML, '</span>');
		debugPushString(resultHTML, '</li>');
	}
	else {
		debugPushString(resultHTML, '<li class="list-group-item list-group-item-success">');
		debugPushString(resultHTML, '<img class="icon v-align-middle" src="img/check-mark.png"> ');
		debugPushString(resultHTML, '<span class="v-align-middle">');
		debugPushString(resultHTML, 'Registered ' + oz + ' fl.oz. (' + ml + ' ml)');
		debugPushString(resultHTML, '</span>');
		debugPushString(resultHTML, '</li>');
	}
	
	if(textABV.value == '' || abv == 0) {
		errFound = true;
		debugPushString(resultHTML, '<li class="list-group-item list-group-item-danger">');
		debugPushString(resultHTML, '<img class="icon v-align-middle" src="img/err-mark.png"> ');
		debugPushString(resultHTML, '<span class="v-align-middle">');
		debugPushString(resultHTML, 'Invalid ABV');
		debugPushString(resultHTML, '</span>');
		debugPushString(resultHTML, '</li>');
	}
	else {
		debugPushString(resultHTML, '<li class="list-group-item list-group-item-success">');
		debugPushString(resultHTML, '<img class="icon v-align-middle" src="img/check-mark.png"> ');
		debugPushString(resultHTML, '<span class="v-align-middle">');
		debugPushString(resultHTML, 'Registered ABV of ' + abv + '%');
		debugPushString(resultHTML, '</span>');
		debugPushString(resultHTML, '</li>');
	}
	
	if(textCost.value == '' || cost == 0) {
		debugPushString(resultHTML, '<li class="list-group-item list-group-item-warning">');
		debugPushString(resultHTML, '<img class="icon v-align-middle" src="img/warn-mark.png"> ');
		debugPushString(resultHTML, '<span class="v-align-middle">');
		debugPushString(resultHTML, 'No cost entered');
		debugPushString(resultHTML, '</span>');
		debugPushString(resultHTML, '</li>');
	}
	else {
		debugPushString(resultHTML, '<li class="list-group-item list-group-item-success">');
		debugPushString(resultHTML, '<img class="icon v-align-middle" src="img/check-mark.png"> ');
		debugPushString(resultHTML, '<span class="v-align-middle">');
		debugPushString(resultHTML, 'Registered cost of $' + cost);
		debugPushString(resultHTML, '</span>');
		debugPushString(resultHTML, '</li>');
	}
	
	// end status notifications
	debugPushString(resultHTML, '</ul>');

	resultHTML.push(generateStats(errFound, genderDefined, oz, abv));
	
	resultHTML.push(errFound ? '' : '<br><input type="button" value="Again!" onclick="textOZ.focus(); textOZ.select(); inputDiv.scrollIntoView(true);">');
	
    resultSpan.innerHTML = resultHTML.join('');
	dOut('Updates so far: ' + DEBUG_updateCounter);
}

// pushes the given string onto the end of the given array, only if DEBUG is enabled
function debugPushString(arr, str) {
	if(DEBUG) arr.push(str);
}

function generateStats(err, genderDefined, oz, abv) {
    dOut('generating results');
    if(err) return '<p class="slim"><em>Complete the form without errors to get your results!</em></p>';
	
	var baselineABV = 5;
	var baselineOZ = 12;
	var ratioABV = abv / baselineABV;
	var ratioOZ = oz / baselineOZ;
	var totalDrinks = ratioABV * ratioOZ;
	
	var outputHTML = [];
	
	outputHTML.push(
		'<ul class="list-group left-align">',
			'<li class="list-group-item">',
				'Total drinks:',
				'<span class="badge v-align-middle">' + totalDrinks.toFixed(2) + '</span>',
			'</li>',
			'<li class="list-group-item' + (totalDrinks > 2 ? ' list-group-item-danger' : (totalDrinks > 1 ? ' list-group-item-warning' : ' list-group-item-success')) + '">',
				'In a 24 hour period:',
				'<span class="badge">' + (totalDrinks > 2 ? 'FDA says no' : (totalDrinks > 1 ? 'Men yes, women no' : 'FDA says okay')) + '</span>',
			'</li>',
			'<li class="list-group-item list-group-item-danger">',
				'When can you drive:',
				'<span class="badge">At least ' + (totalDrinks * 2 / 3).toFixed(2) + ' hours</span>',
			'</li>',
			'<li class="list-group-item' + (textCost.value == '' || textCost.value == '0' ? ' list-group-item-warning' : '') + '">',
				'Cost per drink:',
				'<span class="badge">' + (textCost.value == '' || textCost.value == '0' ? 'No cost entered.' : ('$' + (parseFloat(textCost.value)/totalDrinks).toFixed(2))) + '</span>',
			'</li>',
		'</ul>',
		'<div class="panel panel-default">',
			'<div class="panel-heading"><h3 class="panel-title">Quick reference by volume:</h3></div>',
				'<ul class="list-group left-align">',
					'<li class="list-group-item">',
						'2oz:',
						'<span class="badge">' + (ratioABV * (2 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
					'<li class="list-group-item">',
						'4oz:',
						'<span class="badge">' + (ratioABV * (4 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
					'<li class="list-group-item">',
						'8oz:',
						'<span class="badge">' + (ratioABV * (8 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
					'<li class="list-group-item">',
						'12oz:',
						'<span class="badge">' + (ratioABV * (12 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
					'<li class="list-group-item">',
						'16oz:',
						'<span class="badge">' + (ratioABV * (16 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
					'<li class="list-group-item">',
						'<em>500ml</em>:',
						'<span class="badge">' + (ratioABV * (16.91 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
					'<li class="list-group-item">',
						'22oz:',
						'<span class="badge">' + (ratioABV * (22 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
					'<li class="list-group-item">',
						'<em>750ml</em>:',
						'<span class="badge">' + (ratioABV * (25.36 / baselineOZ)).toFixed(2) + ' drinks</span>',
					'</li>',
				'</ul>',
			'</div>',
		'</div>'
	);
	
	return outputHTML.join('');
}

function formatNumber(input) {
	dOut('--------------');
	dOut('formatting number: ' + input);
	
	// bounce back incoming value if last char is dot
	if(lastIsDot(input)) {
		dOut('bouncing back: ' + input);
		return input;
	}
	else {
		dOut('last was not dot');
	}
	
    var decimals = 0;
	var output = '';
	
	for(var ch = 0; ch < input.length; ch++) {
		dOut('checking char: ' + ch + ' decimals: ' + decimals);
		var current = input.charAt(ch);
		if(current == '.' && decimals == 0) {
			decimals++;
			output = output + '.';
		}
		if ( /[0-9]/.test(input.charAt(ch)) ) {
			output = output + input.charAt(ch);
		}
		dOut('current output length: ' + output.length + ' current output: ' + output);
	}
		
    return output;
}

function cleanInputs() {
	textML.value = truncateZeroes(textML.value);
	textOZ.value = truncateZeroes(textOZ.value);
	textABV.value = truncateZeroes(textABV.value);
	textCost.value = truncateZeroes(textCost.value);
}

function truncateZeroes(input) {
	if(isNaN(parseFloat(input))) return input;
	if(lastIsDot(input)) return input;
	
	var maxFactor = MAX_DECIMAL_FACTOR;
	var originalVal = parseFloat(input);
	var val = Math.round(originalVal * Math.pow(10, maxFactor));
	
	var power = maxFactor;
	while(power > 0) {
		var factor = Math.pow(10, power);
		if(val % factor == 0) {
			return originalVal.toFixed(maxFactor - power);
		}
		power--;
	}

	return originalVal.toFixed(maxFactor - power);
}

function lastIsDot(input) {
	dOut('checking ' + input + ' for last-is-dot...');
	var last = input.charAt(input.length - 1);
	if(last == '.') {
		dOut('returning true');
		return true;
	}
	dOut('returning false');
	return false;
}

function dOut(msg) {
    if(DEBUG) console.log(msg);
}

window.addEventListener('load', init, false);