var DEBUG = true;
var MAX_DECIMAL_FACTOR = 4;
var conversionValue = 29.5735;

var DEBUG_updateCounter;
var clearButton;
var textOZ, textML, textABV;
var textCost;
var focusedTextInput;
var resultDiv, resultSpan;

function init() {
	DEBUG_updateCounter = 0;
	
	clearButton = document.getElementById('clearButton');
	textOZ = document.getElementById('ounces');
	textML = document.getElementById('milliliters');
	textABV = document.getElementById('abv');
	textCost = document.getElementById('cost');
	resultDiv = document.getElementById('resultDiv');
	resultSpan = document.getElementById('result');

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
	}
}

function handleKeyUp(keyEvent) {
	dOut('keyup detected');
	
	if(keyEvent.which == 13) {
		moveFocus(textOZ.value != '' && parseFloat(textOZ.value) != 0);
		return;
	}
	
	var target = keyEvent.target;
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

function moveFocus(skip) {
	if(focusedTextInput == textOZ) {
		if(skip) {
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
		resultDiv.scrollIntoView(true);
		//textOZ.focus();
		//focusedTextInput = textOZ;
	}
}

/*
function handleWhyBoxClick(clickEvent) {
    var resultHTML = [];
	
	if(whyBoxOpen) {
		resultHTML.push('<h1>"Why does this page exist?"</h1><h6>(click to find out)</h6>');
		whyBoxOpen = false;
		
		inputDiv.scrollIntoView(true);
	}
	else {
		resultHTML.push('<h6>(<strong>click again</strong> to close)</h6>');
		resultHTML.push('<p>As the craft beer movement has taken off in recent years, and breweries have begun producing ');
		resultHTML.push('beers of wildly varying sizes and ABV percentages, I got to wondering what exactly it meant ');
		resultHTML.push('when someone talked about having "a beer," or even what the FDA meant when they published ');
		resultHTML.push('guidelines on "a serving" of alcohol.  You always hear that, but what does it mean? ');
		resultHTML.push('What <em>is</em> "a serving" of alcohol?</p>');
		resultHTML.push('<p>The FDA defines a serving of alcohol as one of the following: 1.5oz of 80 proof (40%) liquor, ');
		resultHTML.push('5oz of 12% "table wine," or 12oz of 5% beer.  If you do the math, defining a drink as a flat, ');
		resultHTML.push('absolute value volume of pure alcohol, then percentage wise all three of the FDA\'s serving ');
		resultHTML.push('recommendations are equivalent: the suggested beer, wine, and liquor serving sizes all contain ');
		resultHTML.push('<em>exactly</em> 0.6oz of pure alcohol.</p>');
		resultHTML.push('<p>But here\'s the rub: I can\'t remember the last time I saw a craft beer on the shelf that fell ');
		resultHTML.push('at or under 5%, and I\'d bet you haven\'t either (the odd Berlinerweiss or craft lager aside). ');
		resultHTML.push('For that matter, most of the wine I come across is over 12%, and many liquors deviate from the ');
		resultHTML.push('FDA\'s simple 80 proof guideline.</p>');
		resultHTML.push('<p>So I wanted to know: when I buy a 22oz beer, and it\'s marked as 8% ABV, how many servings are ');
		resultHTML.push('in there?  How many servings of beer does that bottle provide?  And what does it mean for your ');
		resultHTML.push('overall health if you have been drinking 22oz bottles of craft beer, thinking to yourself, "oh, ');
		resultHTML.push('I\'ll just have <em>a beer</em>?</p>');
		resultHTML.push('<p>I finally did the math one day, and it caught me off guard not just that I had estimated ');
		resultHTML.push('incorrectly, but by <em>how badly</em> wrong I was.  It\'s easy enough to lose track of how much ');
		resultHTML.push('you\'ve had when drinking, as it is; when you start thinking about the variety of serving sizes ');
		resultHTML.push('and ABV ratings out there on all these different brews, it\'s even easier to forget just how much ');
		resultHTML.push('you\'re drinking!</p>');
		resultHTML.push('<p>So I figured I\'d put together a little calculator to help you figure out just how heavy that ');
		resultHTML.push('bottle really is.  Just pop in a few quick values - volume of drink (could be beer or anything ');
		resultHTML.push('else) and ABV - and I\'ll tell you how many drinks you\'ve got.</p>');
		resultHTML.push('<p>The results are... <em>sobering</em>.  ;)</p>');
		resultHTML.push('<strong>(click to close)</strong>');
		whyBoxOpen = true;
		
		whyBox.scrollIntoView(true);
	}
	
	whyBox.innerHTML = resultHTML.join('');
}
*/

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
	resultHTML.push('<ul class="list-group">');
	
	if(textML.value == '' || textOZ.value == '' || ml == 0 || oz == 0) {
		errFound = true;
		resultHTML.push('<li class="list-group-item list-group-item-danger">');
		resultHTML.push('<img class="icon v-align-middle" src="img/err-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push('Invalid volume');
		resultHTML.push('</span>');
		resultHTML.push('</li>');
	}
	else {
		resultHTML.push('<li class="list-group-item list-group-item-success">');
		resultHTML.push('<img class="icon v-align-middle" src="img/check-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push('Registered ' + oz + ' fl.oz. (' + ml + ' ml)');
		resultHTML.push('</span>');
		resultHTML.push('</li>');
	}
	
	if(textABV.value == '' || abv == 0) {
		errFound = true;
		resultHTML.push('<li class="list-group-item list-group-item-danger">');
		resultHTML.push('<img class="icon v-align-middle" src="img/err-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push('Invalid ABV');
		resultHTML.push('</span>');
		resultHTML.push('</li>');
	}
	else {
		resultHTML.push('<li class="list-group-item list-group-item-success">');
		resultHTML.push('<img class="icon v-align-middle" src="img/check-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push('Registered ABV of ' + abv + '%');
		resultHTML.push('</span>');
		resultHTML.push('</li>');
	}
	
	if(textCost.value == '' || cost == 0) {
		resultHTML.push('<li class="list-group-item list-group-item-warning">');
		resultHTML.push('<img class="icon v-align-middle" src="img/warn-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push('No cost entered');
		resultHTML.push('</span>');
		resultHTML.push('</li>');
	}
	else {
		resultHTML.push('<li class="list-group-item list-group-item-success">');
		resultHTML.push('<img class="icon v-align-middle" src="img/check-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push('Registered cost of $' + cost);
		resultHTML.push('</span>');
		resultHTML.push('</li>');
	}
	
	// end status notifications
	resultHTML.push('</ul>');
	
	resultHTML.push(generateStats(errFound, genderDefined, oz, abv));
	
	resultHTML.push(errFound ? '' : '<br><input type="button" value="Again!" onclick="textOZ.focus(); textOZ.select(); inputDiv.scrollIntoView(true);">');
	
    resultSpan.innerHTML = resultHTML.join('');
	dOut('Updates so far: ' + DEBUG_updateCounter);
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
				'<span class="badge">' + totalDrinks.toFixed(2) + '</span>',
			'</li>',
			'<li class="list-group-item' + (totalDrinks > 2 ? ' list-group-item-danger' : (totalDrinks > 1 ? ' list-group-item-warning' : ' list-group-item-success')) + '">',
				'In a 24 hour period:',
				'<span class="badge">' + (totalDrinks > 2 ? 'FDA says no' : (totalDrinks > 1 ? 'Men yes, women no' : 'FDA says okay')) + '</span>',
			'</li>',
			'<li class="list-group-item list-group-item-danger">',
				'When can you drive:',
				'<span class="badge">At least ' + (totalDrinks * 2 / 3).toFixed(2) + ' hours</span>',
			'</li>',
			'<li class="list-group-item">',
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
    var decimals = 0;
	var output = '';
	
	for(var ch = 0; ch < input.length; ch++) {
		//dOut('checking char: ' + ch + ' decimals: ' + decimals);
		var current = input.charAt(ch);
		if(current == '.' && decimals == 0) {
			decimals++;
			output = output + '.';
		}
		if ( /[0-9]/.test(input.charAt(ch)) ) {
			output = output + input.charAt(ch);
		}
		//dOut('current output length: ' + output.length + ' current output: ' + output);
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
	var last = input.charAt(input.length - 1);
	if(last == '.') {
		return true;
	}
	return false;
}

function dOut(msg) {
    if(DEBUG) console.log(msg);
}

window.addEventListener('load', init, false);