document.addEventListener("DOMContentLoaded", function(){
	const resultEl = document.getElementById('result');
	const lengthEl = document.getElementById('length');
	const uppercaseEl = document.getElementById('uppercase');
	const lowercaseEl = document.getElementById('lowercase');
	const numbersEl = document.getElementById('numbers');
	const symbolsEl = document.getElementById('symbols');
	const generateEl = document.getElementById('generate');
	const clipboard = document.getElementById('clipboard');


	const randomFunc = {
		lower: getRandomLower,
		upper: getRandomUpper,
		number: getRandomNumber,
		symbol: getRandomSymbol
	}

	generateEl.addEventListener('click', () => {
		const length = lengthEl.value;
		const hasLower = lowercaseEl.checked;
		const hasUpper = uppercaseEl.checked;
		const hasNumber = numbersEl.checked;
		const hasSymbols = symbolsEl.checked;

		resultEl.innerText = generatePassword (
			hasUpper, hasLower, hasNumber, hasSymbols, length
		);
	});

	function generatePassword(upper, lower, number, symbol, length){

		let generatedPassword = '';

		const typesCount = upper + lower + number + symbol;

		//console.log('typescounts :',  typesCount);

		const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(
			item => Object.values(item)[0]
		);

		//console.log('types Arr: ', typesArr);

		if (typesCount === 0){
			return '';
		}

		for (let i = 0; i < length; i+= typesCount) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				//console.log('funcName:', funcName);
				
				generatedPassword += randomFunc[funcName]();

			});
		}

		const finalPassword = generatedPassword.slice(0, length);

		return finalPassword;

	}


	function getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	function getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}

	function getRandomNumber() {
		return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
	}

	function getRandomSymbol() {
		const symbols = '!@#$%^&*(){}[]=<>/,._-'
		return symbols[Math.floor(Math.random() * symbols.length)];
	}
});