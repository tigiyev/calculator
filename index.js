"use strict"

document.addEventListener("DOMContentLoaded", (e) => {

	let a
	let b
	let operator
	let answer

	let displayAr = []
	let displayStr = ''
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


	let displayIsClear = false

	numbers.forEach(e => {
		e.addEventListener('click', () => {

			if (operator && !displayIsClear) {
				clearDisplay()
				displayIsClear = true
			}

			// displayIsClear = false

			updateDisplay(e.getAttribute("calc-digit"))

			console.log("a: ", a);
			console.log("b: ", b);
			console.log("operator: ", operator);
			console.log("answer: ", answer);
			console.log("displayAr: ", displayAr);
			console.log("displayStr: ", displayStr);
			console.log("displayIsClear: ", displayIsClear);
		})
	})

	function updateDisplay(number) {
		// push number pressed in array
		// join array and update display
		displayAr.push(number)
		displayStr = displayAr.join("")
		displayEl.innerHTML = displayStr

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


	operators.forEach(e => {
		e.addEventListener('click', () => {

			displayIsClear = false
			updateOperands()


			// clearDisplay()





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

			console.log("a: ", a);
			console.log("b: ", b);
			console.log("operator: ", operator);
			console.log("answer: ", answer);
			console.log("displayAr: ", displayAr);
			console.log("displayStr: ", displayStr);
			console.log("displayIsClear: ", displayIsClear);
			// updatePreview()

		})
	})

	function updateOperands() {
		if (a === "" || a === undefined) {
			// a = displayEl.innerHTML
			a = displayStr
			// console.log("a: ", a);
		}
		else {
			b = displayStr
			// console.log("b: ", b);
		}
	}

	function clearDisplay() {
		displayEl.innerHTML = ""
		displayAr = []
		displayStr = ''
		displayIsClear = true
	}


	equal.addEventListener("click", () => {

		// displayIsClear = false

		updateOperands()

		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);
		console.log("answer: ", answer);
		console.log("displayAr: ", displayAr);
		console.log("displayStr: ", displayStr);
		console.log("displayIsClear: ", displayIsClear);


		answer = operate(operator, a, b)
		console.log(answer);

		if (answer) {
			// update display and display array
			displayEl.innerHTML = answer

			displayAr = answer.toString().split("")
			console.log(displayAr);
		}


		// clear a, b , answer stays as a
		a = answer
		b = undefined
		answer = undefined
		// displayIsClear = false

		// clear display
		// displayEl.innerHTML = ""
		// display = []

		// clearDisplay()

		// add = in preview display
		// updatePreview()
	})


	clear.addEventListener("click", () => {
		a = undefined
		b = undefined
		displayAr = []
		displayStr = ''
		displayEl.innerHTML = ""
		displayIsClear = false
		// displayPreviewEl.innerHTML = ""
	})

})

// how to clear display after first digit