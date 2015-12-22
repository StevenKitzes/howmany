var DEBUG = true;

var SIMPLE_CONVERSION_VALUE = 30;
var ACCURATE_CONVERSION_VALUE = 29.5735;
var conversionValue;

var DEBUG_updateCounter;
var modeSpan, modeSpanOpen = true;
var textML, textOZ, textABV;
var radioSimple, radioAccurate;
var resultSpan;
var whyBox, whyBoxOpen = true;

function init() {
	DEBUG_updateCounter = 0; 
  
	modeSpan = document.getElementById('modeSpan');
	whyBox = document.getElementById('why');
	radioSimple = document.getElementById('simple');
	radioAccurate = document.getElementById('accurate');
	textML = document.getElementById('milliliters');
	textOZ = document.getElementById('ounces');
	textABV = document.getElementById('abv');
	resultSpan = document.getElementById('result');
	
	radioSimple.checked = true;
	radioAccurate.checked = false;
	textML.value = '0';
	textOZ.value = '0';
	textABV.value = '0';
	
	conversionValue = SIMPLE_CONVERSION_VALUE;
	
	modeSpan.addEventListener('click', handleModeSpanClick, false);
	whyBox.addEventListener('click', handleWhyBoxClick, false);
	radioSimple.addEventListener('click', handleRadio, false);
	radioAccurate.addEventListener('click', handleRadio, false);
	textML.addEventListener('keyup', handleKeyUp, false);
	textOZ.addEventListener('keyup', handleKeyUp, false);
	textABV.addEventListener('keyup', handleKeyUp, false);
	
	handleModeSpanClick(null);
	handleWhyBoxClick(null);
	updateResult();
	
	dOut('init complete, no errors');
}

function handleKeyUp(keyEvent) {
    dOut('keyup detected');
	
	var target = keyEvent.target;
	target.value = formatNumber(target.value);
	
	// if ML entered, modify OZ
	if(keyEvent.target == textML) {
		if(textML.value == '') {
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
			textML.value = 0;
		}
		else {
			var oz = parseFloat(textOZ.value);
			var ml = oz * conversionValue;
			textML.value = ml;
		}
	}
	
	updateResult();
}

function handleRadio(radioEvent) {
	dOut('radio event detected');
	
	if (radioEvent.target == radioSimple || radioEvent.target == radioAccurate) {
		dOut('accuracy mode switch detected');
	    radioSimple.checked = (radioEvent.target == radioSimple);
		radioAccurate.checked = (radioEvent.target == radioAccurate);
		if(radioSimple.checked) {
			conversionValue = SIMPLE_CONVERSION_VALUE;
		}
		else {
			conversionValue = ACCURATE_CONVERSION_VALUE;
		}
	}
	
	else {
		dOut('couldn\'t determine radio event target');
	}
	
	updateML();
	updateResult();
}

function handleWhyBoxClick(clickEvent) {
    var resultHTML = [];
	
	if(whyBoxOpen) {
		resultHTML.push('<span class="large-font">"Why?"</span><br>(click to find out)');
		whyBoxOpen = false;
	}
	else {
		resultHTML.push('<span class="large-font">"Why?"</span><br>(<strong>click again</strong> to close)');
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
	}
	
	whyBox.innerHTML = resultHTML.join('');
}

function handleModeSpanClick(clickEvent) {
    var resultHTML = [];
	
	if(modeSpanOpen) {
		resultHTML.push('Mode: <img id="modeHint" class="icon v-align-middle" src="q-mark.png"><br>');
		modeSpanOpen = false;
	}
	else {
		resultHTML.push('Mode: <img id="modeHint" class="icon v-align-middle" src="q-mark.png"> (click again to close)<br>');
		resultHTML.push(
			'<p>The true conversion ratio for milliliters to fluid ounces is approximately 29.5735:1.  I call ',
			'this the "Accurate" conversion, but since it tends to yield very ugly numbers I also included the ',
			'"Simple" option, which uses a conversion ration of 30:1, yielding much nicer numbers.  The "Simple" ',
			'option has an error of roughly 1.5%.</p>');
		modeSpanOpen = true;
	}
	
	modeSpan.innerHTML = resultHTML.join('');
}

