"use strict"

document.addEventListener("DOMContentLoaded", (e) => {

	let a
	let b
	let operator
	let answer
	let buffer = ""
	let prevB
	let prevAnswer
	let operatorSymbol

	let displayEl = document.querySelector(".calc__display__content")
	let displayPreviewEl = document.querySelector(".calc__display__preview")

	let digits = document.querySelectorAll("[calc-digit]")
	let operators = document.querySelectorAll("[calc-operator]")
	let equal = document.querySelector("[calc-role='equal']")
	let clear = document.querySelector("[calc-role='clear']")

	let firstInputAfterOperator = false


	console.log("a: ", a);
	console.log("b: ", b);
	console.log("operator: ", operator);
	console.log("operatorSymbol: ", operatorSymbol);
	console.log("answer: ", answer);
	console.log("buffer: ", buffer);
	console.log("prevB: ", prevB);
	console.log("prevAnswer: ", prevAnswer);
	console.log("displayEl: ", displayEl);
	console.log("firstInputAfterOperator: ", firstInputAfterOperator);
	console.log("--------------------------");


	function add(a, b) {
		return a + b
	}
	function subtract(a, b) {
		return a - b
	}
	function multiply(a, b) {
		return a * b
	}
	function division(a, b) {
		return a / b
	}


	function operate(operator, a, b) {
		// debugger

		// convert a and b to numbers
		let aNumb = Number(a)
		let bNumb = Number(b)

		switch (operator) {
			case "add":
				return String(add(aNumb, bNumb))
				break;

			case "subtract":
				return String(subtract(aNumb, bNumb))
				break;

			case "multiply":
				return String(multiply(aNumb, bNumb))
				break;

			case "division":
				return String(division(aNumb, bNumb))
				break;

			default:
				break;
		}
	}


	digits.forEach(e => {
		e.addEventListener('click', () => {

			if (firstInputAfterOperator) {
				clearDisplay()
				firstInputAfterOperator = false
			}

			updateDisplay(e.getAttribute("calc-digit"))

			console.log("a: ", a);
			console.log("b: ", b);
			console.log("operator: ", operator);
			console.log("operatorSymbol: ", operatorSymbol);
			console.log("answer: ", answer);
			console.log("buffer: ", buffer);
			console.log("prevB: ", prevB);
			console.log("prevAnswer: ", prevAnswer);
			console.log("displayEl: ", displayEl);
			console.log("firstInputAfterOperator: ", firstInputAfterOperator);
			console.log("--------------------------");
		})
	})


	operators.forEach(e => {
		e.addEventListener('click', () => {

			firstInputAfterOperator = true

			updateOperands()

			// setting first time previous answer for display preview
			if (prevAnswer === undefined) {
				prevAnswer = a
			}

			// fix bug with wrong display when a is empty in the start 
			if (a === undefined || a === "") {
				a = "0"
			}

			if (a && b && operator) {

				answer = operate(operator, a, b)
				a = answer
				displayEl.innerHTML = answer

				b = undefined
				answer = undefined
			}


			switch (e.getAttribute("calc-operator")) {
				case "division": operator = "division", operatorSymbol = "÷"
					break
				case "multiply": operator = "multiply", operatorSymbol = "×"
					break
				case "subtract": operator = "subtract", operatorSymbol = "-"
					break
				case "add": operator = "add", operatorSymbol = "+"
					break
			}

			// clear prevB to solve bug when doing 1+2= + = (5 instead of 6)
			prevB = undefined

			// update preview (after operator)
			displayPreviewEl.innerHTML = a + " " + operatorSymbol


			console.log("a: ", a);
			console.log("b: ", b);
			console.log("operator: ", operator);
			console.log("operatorSymbol: ", operatorSymbol);
			console.log("answer: ", answer);
			console.log("buffer: ", buffer);
			console.log("prevB: ", prevB);
			console.log("prevAnswer: ", prevAnswer);
			console.log("displayEl: ", displayEl);
			console.log("firstInputAfterOperator: ", firstInputAfterOperator);
			console.log("--------------------------");
		})
	})

	equal.addEventListener("click", () => {

		firstInputAfterOperator = true

		updateOperands()

		// setting first time previous answer for display preview
		if (prevAnswer === undefined) {
			prevAnswer = a
		}

		// setting default previousB
		if (prevB === undefined) {
			prevB = a
		}

		// repeat last action if b is absent on pressing equal
		if (b === "" || b === undefined) {

			// use previous b
			if (a && prevB && operator) {

				answer = operate(operator, a, prevB)
				a = answer
				displayEl.innerHTML = answer

				// update preview (after equal)
				displayPreviewEl.innerHTML = prevAnswer + " " + operatorSymbol + " " + prevB + " ="

				prevAnswer = answer
				answer = undefined
			}

		} else {

			// default
			if (a && b && operator) {

				answer = operate(operator, a, b)
				a = answer
				displayEl.innerHTML = answer

				// update preview (after equal)
				displayPreviewEl.innerHTML = prevAnswer + " " + operatorSymbol + " " + b + " ="

				prevAnswer = answer
				answer = undefined

				prevB = b
				b = undefined
			}
		}


		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("operatorSymbol: ", operatorSymbol);
		console.log("answer: ", answer);
		console.log("buffer: ", buffer);
		console.log("prevB: ", prevB);
		console.log("prevAnswer: ", prevAnswer);
		console.log("displayEl: ", displayEl);
		console.log("firstInputAfterOperator: ", firstInputAfterOperator);
		console.log("--------------------------");
	})

	clear.addEventListener("click", () => {
		a = undefined
		b = undefined
		operator = undefined
		answer = undefined
		buffer = ""
		prevB = undefined
		prevAnswer = undefined
		displayEl.innerHTML = "0"
		firstInputAfterOperator = false
		displayPreviewEl.innerHTML = ""

		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("operatorSymbol: ", operatorSymbol);
		console.log("answer: ", answer);
		console.log("buffer: ", buffer);
		console.log("prevB: ", prevB);
		console.log("prevAnswer: ", prevAnswer);
		console.log("displayEl: ", displayEl);
		console.log("firstInputAfterOperator: ", firstInputAfterOperator);
		console.log("--------------------------");
	})

	function updateDisplay(digit) {

		// prevents displayEl showing 00000
		if (buffer == "0" && buffer.length == 1) {
			buffer = ""
			buffer = buffer + digit
			displayEl.innerHTML = buffer

		} else {
			buffer = buffer + digit
			displayEl.innerHTML = buffer
		}

	}

	function updateOperands() {
		if (a === "" || a === undefined) {
			a = buffer
			buffer = ""
		}
		else {
			b = buffer
			buffer = ""
		}
	}

	function clearDisplay() {
		displayEl.innerHTML = ""
	}

})