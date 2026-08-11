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
	let negative = document.querySelector("[calc-role='negative']")
	let decimal = document.querySelector("[calc-role='decimal']")

	let firstInputAfterOperator = false
	let bufferHasDecimal = false

	let decimalSymbol = "."
	// if this going to change, have to make internal decimal convertor
	// JS only works with .


	testLog()


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

			// clear display after firts selected operator
			if (firstInputAfterOperator) {
				displayEl.innerHTML = ""
				firstInputAfterOperator = false
			}

			updateDisplay(e.getAttribute("calc-digit"))

			testLog()
		})
	})


	operators.forEach(e => {
		e.addEventListener('click', () => {

			firstInputAfterOperator = true

			updateOperands()

			// to fix bug where first time entered a is not trimed from zeros 
			displayEl.innerHTML = a

			// setting first time previous answer for display preview
			// if (prevAnswer === undefined) {
			// 	prevAnswer = a
			// }

			// fix bug with wrong display when a is empty in the start 
			if (a === undefined || a === "") {
				a = "0"
			}

			// it works 	ex. 2+2+2
			if (a && b && operator) {

				// debugger
				answer = operate(operator, a, b)

				// ????
				// this does not work yet because b can not be with decimal yet
				// turn 0. to 0 after pressing operator
				// if (answer[answer.length - 1] === decimalSymbol) {
				// 	alert("ho")
				// 	answer = answer.slice([answer.length])
				// 	bufferHasDecimal = false
				// }
				// ????

				a = answer
				displayEl.innerHTML = answer

				b = undefined
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


			if (buffer.includes(".")) {
				bufferHasDecimal = true
			} else bufferHasDecimal = false





			testLog()
		})
	})


	equal.addEventListener("click", () => {
		debugger

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

			// when pressing = in the start
			if (b === undefined) {
				displayPreviewEl.innerHTML = "0 ="
			}


			// use previous b
			if (a && prevB && operator) {

				answer = operate(operator, a, prevB)
				a = answer
				displayEl.innerHTML = answer

				// update preview (after equal)
				displayPreviewEl.innerHTML = prevAnswer + " " + operatorSymbol + " " + prevB + " ="
				// displayPreviewEl.innerHTML = answer + " " + operatorSymbol + " " + prevB + " ="

				prevAnswer = answer
			}

		} else {

			// default
			if (a && b && operator) {

				answer = operate(operator, a, b)
				a = answer
				displayEl.innerHTML = answer

				// update preview (after equal)
				displayPreviewEl.innerHTML = prevAnswer + " " + operatorSymbol + " " + b + " ="
				// displayPreviewEl.innerHTML = answer + " " + operatorSymbol + " " + b + " ="

				prevAnswer = answer

				prevB = b
				b = undefined
			}
		}

		// check if answer has decimal
		if (answer && answer.includes(".")) {
			bufferHasDecimal = true
		} else bufferHasDecimal = false

		testLog()
	})


	clear.addEventListener("click", () => {
		a = undefined
		b = undefined
		operator = undefined
		answer = undefined
		operatorSymbol = undefined
		buffer = ""
		prevB = undefined
		prevAnswer = undefined
		displayEl.innerHTML = "0"
		firstInputAfterOperator = false
		displayPreviewEl.innerHTML = ""
		bufferHasDecimal = false

		testLog()
	})


	negative.addEventListener("click", () => {

		displayEl.innerHTML = String(-displayEl.innerHTML)

		if (buffer !== "") {
			buffer = String(-buffer)
		}

		if (a !== undefined) {
			if (buffer == "") {
				a = String(-a)
			}
		}

		testLog()
	})


	decimal.addEventListener("click", () => {


		if (!bufferHasDecimal) {

			// prevents bug when starting from typing . without 0
			if (buffer === "") {
				buffer = 0
			}

			displayEl.innerHTML = displayEl.innerHTML + decimalSymbol
			buffer = buffer + decimalSymbol

			bufferHasDecimal = true


			// clear display after equal press .
			if (firstInputAfterOperator) {
				displayEl.innerHTML = "0."

				// update preview (after decimal button)
				displayPreviewEl.innerHTML = a + " " + operatorSymbol
			}

		}


		testLog()
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

			// trim extra zeroes
			a = buffer
			// a = String(Number(buffer))
			buffer = ""
		}
		else {
			a = buffer
			// b = String(Number(buffer))
			buffer = ""
		}
	}


	function testLog() {
		console.log("buffer: ", buffer);
		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operatorSymbol: ", operatorSymbol);
		// console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("prevAnswer: ", prevAnswer);
		console.log("prevB: ", prevB);
		console.log("bufferHasDecimal: ", bufferHasDecimal);
		console.log("firstInputAfterOperator: ", firstInputAfterOperator);
		console.log("displayEl.innerHTML: ", displayEl.innerHTML);
		console.log("--------------------------");
	}

})