function updateML() {
	if(textOZ.value == '') {
		textML.value = 0;
		textOZ.value = 0;
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
	resultHTML.push('<h3 class="slim">Results:</h3>');
	
	var ml = parseFloat(textML.value);
	var oz = parseFloat(textOZ.value);
	var abv = parseFloat(textABV.value);
	
	if(textML.value == '' || textOZ.value == '' || ml == 0 || oz == 0) {
		errFound = true;
		resultHTML.push('<p class="slim error">');
		resultHTML.push('<img class="icon v-align-middle" src="err-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">A valid volume is needed for me to generate a result!</span>');
		resultHTML.push('</p>');
	}
	else {
		resultHTML.push('<p class="slim pass">');
		resultHTML.push('<img class="icon v-align-middle" src="check-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push(radioSimple.checked ?
			ml + ' ml / ' + oz + ' oz' :
			'You entered a volume of ' + ml + ' milliliters (' + oz + ' fluid ounces)!');
		resultHTML.push('</span>');
		resultHTML.push('</p>');
	}
	
	if(textABV.value == '' || abv == 0) {
		errFound = true;
		resultHTML.push('<p class="slim error">');
		resultHTML.push('<img class="icon v-align-middle" src="err-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push('A valid ABV (percentage of alcohol by volume) is needed for me to generate a result!');
		resultHTML.push('</span>');
		resultHTML.push('</p>');
	}
	else {
		resultHTML.push('<p class="slim pass">');
		resultHTML.push('<img class="icon v-align-middle" src="check-mark.png"> ');
		resultHTML.push('<span class="v-align-middle">');
		resultHTML.push(radioSimple.checked ?
			'ABV ' + abv + '%' :
			'You entered an ABV (percentage of alcohol by volume) of ' + abv + '%!');
		resultHTML.push('</span>');
		resultHTML.push('</p>');
	}
	
	resultHTML.push(generateStats(errFound, genderDefined, oz, abv));
	
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
		'<table>',
			'<tr>',
				'<td>Total drinks:</td>',
				'<td>' + totalDrinks.toFixed(2) + '</td>',
			'</tr>',
			'<tr>',
				'<td>Okay for 1 sitting:</td>',
				'<td>' + (totalDrinks > 2 ? 'Sorry, FDA says no.' : (totalDrinks > 1 ? 'Okay, men! Sorry, ladies...' : 'Good to go!')) + '</td>',
			'</tr>',
			'<tr>',
				'<td>How soon can you drive:</td>',
				'<td>After more than ' + (totalDrinks * 2 / 3).toFixed(2) + ' hours</td>',
			'</tr>',
			'<tr><td colspan=2><strong>For quick reference:</strong></td></tr>',
			'<tr>',
				'<td>2oz of this drink would be:</td>',
				'<td>' + (ratioABV * (2 / baselineOZ)).toFixed(2) + ' drinks</td>',
			'</tr>',
			'<tr>',
				'<td>4oz of this drink would be:</td>',
				'<td>' + (ratioABV * (4 / baselineOZ)).toFixed(2) + ' drinks</td>',
			'</tr>',
			'<tr>',
				'<td>8oz of this drink would be:</td>',
				'<td>' + (ratioABV * (8 / baselineOZ)).toFixed(2) + ' drinks</td>',
			'</tr>',
			'<tr>',
				'<td>12oz of this drink would be:</td>',
				'<td>' + (ratioABV * (12 / baselineOZ)).toFixed(2) + ' drinks</td>',
			'</tr>',
			'<tr>',
				'<td>16oz of this drink would be:</td>',
				'<td>' + (ratioABV * (16 / baselineOZ)).toFixed(2) + ' drinks</td>',
			'</tr>',
			'<tr>',
				'<td>22oz of this drink would be:</td>',
				'<td>' + (ratioABV * (22 / baselineOZ)).toFixed(2) + ' drinks</td>',
			'</tr>',
			'<tr>',
				'<td>750ml of this drink would be:</td>',
				'<td>' + (ratioABV * (25.36 / baselineOZ)).toFixed(2) + ' drinks</td>',
			'</tr>',
		'</table>'
	);
	
	return outputHTML.join('');
}

function formatNumber(input) {
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
	  
function dOut(msg) {
    if(DEBUG) console.log(msg);
}

window.addEventListener('load', init, false);