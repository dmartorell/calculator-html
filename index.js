
// TODOS

// decimales largos fixed a 10, por ejemplo
// decimales con múltiples ceros: 118.80000000000001 debería ser 118.8

let currentOperationValue = '';
let previousOperationValue = '';
let currentOperationDisplay = document.querySelector('.current-op');
let previousOperationDisplay = document.querySelector('.previous-op');
let currentOperator = '';

const clearKey = document.querySelector('.clear');
const numberKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator')
const equalKey = document.querySelector('.equals');

numberKeys.forEach(key => key.addEventListener('click', addNumToCurrent));

operatorKeys.forEach(key => key.addEventListener('click', () => {
    currentOperator = key.textContent;
    previousOperationValue = currentOperationValue;
    currentOperationValue = '';
    updateScreen();
}));

clearKey.addEventListener('click', clear);

equalKey.addEventListener('click', ()=> {
    compute();
})

function compute(){
    let result;
    switch(currentOperator){
        case 'x':
            result = Number(previousOperationValue) * Number(currentOperationValue);
        break;
        case '÷':
            result = Number(previousOperationValue) / Number(currentOperationValue);
        break;
        case '+':
            result = Number(previousOperationValue) + Number(currentOperationValue);
        break;
        case '-':
            result = Number(previousOperationValue) - Number(currentOperationValue);
        break;

    }
    previousOperationValue = '';
    currentOperator = '';
    currentOperationValue = result.toString();
    updateScreen();

}
function clear(){
    currentOperationValue = '';
    previousOperationValue = '';
    currentOperator = '';
    updateScreen();
}

function addNumToCurrent(key){
    const num = key.target.textContent;
    if(num === '.' && currentOperationValue.includes('.')){
        return;
    } else {
        currentOperationValue += num;
        updateScreen();
    }
}
function updateScreen(){
    currentOperationDisplay.textContent = currentOperationValue;
    previousOperationDisplay.textContent = previousOperationValue + ' ' + currentOperator;
}


/*function parseString(str){

    const regex = /(?<operand>Infinity|[+\-]?\d*\.?\d+)(?<operator>[/*+\-%])?/g;
    let matches = [];
    const output = [];
    let match;
    while(match = regex.exec(str)){ //el resultado del exec cambia en cada iteración. La última(no hay matches) es undefined y el while se rompe.
        matches.push(match); 
    }
    for(let match of matches){
        const { operand, operator } = match.groups;
        output.push(operand, operator);
    }
    output
    return output.filter(element => element);
}

function processParsedString(parsedArray){
    let total = +parsedArray[0]

    for(let i = 1; i < parsedArray.length; i += 2){
        const operator = parsedArray[i];
        const next = parsedArray[i+1];
        total = +(calculate[operator](total,+next)).toFixed(10);
    }
    total = isNaN(total) ? 'Error' : total;
    return total;
}*/