
// TODOS:
// format números (separación con puntos y comas) : Intl.NumberFormat
// Entrada input por teclado;

let currentOperationValue = '';
let previousOperationValue = '';
let currentOperator = '';
let isEqualsLastKey = false;

let currentOperationDisplay = document.querySelector('.current-op');
let previousOperationDisplay = document.querySelector('.previous-op');

const clearKey = document.querySelector('.clear');
const delKey = document.querySelector('.delete');
const numberKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator')
const equalsKey = document.querySelector('.equals');

numberKeys.forEach(key => key.addEventListener('click', ()=> {
    if(currentOperationValue === 'Error' || isEqualsLastKey) clear();
    isEqualsLastKey = false;
    addNumToCurrentOperation(key);
}));

operatorKeys.forEach(key => key.addEventListener('click', () => {
    isEqualsLastKey = false;
    addOperator(key);
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
    if(currentOperationValue.slice(-1) === '.'){
        isEqualsLastKey = false;
        return;
    }
    if(!currentOperationValue) {
        return;
    }
    if(!previousOperationValue){
        isEqualsLastKey = false;
        return;
    }
    
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

function addOperator(key){
    if(!currentOperationValue && !previousOperationValue || currentOperationValue === '0.') return;
    if(currentOperationValue === 'Error') clear();
    if(!currentOperationValue){

        currentOperator = key.textContent;
        updateScreen();
        return;
    } 
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
}

function clear(){
    currentOperationValue = '';
    previousOperationValue = '';
    currentOperator = '';
    updateScreen();
}

function addNumToCurrentOperation(key){
    const num = key.textContent;
    if(num === '.' && currentOperationValue.includes('.')){
        return;
    } else if(num === '.' && !currentOperationValue){
        currentOperationValue = '0.';
        updateScreen();
    } else {
        currentOperationValue += num;
        updateScreen();
    }
}

function updateScreen(){
    currentOperationDisplay.textContent = currentOperationValue;
    previousOperationDisplay.textContent = `${previousOperationValue} ${currentOperator}`;
}
