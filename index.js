"use strict"

document.addEventListener("DOMContentLoaded", (e) => {

	let a
	let b
	let operator
	let operatorSymbol
	let answer
	let buffer
	let prevA
	let prevB
	let prevAnswer
	let lastButtonTypePressed
	let previewIsNegated

	let bufferHasDecimal = undefined
	let decimalSymbol = "."
	// if this going to change, have to make internal decimal convertor
	// JS only works with .

	let displayEl = document.querySelector(".calc__display__content")
	let displayPreviewEl = document.querySelector(".calc__display__preview")

	let digits = document.querySelectorAll("[calc-digit]")
	let operators = document.querySelectorAll("[calc-operator]")
	let equal = document.querySelector("[calc-role='equal']")
	let clear = document.querySelector("[calc-role='clear']")
	let negative = document.querySelector("[calc-role='negative']")
	let decimal = document.querySelector("[calc-role='decimal']")




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

		console.log(String(a / b).length);

		return a / b
	}


	function operate(operator, a, b) {
		// debugger
		// b = "12"
		// b = NaN
		// operator = "asdasd"


		if (typeof a === "number" && typeof b === "number") {

			switch (operator) {
				case "add":
					return add(a, b)
					break;

				case "subtract":
					return subtract(a, b)
					break;

				case "multiply":
					return multiply(a, b)
					break;

				case "division":
					return division(a, b)
					break;

				default:
					throw new Error("operator not selected")
					break;
			}
		} else throw new Error("a or b is not a number");
	}


	digits.forEach(e => {
		e.addEventListener('click', () => {

			let digit = e.getAttribute("calc-digit")

			if (buffer === undefined) {
				buffer = ""
			}


			// clear display after firts selected operator
			// if (firstInputAfterOperator) {
			// 	displayEl.innerHTML = ""
			// 	buffer = ""
			// 	firstInputAfterOperator = false
			// }

			if (lastButtonTypePressed === "operator") {
				displayEl.innerHTML = ""
				buffer = ""
				// firstInputAfterOperator = false
			}

			// prevents displayEl showing 00000
			if (buffer == "0" && buffer.length == 1) {
				buffer = ""
				buffer = buffer + digit
				displayEl.innerHTML = buffer

			} else {
				buffer = buffer + digit
				displayEl.innerHTML = buffer
			}

			lastButtonTypePressed = "digit"

			testLog()
		})
	})


	operators.forEach(e => {
		e.addEventListener('click', () => {
			// debugger

			if (buffer) {
				updateOperands()
			}


			if (!isNaN(a) && !isNaN(b) && operator) {

				// debugger
				prevA = a

				answer = operate(operator, a, b)
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

			// fix bug with wrong display when a is empty in the start 
			// * (preview 0 *)
			if (a === undefined) {
				a = 0
			}


			// clear prevB to solve bug when doing 1+2= + = (5 instead of 6)
			// prevB = undefined

			// update preview (after operator)
			displayPreviewEl.innerHTML = a + " " + operatorSymbol


			// if (buffer.includes(".")) {
			// 	bufferHasDecimal = true
			// } else if (!(buffer.includes("."))) {
			// 	bufferHasDecimal = false
			// } else bufferHasDecimal = undefined

			lastButtonTypePressed = "operator"

			testLog()
		})
	})


	equal.addEventListener("click", () => {
		// debugger
		// console.log("equal is pressed");

		if (buffer) {
			// a + b

			updateOperands()

			if (!isNaN(a) && !isNaN(b) && operator) {

				prevA = a
				prevB = b

				answer = operate(operator, a, b)
				a = answer
				prevAnswer = answer

				displayEl.innerHTML = answer
				displayPreviewEl.innerHTML = prevA + " " + operatorSymbol + " " + b + " ="

				b = undefined
			}

		} else if (!isNaN(a) && b === undefined && operator && !isNaN(prevB)) {
			// a + b? => prevB
			// ex. 5-===
			// debugger

			prevA = a
			// prevB = b

			answer = operate(operator, a, prevB)
			a = answer
			prevAnswer = answer

			displayEl.innerHTML = answer
			displayPreviewEl.innerHTML = prevA + " " + operatorSymbol + " " + prevB + " ="

			// b = undefined

		} else if (!isNaN(a) && b === undefined && operator && prevB === undefined) {
			// a + b? and prevB? (start of the cicle when prevB not defined)
			// ex. 5-=
			// debugger

			prevA = a
			// prevB = a

			answer = operate(operator, a, a)
			a = answer
			prevAnswer = answer

			displayEl.innerHTML = answer
			displayPreviewEl.innerHTML = prevA + " " + operatorSymbol + " " + a + " ="
		}




		// check if answer has decimal
		if (answer && answer % 1 !== 0) {
			bufferHasDecimal = true
		} else if (answer && answer % 1 == 0) {
			bufferHasDecimal = false
		}
		else bufferHasDecimal = undefined


		lastButtonTypePressed = "equal"

		console.log("equal func ended");
		testLog()
	})


	negative.addEventListener("click", () => {


		if (buffer !== undefined) {

			if (buffer[0] !== "-") {
				buffer = "-" + buffer
				displayEl.innerHTML = "-" + displayEl.innerHTML

			} else if (buffer[0] === "-") {
				buffer = buffer.slice(1)
				displayEl.innerHTML = displayEl.innerHTML.slice(1)
			}

		} else if (buffer === undefined && !isNaN(a)) {
			a = -a
			// prevA = - prevA
			if (displayEl.innerHTML[0] !== "-") {
				displayEl.innerHTML = "-" + displayEl.innerHTML
			} else {
				displayEl.innerHTML = displayEl.innerHTML.slice(1)
			}
		}


		// display preview negation
		if (lastButtonTypePressed === "equal") {

			if (!previewIsNegated) {
				displayPreviewEl.innerHTML = `negate(${answer})`
				previewIsNegated = true
			} else {
				displayPreviewEl.innerHTML = answer
				previewIsNegated = false
			}

		}


		// lastButtonTypePressed = "neg"

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
			if (lastButtonTypePressed === "equal") {
				displayEl.innerHTML = "0."

				// update preview (after decimal button)
				displayPreviewEl.innerHTML = a + " " + operatorSymbol
			}

		}


		testLog()
	})





	clear.addEventListener("click", () => {
		a = undefined
		b = undefined
		operator = undefined
		operatorSymbol = undefined
		answer = undefined
		buffer = undefined
		prevA = undefined
		prevB = undefined
		prevAnswer = undefined
		displayEl.innerHTML = "0"
		displayPreviewEl.innerHTML = ""
		bufferHasDecimal = undefined
		lastButtonTypePressed = undefined
		previewIsNegated = undefined

		testLog()
	})


	function updateOperands() {

		if (a === undefined) {
			a = Number(buffer)
			buffer = undefined
		} else {
			b = Number(buffer)
			buffer = undefined
		}

	}


	function testLog() {
		console.log("buffer: ", buffer);
		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operatorSymbol: ", operatorSymbol);
		console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("prevAnswer: ", prevAnswer);
		console.log("prevA: ", prevA);
		console.log("prevB: ", prevB);
		console.log("bufferHasDecimal: ", bufferHasDecimal);
		console.log("displayPreviewEl.innerHTML: ", displayPreviewEl.innerHTML);
		console.log("displayEl.innerHTML: ", displayEl.innerHTML);
		console.log("lastButtonTypePressed: ", lastButtonTypePressed);
		// console.log("lastPreview: ", lastPreview);
		console.log("--------------------------");
	}

})