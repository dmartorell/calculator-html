
let currentOperationValue = '';
let previousOperationValue = '';
let currentOperationDisplay = document.querySelector('.current-op');
let previousOperationDisplay = document.querySelector('.previous-op');

const numKeys = document.querySelectorAll('.number');

numKeys.forEach(key => key.addEventListener('click', addNumToCurrent));

function clear(){
    currentOperationValue = '';
    previousOperationValue = '';
}

function addNumToCurrent(key){
    const num = key.target.textContent;
    if(num === '.' && currentOperationValue.includes('.')){
        return;
    } else {
        currentOperationValue += key.target.textContent;
        updateScreen(currentOperationValue);
    }
}
function updateScreen(value){
    currentOperationDisplay.textContent = value;

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