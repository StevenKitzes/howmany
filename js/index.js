var DEBUG = false;
var MAX_DECIMAL_FACTOR = 4;
var conversionValue = 29.5735;
NORMALIZE_OZ = 12; // set by FDA
NORMALIZE_ABV = 5; // set by FDA

var DEBUG_updateCounter;
var clearButton;
var textOZ, textML, textABV;
var radioMale, radioFemale;
var textWeight, textCost;
var focusedTextInput;
var resultDiv, resultSpan;

function init() {
	DEBUG_updateCounter = 0;
	
	clearButton = document.getElementById('clearButton');
	textOZ = document.getElementById('ounces');
	textML = document.getElementById('milliliters');
	textABV = document.getElementById('abv');
	textWeight = document.getElementById('bodyWeight');
	textCost = document.getElementById('cost');
	radioMale = document.getElementById('male');
	radioFemale = document.getElementById('female');
	resultDiv = document.getElementById('resultDiv');
	resultSpan = document.getElementById('result');

	document.getElementById('body').addEventListener('click', clickHandler, false);
	clearButton.addEventListener('click', clickHandler, false);
	radioMale.addEventListener('click', clickHandler, false);
	radioFemale.addEventListener('click', clickHandler, false);
	textOZ.addEventListener('focus', handleFocus, false);
	textML.addEventListener('focus', handleFocus, false);
	textABV.addEventListener('focus', handleFocus, false);
	textWeight.addEventListener('focus', handleFocus, false);
	textCost.addEventListener('focus', handleFocus, false);
	textOZ.addEventListener('keyup', handleKeyUp, false);
	textML.addEventListener('keyup', handleKeyUp, false);
	textABV.addEventListener('keyup', handleKeyUp, false);
	textWeight.addEventListener('keyup', handleKeyUp, false);
	textCost.addEventListener('keyup', handleKeyUp, false);
	
	textOZ.focus();
	
	updateResult();
	
	window.scrollTo(0,0);
	
	dOut('init complete, no errors');
}

