let operators = {
  add: (a, b) => parseInt(a) + parseInt(b), // need parseInt because it was doing string concat.
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

let calculator = {
  storedValue: document.querySelector("#storedValue"),
  operate: (a, b, operator) => operators[operator](a, b),
  addToStoredValue: (operator) => {
    if (calculator.storedValue) {
      calculator.storedValue.textContent = "";
    }
    calculator.storedValue.textContent +=
      display.calculatorDisplay.textContent + operator;
    display.update(operator);
    display.update("");
  },
  convertOperator: (operator) => {
    if (operator === "+") return "add";
    if (operator === "-") return "subtract";
    if (operator === "*") return "multiply";
    if (operator === "/") return "divide";
  },
  calculate: () => {
    let storedValue = calculator.storedValue.textContent;
    let firstValue = storedValue.slice(0, -1);
    let secondValue = display.calculatorDisplay.textContent;
    let operator = calculator.convertOperator(
      storedValue.charAt(storedValue.length - 1)
    );

    if (operator === undefined) return;

    if (operator === "divide" && secondValue === "0") {
      display.calculatorDisplay.textContent = "lol u tried";
    } else {
      display.calculatorDisplay.textContent = calculator.operate(
        firstValue,
        secondValue,
        operator
      );
    }
    display.resetScreen = true;
  },
  start: () => {
    document.querySelector("#one").onclick = () => display.update(1);
    document.querySelector("#two").onclick = () => display.update(2);
    document.querySelector("#three").onclick = () => display.update(3);
    document.querySelector("#four").onclick = () => display.update(4);
    document.querySelector("#five").onclick = () => display.update(5);
    document.querySelector("#six").onclick = () => display.update(6);
    document.querySelector("#seven").onclick = () => display.update(7);
    document.querySelector("#eight").onclick = () => display.update(8);
    document.querySelector("#nine").onclick = () => display.update(9);
    document.querySelector("#zero").onclick = () => display.update(0);
    document.querySelector("#clear").onclick = () => {
      display.update("");
      document.querySelector("#storedValue").textContent = "";
    };
    document.querySelector("#decimal").onclick = () =>
      display.addDecimalPoint();
    document.querySelector("#backspace").onclick = () => display.backspace();

    document.querySelector("#equals").onclick = () => calculator.calculate();
    document.querySelector("#divide").onclick = () => {
      calculator.addToStoredValue("/");
    };
    document.querySelector("#multiply").onclick = () =>
      calculator.addToStoredValue("*");
    document.querySelector("#add").onclick = () =>
      calculator.addToStoredValue("+");
    document.querySelector("#subtract").onclick = () =>
      calculator.addToStoredValue("-");
    window.onkeydown = (e) => display.handleKeyboardInput(e);
  },
};

let display = {
  calculatorDisplay: document.querySelector(".calculator-display"),
  resetScreen: false,
  update: (value) => {
    if (display.resetScreen) {
      display.calculatorDisplay.textContent = "";
    }
    typeof value === "number"
      ? (display.calculatorDisplay.textContent += value)
      : (display.calculatorDisplay.textContent = value);

    display.resetScreen = false;
  },
  addDecimalPoint: () => {
    if (display.resetScreen) display.calculatorDisplay.textContent = "";

    if (display.calculatorDisplay.textContent === "")
      display.calculatorDisplay.textContent = "0";

    if (display.calculatorDisplay.textContent.includes(".")) return false;

    display.calculatorDisplay.textContent += ".";
  },
  handleKeyboardInput: (e) => {
    if (e.key >= 0 && e.key <= 9) display.update(parseInt(e.key));
    if (e.key === ".") display.addDecimalPoint();
    if (e.key === "=" || e.key === "Enter") calculator.calculate();
    if (e.key === "Backspace") display.backspace();
    if (e.key === "Escape") display.update("");
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
      calculator.addToStoredValue(e.key);
  },
  backspace: () => {
    display.calculatorDisplay.textContent =
      display.calculatorDisplay.textContent.slice(0, -1);
  },
};

calculator.start();
