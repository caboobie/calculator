const display = document.getElementById(`display`);
const numberButtons = document.querySelectorAll(`.number`);
const operatorButtons = document.querySelectorAll(`.operator`);
const equalsButton = document.querySelector(`.equals`);
const clearButton = document.querySelector(`.clear`);
const decimalButton = document.querySelector(`.decimal`);

let currentValue = `0`;
let previousValue = null;
let operator = null;

numberButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        if (currentValue === `0`) {
            currentValue = button.textContent;
        } else {
            currentValue += button.textContent;
        }
        display.value = currentValue;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        operator = button.dataset.op;
        previousValue = currentValue;
        currentValue = `0`;
    });
});

equalsButton.addEventListener(`click`, () => {
    if (operator === null) return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result;

    if (operator === `+`) result = prev + curr;
    else if (operator === `-`) result = prev - curr;
    else if (operator === `*`) result = prev * curr;
    else if (operator === `/`) result = prev / curr;

    currentValue = result.toString();
    display.value = currentValue;
    operator = null;
    previousValue = null;
});

clearButton.addEventListener(`click`, () => {
    currentValue = `0`;
    previousValue = null;
    operator = null;
    display.value = currentValue;
});



decimalButton.addEventListener(`click`, () => {
    if (currentValue.includes(`.`)) return;
    currentValue += `.`;
    display.value = currentValue;
});

