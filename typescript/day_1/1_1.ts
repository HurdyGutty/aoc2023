import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);
let sum = 0;
let digits: string[] = [];

for (let line of lines) {
    digits = [];
    for (let i = 0; i < line.length; i++) {
        if (!isNaN(parseInt(line[i]))) {
            digits.push(line[i]);
            break;
        }
    }
    for (let i = line.length - 1; i >= 0; i--) {
        if (!isNaN(parseInt(line[i]))) {
            digits.push(line[i]);
            break;
        }
    }
    if (digits.length > 0) {
        sum += parseInt(digits[0].concat(digits[digits.length - 1]));
    }
}

console.log(sum);

