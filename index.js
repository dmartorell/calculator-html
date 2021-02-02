
// TODOS ******

// Cuando result = ERROR o INIFINITY or -INFINITY qué pasa si intentas seguir haciendo operaciones. 
// BOTÓN DE +/-
// USO DEL %
// DISPLAY EN '0' O 'RESULTADO' : SI USUARIO INTRODUCE OPERADORES SE SUMAN AL '0'.
// SI USUARIO INTRODUCE OPERADOR SEGUIDO DE OPERADOR HAY REGLAS:
            // SE MANTIENEN AMBOS SI EL PRIMEROS ES '*' O '÷' Y EL SEGUNDO ES '-'
            // TEST: '12÷-2' = -6  PROGRAMA FUNCIONA OK
            // TEST: '12*-2  = -24 PROGRAMA FUNCIONA OK
            // SE ELIMINA EL PRIMERO SI EL PRIMEROS ES '*' O '÷' Y EL SEGUNDO ES '+'

const main = document.querySelector('#main');
const OPERATORS = new Set([  '/', '*', '+', '-', '%' ]); 
const OPERANDS = new Set([ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ]);
const SPECIAL_KEYS = new Set([ 'Enter', 'Backspace', '=', '.', ',' ]);
const calculate = {
    '+' : (a,b) => a + b,
    '-' : (a,b) => a - b,
    '*' : (a,b) => a * b, 
    '/' : (a,b) => a / b,
    '%' : (a) => a / 100, 
}

let stringFromUser = '';
let lastResult;
let pointCounter = 0;
let result;

window.addEventListener('keydown', function(e){
    let lastChar = stringFromUser.charAt(stringFromUser.length - 1);
    if(isValid(e.key, lastChar, pointCounter)){
        
        switch(e.key){
            
            case ',':
            case '.':
                if(stringFromUser === 0 && main.textContent === '0'){
                    stringFromUser += '0.';
                    main.textContent = '0.'
                } else if(!stringFromUser && main.textContent.length > 0){
                    stringFromUser += '0.';
                    main.textContent = '0.'
                }else if(OPERATORS.has(lastChar)){
                    stringFromUser += '0.';
                    main.textContent += '0.';

                } else {
                    stringFromUser += '.';
                    main.textContent += '.';
                }
                pointCounter = 1;
                
            break;

            case '*':
                if(!stringFromUser){
                    stringFromUser += result ? `${result}*` : '0*';
                    main.textContent = stringFromUser.replace('*', ' x ');
                    pointCounter = 0;
                } else {
                    stringFromUser += '*';
                    main.textContent += ' x ';
                    pointCounter = 0;
                }
                
            break;
            case '/':

                if(!stringFromUser){
                    stringFromUser += result ? `${result}/` : '0/';
                    main.textContent = stringFromUser.replace('/', ' ÷ ');
                    pointCounter = 0;
                } else {
                    stringFromUser += '/';
                    main.textContent += ' ÷ ';
                    pointCounter = 0;
                }
            
            break;
            case '+':
            
                if(!stringFromUser){
                    stringFromUser += result ? `${result}+` : '0+';
                    main.textContent = stringFromUser.replace('+', ' + ');
                    pointCounter = 0;
                } else {
                    stringFromUser += '+';
                    main.textContent += ' + ';
                    pointCounter = 0;
                }

            break;
            case '-':

                if(!stringFromUser){
                    stringFromUser += result ? `${result}-` : '0-';
                    main.textContent = stringFromUser.replace('-', ' - ');
                    pointCounter = 0;
                } else {
                    stringFromUser += '-';
                    main.textContent += ' - ';
                    pointCounter = 0;
                }
            
            break;
            case '%':

                if(!stringFromUser){
                    stringFromUser += result ? `${result}%` : '0%';
                    main.textContent = stringFromUser.replace('%', ' % ');
                    pointCounter = 0;
                } else {
                    stringFromUser += '%';
                    main.textContent += ' % ';
                    pointCounter = 0;
                }
            
            break;

            case 'Backspace':
               
                if(stringFromUser.length <= 1){
                    screenToZero();
                    resetStringFromUser();
                    resetResult();
                    pointCounter = 0;
                }
                else {
                    if(lastChar === '.'){
                        pointCounter = 0;
                    } 
                    if(OPERATORS.has(lastChar)){
                        main.textContent = main.textContent.slice(0,-2);
                    }

                    stringFromUser = stringFromUser.slice(0,-1);
                    main.textContent = main.textContent.slice(0,-1);
                }
                
            break;
            
            case 'Enter':
                //////////// ENTER KEY or =

            if(!stringFromUser) {  // usuario aprieta intro sobre un resultado ya dado.
                main.textContent = result;
                pointCounter = 0;
            } 
        
            else if(stringFromUser){
                const parsedString = parseString(stringFromUser);
                result = processParsedString (parsedString);
                stringFromUser = '';
                main.textContent = result;
                // lastResult = result;
                pointCounter = 0;
            }
    
            break;
            
            default:
                
            if(!stringFromUser){
                stringFromUser += e.key;
                main.textContent = e.key;
            }
            else {
                stringFromUser += e.key;
                main.textContent += e.key;
            }
        }
    }
});

function resetStringFromUser(){
    return stringFromUser = '';
}
function resetResult(){
    return result = 0;
}

function screenToZero(){
    return main.textContent = 0;
}

function clearScreen(){
    main.textContent = 0;
    return;
}

function isEnter(key){
    return key === 'Enter' || key === '='
}

function isValid(key, lastChar, pointCounter){

    if (!OPERANDS.has(key) && !OPERATORS.has(key) && !SPECIAL_KEYS.has(key)) return false;
    if ((key === ',' || key === '.') && pointCounter > 0) return false; 
    if (lastChar !== '%' && OPERATORS.has(lastChar) && key === 'Enter') return false;

    
    if (key === '*' && lastChar === '*') return false;
    if (key === '/' && lastChar === '/') return false;
    if (key === '+' && lastChar === '+') return false;
    if (key === '-' && lastChar === '-') return false;
    if (key === '%' && lastChar === '%') return false;

    return true;
}

function parseString(str){

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
}