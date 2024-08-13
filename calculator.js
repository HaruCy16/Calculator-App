const displayInput = document.querySelector(".display-input");
const calculationHistory = document.querySelector(".calculation-history");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.id);
  });
});

// Handle button clicks
function handleButtonClick(buttonId) {
  const displayValue = displayInput.value;

  switch (buttonId) {
    case "clearBtn":
      clearDisplay();
      break;
    case "removeBtn":
      removeLastCharacter();
      break;
    case "equalsBtn":
      calculateResult();
      break;
    case "clearHistoryBtn":
      clearHistory();
    default:
      updateDisplay(buttonId);
      break;
  }
}

// Clear Display
function clearDisplay() {
  displayInput.value = "";
}

//Remove last char on display
function removeLastCharacter() {
  displayInput.value = displayInput.value.slice(0, -1);
}

// Calculate result and update history
function calculateResult() {
  try {
    const calculation = displayInput.value
      .replace(/÷/g, "/")
      .replace(/×/g, "*");
    const result = eval(calculation);
    displayInput.value = result;
    updateCalculationHistory(calculation, result);
  } catch (error) {
    displayInput.value = "Error";
  }
}
// Update the display with button input
function updateDisplay(buttonId) {
  let buttonText = document.getElementById(buttonId).textContent;

  if (buttonId === "divideBtn") {
    buttonText = "/";
  } else if (buttonId === "multiplyBtn") {
    buttonText = "*";
  } else if (buttonId === "subtractBtn") {
    buttonText = "-";
  } else if (buttonId === "addBtn") {
    buttonText = "+";
  } else if (buttonId === "percentageBtn") {
    buttonText = "%";
  }

  if (
    buttonId.includes("num") ||
    buttonId === "zeroBtn" ||
    buttonId === "decimalBtn"
  ) {
    displayInput.value += buttonText;
  } else {
    displayInput.value += ` ${buttonText} `;
  }
}
// Calculation history
function updateCalculationHistory(calculation, result) {
  const historyItem = document.createElement("p");
  historyItem.textContent = `${calculation} = ${result}`;
  calculationHistory.appendChild(historyItem);
}
function clearHistory() {
  displayInput.value = "";
  calculationHistory.innerHTML = "";
  alert("Click C (Clear) Button to continue calculating!");
}
