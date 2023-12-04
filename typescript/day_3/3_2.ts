import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);

function isAsterisk(char: string){
    return char.charCodeAt(0) === 42;
}

function isNumber(char: string){
    return !isNaN(parseInt(char));
}
let number = '';
let sum = 0;

type relatedNumber = {
    number: string,
    row: number,
    end: number,
    start: number

}

function relatedNumber(row: number, i: number, numbers: relatedNumber[]): relatedNumber | undefined{
    number = '';
    let last_number = numbers[numbers.length - 1];
    if (last_number && (last_number.end >= i && last_number.start <= i && row === last_number.row)) return;
    let j, k;
    j  = i;
    k = i - 1;

    for (; j < lines[row].length; j++){
        if (!isNumber(lines[row][j])) break;
        number = number.concat(lines[row][j]);
    }
    for (; k >= 0; k--){
        if (!isNumber(lines[row][k])) break;
        number = lines[row][k].concat(number);
    }

    return {
        number: number,
        row: row,
        end: j,
        start: k
    }
}
let directions = [-1, 0, 1];

for (let row = 0; row < lines.length; row++){
    let line = lines[row];
    let numbers: relatedNumber[] = [];
    for (let i = 0; i < line.length; i++) {
        if (isAsterisk(line[i])){
            if (numbers.length >= 2){
                sum += parseInt(numbers[0].number) * parseInt(numbers[1].number);
            }
           if (row > 0 ){
                for (let direction of directions){
                    if (isNumber(lines[row - 1][i + direction])) {
                        let resultNumber = relatedNumber(row - 1, i + direction, numbers);
                        if (resultNumber) numbers.push(resultNumber);
                    }
                }          
           }
           if (row < lines.length - 1){
                for (let direction of directions){
                    if (isNumber(lines[row + 1][i + direction])) {
                        let resultNumber = relatedNumber(row + 1, i + direction, numbers);
                        if (resultNumber) numbers.push(resultNumber);
                    }
                }                  
           }
           if (isNumber(line[i - 1])){
                let resultNumber = relatedNumber(row, i - 1, numbers);
                if (resultNumber) numbers.push(resultNumber);
           }
           if (isNumber(line[i + 1])){
                let resultNumber = relatedNumber(row, i + 1, numbers);
                if (resultNumber) numbers.push(resultNumber);
           }
           if (numbers.length >= 2){
            sum += parseInt(numbers[0].number) * parseInt(numbers[1].number);
            }
            numbers = [];
        }
    }
}

console.log(sum);