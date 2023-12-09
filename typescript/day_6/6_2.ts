import { parseInput, readInput } from "./text.js";
import { calculateResult, calculateWaysToWin } from "./6_1.js";
import type { Data } from "./6_1.js";

let input = await readInput();
let lines: string[] = parseInput(input)

export function isNumber(char: string): boolean {
    return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function extractNumber(line: string): number[] {
    let number = 0;
    for (let i = 0; i <= line.length; i++) {
        if (line[i] && isNumber(line[i])) {
            number *= 10;
            number += parseInt(line[i]);
            continue;
        }
    }
    return [number];
}


let data: Data = {time: [], distance: []};
data.time = extractNumber(lines[0]);
data.distance = extractNumber(lines[1]);

let waysToWin = calculateWaysToWin(data);
let result = calculateResult(waysToWin);

console.log(result);