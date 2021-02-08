
// TODOS:
// Poder colocar símbolo negativo 
// format números (separación con puntos y comas) : Intl.NumberFormat
// Entrada input por teclado;
// Número + operador + '='   ------> 2+= 4; 2-= 0; 2x= 4; 2÷= 1;
// Presionar '=' otra vez después de una operación ------> 5-1 = 4 = 3 = 2 = 1...


let currentOperationValue = '';
let previousOperationValue = '';
let currentOperator = '';
let currentOperationDisplay = document.querySelector('.current-op');
let previousOperationDisplay = document.querySelector('.previous-op');

let lastKey = null;

document.addEventListener('click', (e)=> {
    const key = e.target;
    
    if(key.id === 'clear') clearOperations();
    if(key.id === 'delete') deleteLastNumber();
    if(key.id === 'number') addNumToCurrentOperation(key);
    if(key.id === 'operator') addOperatorToCurrentOperation(key);
    if(key.id === 'equals') runEquals();
});

function clearOperations(){
    currentOperationValue = '';
    previousOperationValue = '';
    currentOperator = '';
    updateScreen();
}

function deleteLastNumber(){
    if(currentOperationValue && lastKey !== '='){
        currentOperationValue = currentOperationValue.slice(0,-1);
        updateScreen();
    } else {
        clearOperations();
    }
}

function addNumToCurrentOperation(key){
    const num = key.textContent;
    if(currentOperationValue === 'Error' || lastKey === '=') clearOperations();
    
    lastKey = false;

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

function addOperatorToCurrentOperation(key){
    lastKey = null;

    if(isValidOperator(key)){
    
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
}

function runEquals(){
    lastKey = '=';
    if(isValidEquals()) {
        let result = compute();
        previousOperationValue = '';
        currentOperator = '';
        if(isNaN(result)){
            currentOperationValue = 'Error';
        } else {
            currentOperationValue = result;
        }
        updateScreen();
        return;
    } else {
        return;
    }
}

// HELPER FUNCTIONS

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

function updateScreen(){
    currentOperationDisplay.textContent = currentOperationValue;
    previousOperationDisplay.textContent = `${previousOperationValue} ${currentOperator}`;
}

function isValidEquals(){
    if(currentOperationValue.slice(-1) === '.'){
        lastKey = null;
        return false;
    }
    if(!currentOperationValue || !previousOperationValue) return false;
    return true;
}

function isValidOperator(key){
    if(!currentOperationValue && !previousOperationValue || currentOperationValue.slice(-1) === '.') return false;
    if(currentOperationValue === 'Error'){
        clearOperations();
        return false;
    }
    if(!currentOperationValue){

        currentOperator = key.textContent;
        updateScreen();
        return false;
    } 
    return true;
}
