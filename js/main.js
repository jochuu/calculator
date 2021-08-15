let resetScreen = false;

let operators = {
  add: (a, b) => parseInt(a) + parseInt(b), // need parseInt because it was doing string concat.
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

let calculator = {
  operate: (a, b, operator) => operators[operator](a, b),
  addToStoredValue: (operator) => {
    let storedValue = document.querySelector("#storedValue");
    if (storedValue) {
      document.querySelector("#storedValue").textContent = "";
      //   calculator.calculate();
    }

    storedValue.textContent +=
      document.querySelector(".calculator-display").textContent + operator;
    display.update(operator);
    setTimeout(function () {
      display.update("");
    }, 200);
  },
  convertOperator: (operator) => {
    if (operator === "+") return "add";
    if (operator === "-") return "subtract";
    if (operator === "*") return "multiply";
    if (operator === "/") return "divide";
  },
  calculate: () => {
    let storedValue = document.querySelector("#storedValue").textContent;
    let firstValue = storedValue.slice(0, -1);
    let secondValue = document.querySelector(".calculator-display").textContent;
    let operator = calculator.convertOperator(
      storedValue.charAt(storedValue.length - 1)
    );
    console.log(
      `SV: ${storedValue}, FV:${firstValue}, SV:${secondValue}, OP:${operator}`
    );
    let calculatorDisplay = document.querySelector(".calculator-display");
    if (operator === "divide" && secondValue === "0") {
      calculatorDisplay.textContent = "lol u tried";
    } else {
      calculatorDisplay.textContent = calculator.operate(
        firstValue,
        secondValue,
        operator
      );
    }
    resetScreen = true;
  },
  setupEventListeners: () => {
    let calculatorDisplay = document.querySelector(
      ".calculator-display"
    ).textContent;

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
    document.querySelector("#clear").onclick = () => display.update("");

    document.querySelector("#equals").onclick = () => calculator.calculate();
    document.querySelector("#divide").onclick = () =>
      calculator.addToStoredValue("/");
    document.querySelector("#multiply").onclick = () =>
      calculator.addToStoredValue("*");
    document.querySelector("#add").onclick = () =>
      calculator.addToStoredValue("+");
    document.querySelector("#subtract").onclick = () =>
      calculator.addToStoredValue("-");
  },
};

let display = {
  update: (value) => {
    if (resetScreen)
      document.querySelector(".calculator-display").textContent = "";
    resetScreen = false;
    typeof (value === "number")
      ? (document.querySelector(".calculator-display").textContent += value)
      : (document.querySelector(".calculator-display").textContent = value);
  },
};

calculator.setupEventListeners();
