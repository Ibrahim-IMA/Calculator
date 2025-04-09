// Light/Dark theme
const toggleElement = document.querySelector(".themes__toggle");
const toggleDarkTheme = () => {
  toggleElement.classList.toggle("themes__toggle--isActive");
};
const darkThemByKeyboard = (event) =>
  event.key === "Enter" && toggleDarkTheme();
toggleElement.addEventListener("click", toggleDarkTheme);
toggleElement.addEventListener("keydown", darkThemByKeyboard);

// Logic for Calculator
let storedNumber = "";
let currentNumber = "";
let operation = "";

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  operation = "";
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;
  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateScreen(currentNumber);
};

const operationButtonHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) executeOperation();
  }
};

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};

const keyElementHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    if (type === "number") {
      numberButtonHandler(element.dataset.value);
    } else if (type === "operation") {
      switch (element.dataset.value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(element.dataset.value);
      }
    }
  });
};

keyElements.forEach(keyElementHandler);

// Keyboard logic
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["*", "/", "-", "+"];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  "Enter",
  "Backspace",
  "c",
];

const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const element = document.querySelector(`[data-value="${key}"]`);

    element.classList.add("hover");
    element.click();
    setTimeout(() => element.classList.remove("hover"), 100);
  }
};

window.addEventListener("keydown", (event) => {
  keyboardWithHover(event.key);
});