function clickHandler(clickEvent) {
	dOut('click detected');

	if(clickEvent.target == clearButton) {
		textOZ.value = '';
		textML.value = '';
		textABV.value = '';
		textWeight.value = '';
		textCost.value = '';
		
		textOZ.focus();
		
		updateResult();
		
		return;
	}
	
	if(clickEvent.target == radioMale) {
		radioMale.classList.add('active');
		radioFemale.classList.remove('active');
	}
	if(clickEvent.target == radioFemale) {
		radioMale.classList.remove('active');
		radioFemale.classList.add('active');
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
			return;
		}
		textML.focus();
		if(parseFloat(textML.value) == 0) {
			textML.value = '';
		}
	}
	else if(focusedTextInput == textML) {
		textABV.focus();
	}
	else if(focusedTextInput == textABV) {
		textWeight.focus();
	}
	else if(focusedTextInput == textWeight) {
		textCost.focus();
	}
	else if(focusedTextInput == textCost) {
		if(!validVolume) {
			textOZ.focus();
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
	
	var errFound = false;
	
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

	resultHTML.push(generateStats(errFound, oz, abv));
	
	resultSpan.innerHTML = resultHTML.join('');
	dOut('Updates so far: ' + DEBUG_updateCounter);
}

// pushes the given string onto the end of the given array, only if DEBUG is enabled
function debugPushString(arr, str) {
	if(DEBUG) arr.push(str);
}

// param 'oz' is the volume given by the user
// param 'abv' is the abv rating given by the user
function generateStats(err, oz, abv) {
    dOut('generating results');
    if(err) return '<p class="slim"><em>Complete the form without errors to get your results!</em></p>';
	
	var ratioABV = abv / NORMALIZE_ABV;
	var ratioOZ = oz / NORMALIZE_OZ;
	var totalDrinks = ratioABV * ratioOZ;
	
	var ozToOneDrink = oz / totalDrinks;
	var ozToOneDrinkHTML = [];
	ozToOneDrinkHTML.push(
		'<li class="list-group-item list-group-item-info">',
			'<strong>' + truncateZeroes(ozToOneDrink.toFixed(2)) + 'oz:</strong>',
			'<span class="badge-right colors-main">',
			'1 drink',
			'</span>',
		'</li>'
	);
	var ozToOneDrinkHTMLStr = ozToOneDrinkHTML.join('');
	
	var outputHTML = [];
	
	outputHTML.push(
		'<ul class="list-group left-align">',
			'<li class="list-group-item list-group-item-info">',
				'<strong>Total drinks:</strong>',
				'<span class="badge-right colors-main">',
				totalDrinks.toFixed(2),
				'</span>',
			'</li>',
			'<li class="list-group-item',
			(totalDrinks > 2 ? ' list-group-item-danger' : (totalDrinks > 1 ? ' list-group-item-warning' : ' list-group-item-success')),
			'">',
				'In a 24 hour period:',
				'<span class="badge">',
				(totalDrinks > 2 ? 'FDA says no' : (totalDrinks > 1 ? 'Men yes, women no' : 'FDA says okay')),
				'</span>',
			'</li>',
			'<li class="list-group-item list-group-item-danger">',
				'Wait to drive:',
				'<span class="badge">',
				(totalDrinks * 2 / 3).toFixed(2),
				' hours after last sip</span>',
			'</li>',
			'<li class="list-group-item',
			(textCost.value == '' || textCost.value == '0' ? ' list-group-item-warning' : ''),
			'">',
				'Cost per drink:',
				'<span class="badge">',
				(textCost.value == '' || textCost.value == '0' ? 'No cost entered.' : ('$' + (parseFloat(textCost.value)/totalDrinks).toFixed(2))),
				'</span>',
			'</li>',
		'</ul>',
		'New particulars: <button type="button" class="btn btn-dark btn-slim" onclick="textOZ.focus(); textOZ.select(); inputDiv.scrollIntoView(true);">Go</button><br><br>',
		'<div class="panel panel-default">',
			'<div class="panel-heading"><h3 class="panel-title">Quick reference by volume:</h3></div>',
				'<ul class="list-group left-align">',
					(ozToOneDrink < 2 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item">',
						'2oz:',
						'<span class="badge">',
						ozToDrinksFixedTwo(ratioABV, 2),
						' drinks</span>',
					'</li>',
					(ozToOneDrink > 2 && ozToOneDrink < 4 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item">',
						'4oz:',
						'<span class="badge">',
						ozToDrinksFixedTwo(ratioABV, 4),
						' drinks</span>',
					'</li>',
					(ozToOneDrink > 4 && ozToOneDrink < 8 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item">',
						'8oz:',
						'<span class="badge">',
						ozToDrinksFixedTwo(ratioABV, 8),
						' drinks</span>',
					'</li>',
					(ozToOneDrink > 8 && ozToOneDrink < 12 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item',
					(ozToOneDrink == 12 ? ' list-group-item-info' : ''),
					'">',
						(ozToOneDrink == 12 ? '<strong>' : ''),
						'12oz:',
						(ozToOneDrink == 12 ? '</strong>' : ''),
						'<span class="',
						(ozToOneDrink == 12 ? 'badge-right colors-main' : 'badge'),
						'">',
						ozToDrinksFixedTwo(ratioABV, 12),
						' drink' + (ozToOneDrink == 12 ? '' : 's') + '</span>',
					'</li>',
					(ozToOneDrink > 12 && ozToOneDrink < 16 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item">',
						'16oz:',
						'<span class="badge">',
						ozToDrinksFixedTwo(ratioABV, 16),
						' drinks</span>',
					'</li>',
					(ozToOneDrink > 16 && ozToOneDrink < 16.91 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item">',
						'<em>500ml</em>:',
						'<span class="badge">',
						ozToDrinksFixedTwo(ratioABV, 16.91),
						' drinks</span>',
					'</li>',
					(ozToOneDrink > 16.91 && ozToOneDrink < 22 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item">',
						'22oz:',
						'<span class="badge">',
						ozToDrinksFixedTwo(ratioABV, 22),
						' drinks</span>',
					'</li>',
					(ozToOneDrink > 22 && ozToOneDrink < 25.36 ? ozToOneDrinkHTMLStr : ''),
					'<li class="list-group-item">',
						'<em>750ml</em>:',
						'<span class="badge">',
						ozToDrinksFixedTwo(ratioABV, 25.36),
						' drinks</span>',
					'</li>',
					(ozToOneDrink > 25.36 ? ozToOneDrinkHTMLStr : ''),
				'</ul>',
			'</div>',
		'</div>'
	);
	
	return outputHTML.join('');
}

// param 'abv': normalized ABV calculated from user input
// param 'oz': volume given by calling method
// returns: drinks per given volume, as a string with at most two trailing decimal places
function ozToDrinksFixedTwo(abv, oz) {
	var output = (abv * (oz / NORMALIZE_OZ)).toFixed(2);
	return truncateZeroes(output);
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
	textWeight.value = truncateZeroes(textWeight.value);
	textCost.value = truncateZeroes(textCost.value);
}

// expects parameter to be a string
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