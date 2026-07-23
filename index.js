"use strict"

document.addEventListener("DOMContentLoaded", (e) => {
	// console.log("loaded");
	// debugger

	let a
	let b
	let operator

	let display = []
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

	// console.log(subtract(4, 2));


	function operate(a, b, operator) {
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


	// create event listener for each button
	// update variables a, b, operator depending 
	// on what button is pressed

	let numbers = document.querySelectorAll("[calc-number]")
	let operators = document.querySelectorAll("[calc-operator]")
	let equal = document.querySelector("[calc-equal]")
	let clear = document.querySelector("[calc-role='clear']")


	numbers.forEach(e => {
		// console.log(e);
		e.addEventListener('click', () => {
			updateDisplay(e.getAttribute("calc-number"))
		})
	})

	function updateDisplay(number) {
		// push number pressed in array
		// join array and update display
		display.push(number)
		displayEl.innerHTML = display.join("")

		// place a, b and operator in preview


		// add tousand separator later
	}

	function updatePreview() {

		// place a, b and operator in preview
		let ar = []
		if (a) {
			ar.push(a.toString())
		}
		if (operator) {
			switch (operator) {
				case "add": ar.push("+")
					break;
				case "subtract": ar.push("-")
					break;
				case "multiply": ar.push("×")
					break;
				case "division": ar.push("÷")
					break;
			}
		}
		if (b) {
			ar.push(b.toString())
		}
		displayPreviewEl.innerHTML = ar.join(" ")

	}


	operators.forEach(e => {
		e.addEventListener('click', () => {

			updateOperands()

			// clear display and display array
			displayEl.innerHTML = ""
			display = []


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

			updatePreview()

		})
	})

	function updateOperands() {
		// update a
		if (a === "" || a === undefined) {
			a = displayEl.innerHTML

			console.log("a: ", a);
		}
		// update b
		else {
			b = displayEl.innerHTML

			console.log("b: ", b);
		}
	}


	equal.addEventListener("click", () => {

		updateOperands()

		console.log("a: ", a);
		console.log("b: ", b);
		console.log("operator: ", operator);


		let answer = operate(a, b, operator)
		console.log(answer);

		// update display and display array
		displayEl.innerHTML = answer

		display = answer.toString().split("")
		console.log(display);




		// clear a, b
		a = undefined, b = undefined
	})


	clear.addEventListener("click", () => {
		a = undefined
		b = undefined
		displayEl.innerHTML = ""
		display = []
		displayPreviewEl.innerHTML = ""
	})

})