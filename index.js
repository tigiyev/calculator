"use strict"

document.addEventListener("DOMContentLoaded", (e) => {

	let a
	let b
	let operator
	let answer
	let buffer = ""
	let prevB

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
	console.log("answer: ", answer);
	console.log("buffer: ", buffer);
	console.log("prevB: ", prevB);
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

		// make a and b numbers
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
			console.log("answer: ", answer);
			console.log("buffer: ", buffer);
			console.log("displayEl: ", displayEl);
			console.log("firstInputAfterOperator: ", firstInputAfterOperator);
			console.log("--------------------------");
		})
	})


	operators.forEach(e => {
		e.addEventListener('click', () => {

			firstInputAfterOperator = true

			updateOperands()

			// fix bug with wrong display when a is empty in the start 
			if (a === undefined || a === "") {
				a = "0"
			}

			if (a && b && operator) {

				answer = operate(operator, a, b)
				a = answer
				b = undefined
				answer = undefined

				displayEl.innerHTML = a
			}

			// update current operator
			// this block comes later than if statement for preventing bug when
			// changing operators makes wrong last calculations 
			switch (e.getAttribute("calc-operator")) {
				case "division": operator = "division"
					break
				case "multiply": operator = "multiply"
					break
				case "subtract": operator = "subtract"
					break
				case "add": operator = "add"
					break
			}

			console.log("a: ", a);
			console.log("b: ", b);
			console.log("operator: ", operator);
			console.log("answer: ", answer);
			console.log("buffer: ", buffer);
			console.log("displayEl: ", displayEl);
			console.log("firstInputAfterOperator: ", firstInputAfterOperator);
			console.log("--------------------------");

			updatePreview()

		})
	})

	equal.addEventListener("click", () => {

		firstInputAfterOperator = true

		updateOperands()

		// repeat last action on pressing equal
		if (b === "" || b === undefined) {

			// use previous b

			if (a && prevB && operator) {

				answer = operate(operator, a, prevB)
				a = answer
				displayEl.innerHTML = answer
				answer = undefined
			}

		} else {

			// use default
			if (a && b && operator) {



				answer = operate(operator, a, b)
				a = answer
				displayEl.innerHTML = answer
				updatePreview()
				// displayPreviewEl.innerHTML = displayPreviewEl.innerHTML + " " + b + " ="

				answer = undefined

				prevB = b
				b = undefined
			}
		}


		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("buffer: ", buffer);
		console.log("prevB: ", prevB);
		console.log("displayEl: ", displayEl);
		console.log("firstInputAfterOperator: ", firstInputAfterOperator);
		console.log("--------------------------");

		// updatePreview()
		// displayPreviewEl.innerHTML = displayPreviewEl.innerHTML + " " + prevB + " ="

	})

	clear.addEventListener("click", () => {
		a = undefined
		b = undefined
		operator = undefined
		answer = undefined
		buffer = ""
		prevB = undefined
		displayEl.innerHTML = "0"
		firstInputAfterOperator = false
		displayPreviewEl.innerHTML = ""

		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("buffer: ", buffer);
		console.log("prevB: ", prevB);
		console.log("displayEl: ", displayEl);
		console.log("firstInputAfterOperator: ", firstInputAfterOperator);
		console.log("--------------------------");
	})

	function updateDisplay(digit) {

		// v1
		// buffer = buffer + digit
		// displayEl.innerHTML = buffer


		// v2
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
		// debugger
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


	// v2
	function updatePreview() {
		let str = ""

		if (a) {
			str = str + a.toString()
		}
		if (operator) {
			switch (operator) {
				case "add": str += " +"
					break;
				case "subtract": str += " -"
					break;
				case "multiply": str += " ×"
					break;
				case "division": str += " ÷"
					break;
			}
		}
		// if (b) {
		// 	str = str + b.toString()
		// }
		// if (buffer) {
		// 	str = str + buffer.toString()
		// }

		displayPreviewEl.innerHTML = str
	}





})
