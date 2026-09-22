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

	let displayMaxDigit = 12
	// let decimalSymbol = "."
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
		return a / b
	}


	function operate(operator, a, b) {
		// debugger

		let operationResult

		a = Number(a)
		b = Number(b)


		if (!isNaN(a) && !isNaN(b)) {

			switch (operator) {
				case "add":
					operationResult = add(a, b)
					break;

				case "subtract":
					operationResult = subtract(a, b)
					break;

				case "multiply":
					operationResult = multiply(a, b)
					break;

				case "division":
					operationResult = division(a, b)
					if (a === 0 || b === 0) { alert("~~~YOU DESTROYED THE FABRIC OF SPACETIME~~~") }
					break;

				default:
					throw new Error("Operator is not selected")
					break;
			}
		} else throw new Error("One of the operands is not a number");



		// round long decimals
		// convert large numbers in scientific notation

		if (String(operationResult).length > displayMaxDigit) {
			if (operationResult > 999999999999 || operationResult < -999999999999) {
				operationResult = operationResult.toExponential(6)
			} else {

				let integerLength = String(parseInt(operationResult)).length

				// let symbolCount = 0
				// if (String(operationResult).includes(".")) { symbolCount++ }
				// if (String(operationResult).includes("-")) { symbolCount++ }
				// operationResult = operationResult.toFixed(displayMaxDigit - integerLength + symbolCount)

				if (displayMaxDigit >= integerLength) {
					operationResult = operationResult.toFixed(displayMaxDigit - integerLength)
				} else {
					operationResult = Math.round(operationResult)
				}

				// to convert 0.300000000000 to 0.3
				operationResult = Number(operationResult)

			}

		}

		return operationResult
	}


	digits.forEach(e => {
		e.addEventListener('click', () => {
			// debugger

			if (buffer === undefined) {
				buffer = ""
			}

			if (buffer.length >= displayMaxDigit) {
				return
			}

			let digit = e.getAttribute("calc-digit")


			if (lastButtonTypePressed === "operator") {
				displayEl.innerHTML = ""
				buffer = ""
			}

			if (lastButtonTypePressed === "equal") {
				displayPreviewEl.innerHTML = ""
				displayEl.innerHTML = ""
				buffer = ""
				a = undefined
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

			prevB = undefined

			if (buffer) {
				updateOperands()

				// for 1.0= 		(1)(preview 1=)
				displayEl.innerHTML = a
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


			// update preview (after operator)
			displayPreviewEl.innerHTML = a + " " + operatorSymbol


			lastButtonTypePressed = "operator"

			testLog()
		})
	})


	equal.addEventListener("click", () => {
		// debugger

		if (buffer) {
			// a + b

			updateOperands()

			// for 1.0= 		(1)(preview 1=)
			displayEl.innerHTML = a
			displayPreviewEl.innerHTML = a + " ="

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
			prevB = a

			answer = operate(operator, a, a)
			a = answer
			prevAnswer = answer

			displayEl.innerHTML = answer
			displayPreviewEl.innerHTML = prevA + " " + operatorSymbol + " " + prevB + " ="
		}


		lastButtonTypePressed = "equal"

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

		if (lastButtonTypePressed === "operator") {
			displayEl.innerHTML = ""
			buffer = ""
		}

		if (lastButtonTypePressed === "equal") {
			displayPreviewEl.innerHTML = ""
			displayEl.innerHTML = ""
			buffer = ""
			a = undefined
		}

		if (buffer === undefined || buffer === "") {
			buffer = "0."
			displayEl.innerHTML = buffer
		}

		if (!buffer.includes(".")) {
			buffer = buffer + "."
			displayEl.innerHTML = buffer
		}

		lastButtonTypePressed = "digit"

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
		lastButtonTypePressed = undefined
		previewIsNegated = undefined

		testLog()
	})





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
		console.log("displayPreviewEl.innerHTML: ", displayPreviewEl.innerHTML);
		console.log("displayEl.innerHTML: ", displayEl.innerHTML);
		console.log("lastButtonTypePressed: ", lastButtonTypePressed);
		console.log("--------------------------");
	}

})