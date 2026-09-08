const display = document.getElementById(`display`);
const numberButtons = document.querySelectorAll(`.number`);
const operatorButtons = document.querySelectorAll(`.operator`);
const equalsButton = document.querySelector(`.equals`);
const clearButton = document.querySelector(`.clear`);
const decimalButton = document.querySelector(`.decimal`);

let currentValue = `0`;
let previousValue = null;
let operator = null;
let justCalculated = false;

numberButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        if (currentValue === `0` || currentValue === `Error: Division by zero` || justCalculated) {
            currentValue = button.textContent;
            justCalculated = false;
        } else {
            currentValue += button.textContent;
        }
        display.value = currentValue;
    });
});

function calculate() {
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result;

    if (operator === `+`) result = prev + curr;
    else if (operator === `-`) result = prev - curr;
    else if (operator === `*`) result = prev * curr;
    else if (operator === `/`) {
        if (curr === 0) {
            return `Error: Division by zero`;
        }
        result = prev / curr;
    }

    return result;
}

operatorButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        if (currentValue === `Error: Division by zero`) {
            currentValue = `0`;
            previousValue = null;
            operator = null;
            return;
        }

        if (operator !==null) {
            currentValue = calculate().toString();
            display.value = currentValue;
        }
        operator = button.dataset.op;
        previousValue = currentValue;
        currentValue = `0`;
    });
});

equalsButton.addEventListener(`click`, () => {
    if (operator === null) return;

    currentValue = calculate().toString();
    display.value = currentValue;
    operator = null;
    previousValue = null;
    justCalculated = true;
});

clearButton.addEventListener(`click`, () => {
    currentValue = `0`;
    previousValue = null;
    operator = null;
    display.value = currentValue;
});



decimalButton.addEventListener(`click`, () => {
    if (currentValue.includes(`.`) && !justCalculated) return;
    if (justCalculated) {
        currentValue = '0';
        justCalculated = false;
    }
    currentValue += `.`;
    display.value = currentValue;
});

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        const button = [...numberButtons].find(b => b.textContent ===key);
        button.click();
    }
    else if (key === '.') {
        decimalButton.click();
    }
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        const button = [...operatorButtons].find(b => b.dataset.op === key);
        button.click();        
    }
    else if (key === 'Enter' || key === '=') {
        equalsButton.click();
    }
    else if (key === 'Escape') {
        clearButton.click();
    }
});