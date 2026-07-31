"use strict"

document.addEventListener("DOMContentLoaded", (e) => {

	let a
	let b
	let operator
	let answer

	let displayAr = ['0']
	let displayStr = '0'
	let displayEl = document.querySelector(".calc__display__content")
	let displayPreviewEl = document.querySelector(".calc__display__preview")


	function add(a, b) {
		return a + b
	}
	function subtract(a, b) {
		// debugger
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
				return add(aNumb, bNumb)
				break;

			case "subtract":
				return subtract(aNumb, bNumb)
				break;

			case "multiply":
				return multiply(aNumb, bNumb)
				break;

			case "division":
				return division(aNumb, bNumb)
				break;

			default:
				break;
		}

	}


	let numbers = document.querySelectorAll("[calc-digit]")
	let operators = document.querySelectorAll("[calc-operator]")
	let equal = document.querySelector("[calc-role='equal']")
	let clear = document.querySelector("[calc-role='clear']")



	let firstInputAfterOperator = false

	numbers.forEach(e => {
		e.addEventListener('click', () => {

			if (firstInputAfterOperator) {
				clearDisplay()
				firstInputAfterOperator = false
			}

			updateDisplay(e.getAttribute("calc-digit"))
			// updateOperands()

			console.log("a: ", a);
			console.log("b: ", b);
			console.log("operator: ", operator);
			console.log("answer: ", answer);
			console.log("displayAr: ", displayAr);
			console.log("displayStr: ", displayStr);
			console.log("firstInputAfterOperator: ", firstInputAfterOperator);
			console.log("--------------------------");


		})
	})

	operators.forEach(e => {
		e.addEventListener('click', () => {

			firstInputAfterOperator = true

			updateOperands()

			// update operator
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

			if (a && b && operator) {
				// debugger
				answer = operate(operator, a, b)
				a = answer
				b = undefined
				answer = undefined

				displayEl.innerHTML = a
				displayAr = a.toString().split("")
			}

			console.log("a: ", a);
			console.log("b: ", b);
			console.log("operator: ", operator);
			console.log("answer: ", answer);
			console.log("displayAr: ", displayAr);
			console.log("displayStr: ", displayStr);
			console.log("firstInputAfterOperator: ", firstInputAfterOperator);
			console.log("--------------------------");

			// updatePreview()

		})
	})

	equal.addEventListener("click", () => {

		firstInputAfterOperator = true

		updateOperands()

		answer = operate(operator, a, b)
		// debugger

		// if (answer) {
		// update display and display array
		displayEl.innerHTML = answer
		displayAr = answer.toString().split("")
		// }

		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("displayAr: ", displayAr);
		console.log("displayStr: ", displayStr);
		console.log("--------------------------");


		// clear a, b , answer stays as a
		a = answer
		b = undefined
		// operator = undefined
		answer = undefined

		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("--------------------------");

		// updatePreview()
	})

	clear.addEventListener("click", () => {
		a = undefined
		b = undefined
		operator = undefined
		answer = undefined
		displayAr = ['0']
		displayStr = '0'
		displayEl.innerHTML = ""
		firstInputAfterOperator = false

		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("displayAr: ", displayAr);
		console.log("displayStr: ", displayStr);
		console.log("firstInputAfterOperator: ", firstInputAfterOperator);
		console.log("--------------------------");
	})

	function updateDisplay(number) {

		// console.log("number: ", number);

		// prevents display showing 00000
		// delete default 0 if next number is else than 0 
		// if answer is 0 show it in display
		if (displayAr[0] == "0" && displayAr.length == 1 && number == "0") {
			return
		} else if (displayAr[0] == "0" && displayAr.length == 1) {
			displayAr = []

			displayAr.push(number)
			displayStr = displayAr.join("")
			displayEl.innerHTML = displayStr
		} else {
			displayAr.push(number)
			displayStr = displayAr.join("")
			displayEl.innerHTML = displayStr
		}


		// place a, b and operator in preview


		// add tousand separator later
	}

	// function updatePreview() {

	// 	// place a, b and operator in preview
	// 	let ar = []
	// 	if (a) {
	// 		ar.push(a.toString())
	// 	}
	// 	if (operator) {
	// 		switch (operator) {
	// 			case "add": ar.push("+")
	// 				break;
	// 			case "subtract": ar.push("-")
	// 				break;
	// 			case "multiply": ar.push("×")
	// 				break;
	// 			case "division": ar.push("÷")
	// 				break;
	// 		}
	// 	}
	// 	if (b) {
	// 		ar.push(b.toString())
	// 	}
	// 	displayPreviewEl.innerHTML = ar.join(" ")

	// }




	function updateOperands() {
		if (a === "" || a === undefined) {
			a = displayStr
		}
		else {
			b = displayStr
		}
	}

	function clearDisplay() {
		displayEl.innerHTML = ""
		displayAr = []
		displayStr = ''
	}






})



// clear display by first gigit input after operator