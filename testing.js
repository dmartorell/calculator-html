
const calculate = {
    '+' : (a,b) => a + b,
    '-' : (a,b) => a - b,
    '*' : (a,b) => a * b, 
    '/' : (a,b) => a / b,
    '%' : (a) => a / 100, 
}

function parseString(str){
    const regex = /(?<operand>[+\-]?\d*\.?\d+)(?<operator>[/*+\-%])?/g;
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

function processParsedString(parcedString){
    let total = +parcedString[0]

    for(let i = 1; i < parcedString.length; i += 2){
        const operator = parcedString[i];
        const next = parcedString[i+1];
        total = calculate[operator](total,+next);
    }
    return total;
}

let parced = (parseString('25*2+4-3'));
console.log(parced);// ['25','*', '2', '+', '4', '-', '3']
console.log(processParsedString(parced)); // 51

// let parced2 = (parseString('100/4+-25+10')); 
// console.log(parced2);// ['100','/', '4', '+', '-25', '+', '10']
// console.log(addTotal(parced2)); // 10

// let parced3 = (parseString('2.5*2+4.3')); 
// console.log(parced3);// ['2.5','*', '2', '+', '4.3']
// console.log(addTotal(parced3)); // 9.3

// console.log(addTotal(['9','%'])); // 0.09

