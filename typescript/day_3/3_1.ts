import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);

const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '/', '\\'];



function isSpecial(char: string){
    return specialChars.includes(char);
}

function isNumber(char: string){
    return !isNaN(parseInt(char));
}
let sum_row = 0;

for (let row = 0; row < lines.length; row++){
    let line = lines[row];
    let flag = false;
    let number = 0;
    for (let i = 0; i < line.length; i++){
        
        if (isNumber(line[i])){
            number += parseInt(line[i]);
            if (isNumber(line[i + 1])) {
                number *= 10;
            }
            if (isSpecial(line[i + 1]) || isSpecial(line[i - 1])){
                flag = true;
            }
            
            if (row > 0 && (isSpecial(lines[row - 1][i - 1]) || isSpecial(lines[row - 1][i]) || isSpecial(lines[row - 1][i + 1]))){
                    flag = true;
            }
            if ((row < lines.length - 1) && 
                    (isSpecial(lines[row + 1][i - 1]) || isSpecial(lines[row + 1][i]) || isSpecial(lines[row + 1][i + 1]))){
                        flag = true;
            }
        } else {
                if (flag === true){
                    sum_row += number;
                    flag = false;
                }
                number = 0;
            }
        if (i == line.length - 1 && flag === true){
            sum_row += number;
            flag = false;
        }
    }
}


console.log(sum_row);