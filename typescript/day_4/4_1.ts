import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[][] = parseInput(input).map(line => line.substring(input.indexOf(':') + 2).split(' | '));

let sum = 0;

export function isSpace(char: string): boolean {
    return char.charCodeAt(0) === 32;
}

export function calculatePoints(winning: string, having: string): number {
    let points = 0;
    let winning_set = new Set<number>();
    let number = 0;
    for (let i = 0; i < winning.length; i++) {
        if (isSpace(winning[i])) {
            if (number > 0) winning_set.add(number);
            number = 0;
            continue;
        }
        number *= 10;
        number += parseInt(winning[i]);
        if (i == winning.length - 1) {
            winning_set.add(number);
        }
    }
    number = 0;

    for (let j = 0; j < having.length; j++) {
        if (isSpace(having[j])) {
            if (number > 0 && winning_set.has(number)) {
                points++;
            }
            number = 0;
            continue;
        }
        number *= 10;
        number += parseInt(having[j]);
        if (j == having.length - 1) {
            if (winning_set.has(number)) {
                points++;
            }
        }
    }
    return points;
}


for (let line of lines) {
    let points = 0;
    let [winning, having] = line;
    points = calculatePoints(winning, having);
    
    if (points > 0) {
        sum += Math.pow(2, points - 1);
    }
}

console.log(sum);