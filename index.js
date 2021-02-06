
// TODOS

// poder cambiar de opinión respecto al operador usando otros operadores no solo backspace.
// format números (separación con puntos y comas)

let currentOperationValue = '';
let previousOperationValue = '';
let currentOperationDisplay = document.querySelector('.current-op');
let previousOperationDisplay = document.querySelector('.previous-op');
let currentOperator = '';
let isEqualsLastKey = false;

const clearKey = document.querySelector('.clear');
const delKey = document.querySelector('.delete');
const numberKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator')
const equalsKey = document.querySelector('.equals');

numberKeys.forEach(key => key.addEventListener('click', ()=> {
    if(currentOperationValue === 'Error' || isEqualsLastKey) clear();
    isEqualsLastKey = false;
    addNumToCurrent(key);
}));

operatorKeys.forEach(key => key.addEventListener('click', () => {
    isEqualsLastKey = false;
    if(currentOperationValue === 'Error') clear();
    if(!currentOperationValue){

        currentOperator = key.textContent;
        updateScreen();
        return;
    } 
    if(currentOperationValue === '.') return;
    if(previousOperationValue){
        let result = compute();
        previousOperationValue = result;
        currentOperationValue = '';
        currentOperator = key.textContent;
        updateScreen();

    } else {
    currentOperator = key.textContent;
    previousOperationValue = currentOperationValue;
    currentOperationValue = '';
    updateScreen();
    }
}));

clearKey.addEventListener('click', clear);
delKey.addEventListener('click', () => {
    if(currentOperationValue && !isEqualsLastKey){
        currentOperationValue = currentOperationValue.slice(0,-1);
        updateScreen();
    } else {
        clear();
    }
});

equalsKey.addEventListener('click', ()=> {
    isEqualsLastKey = true;
    if(!currentOperationValue) {
        isEqualsLastKey = false;
        return;
    }
    if(!previousOperationValue) return;
    
    let result = compute();
    previousOperationValue = '';
    currentOperator = '';
    if(isNaN(result)){
        currentOperationValue = 'Error';
    } else {
        currentOperationValue = result;
    }
    updateScreen();
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

        default:
            return;

    }
    result = +result.toFixed(2);
    return result.toString();
}
function clear(){
    currentOperationValue = '';
    previousOperationValue = '';
    currentOperator = '';
    updateScreen();
}

function addNumToCurrent(key){
    const num = key.textContent;
    if(num === '.' && currentOperationValue.includes('.')){
        return;
    } else {
        currentOperationValue += num;
        updateScreen();
    }
}
function updateScreen(){
    currentOperationDisplay.textContent = currentOperationValue;
    // currentOperationDisplay.textContent = new Intl.NumberFormat('sp-SP').format(currentOperationValue);

    previousOperationDisplay.textContent = `${previousOperationValue} ${currentOperator}`;
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