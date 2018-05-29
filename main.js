// add
function add(num1, num2) {
	return precisionRound(num1 + num2, 3);
}
// subtract
function subtract(num1, num2) {
	return precisionRound(num1 - num2, 3);
}
// multiply
function multiply(num1, num2) {
	return precisionRound(num1 * num2, 3);
}
// divide
function divide(num1, num2) {
	return precisionRound(num1 / num2, 3);
}
// operate function
function operate(operation, num1, num2) {
	switch(true){
		case operation === '+':
			return add(num1, num2);
		case operation === '-':
			return subtract(num1, num2);
		case operation === '*':
			return multiply(num1, num2);
		case operation === '/':
			return divide(num1, num2);
	}
}
function precisionRound(number, precision) {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
function clickToDisplay(element){
	let value = this.dataset.key;
	display = display.concat(value);
	output.textContent = display;
}
function runOperation(){
	if(output.textContent === `Nice try.`){
		output.textContent = 0;
	}
	if(number1) solve(operation, number1, output.TextContent);
	operation = this.dataset.key;
	number1 = output.textContent;
	output.textContent = `${number1} ${operation}`;
	display = '';
}
function runOperationOnKeydown(key){
	if(output.textContent === `Nice try.`){
		output.textContent = 0;
	}
	if(number1) solve(operation, number1, output.TextContent);
	operation = key;
	number1 = output.textContent;
	output.textContent = `${number1} ${operation}`;
	display = '';
}
function checkDivideByZero(){
	if (number2 == 0 && operation == '/') {
		return true;
	}else false 
}
function solve(oper, num1, num2){
	if(operation === '') return;
	number2 = output.textContent;
	if(!Number(number2)) return;
	if(checkDivideByZero()) {
		output.textContent = `Nice try.`;
		number1 = 0;
		number2 = '';
		operation = '';
		display = '';
		return
	}
	output.textContent = operate(operation, Number(number1), Number(number2));
	display = '';
}
function clear(){
	number1 = 0;
	number2 = '';
	operation = '';
	output.textContent = 0;
	display = '';
}
function addPeriod() {
	let value = this.dataset.key
	if (display.search(value) == -1) {
		display = `${output.textContent}${value}`
		output.textContent = display;
	}
}
function addPeriodOnKeydown(key) {
	let value = key
	if (display.search(value) == -1) {
		display = `${output.textContent}${value}`
		output.textContent = display;
	}
}
function deleteLast(){
	string = output.textContent;
	string = string.slice(0, string.length - 1);
	output.textContent = string;
}
function keydownToDisplay(key){
	let value = key;
	display = display.concat(value);
	output.textContent = display;
}
let number1 = 0;
let number2 = '';
let operation = '';
let output = document.querySelector('.display .output');
let display = '';
numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => key.addEventListener('click', clickToDisplay));
operatorKeys = document.querySelectorAll('.operator');
operatorKeys.forEach(key => key.addEventListener('click', runOperation));
solveKey = document.querySelector('.solve');
solveKey.addEventListener('click', solve);
clearKey = document.querySelector('.clear')
clearKey.addEventListener('click', clear)
periodKey = document.querySelector('.period');
periodKey.addEventListener('click', addPeriod);
backspace = document.querySelector('.backspace');
backspace.addEventListener('click', deleteLast);


//keyboard support
window.addEventListener('keydown', element =>{
	//let key = document.querySelector(`div[data-key="${element.keyCode}"]`);
	if(element.key.search(/[0-9]/) > -1 ) keydownToDisplay(element.key);
	if(element.key.search(/[-=+/]/) > -1 ) runOperationOnKeydown(element.key);
	if(element.key.search(/[.]/) > -1 ) addPeriodOnKeydown(element.key);
	if(element.key.search("Enter") > -1 ) solve();
})
