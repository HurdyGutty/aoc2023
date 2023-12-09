import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input)

export function isNumber(char: string): boolean {
    return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

export function extractNumber(line: string): number[] {
    let numbers: number[] = [];
    let flag: boolean = false;
    let number = 0;
    for (let i = 0; i <= line.length; i++) {
        if (line[i] && isNumber(line[i])) {
            number *= 10;
            number += parseInt(line[i]);
            flag = true;
            continue;
        }
        if (flag) {
            numbers.push(number);
            number = 0;
            flag = false;
        }
    }
    return numbers;

}
export type Data = {
    time: number[],
    distance: number[],
};
let data: Data = {time: [] as number[], distance: [] as number[]};

data.time = extractNumber(lines[0]);
data.distance = extractNumber(lines[1]);
let waysToWin = calculateWaysToWin(data);

export function calculateWaysToWin(data: Data): number[] {

    let waysToWin: number[] = [];
    for (let i = 0; i < data.time.length; i++) {
        let t = data.time[i];
        let d = data.distance[i];
        let delta = t ** 2 - 4 * d;

        let x1 = (t - Math.sqrt(delta)) / 2;
        let x2 = (t + Math.sqrt(delta))/ 2;


        if (Math.ceil(x1) == x1) {
            x1 += 1;
        } else {
            x1 = Math.ceil(x1);
        }
        if (Math.floor(x2) == x2) {
            x2 -= 1;
        } else {
            x2 = Math.floor(x2);
        }

        waysToWin.push(x2 - x1 + 1);
    }
    return waysToWin;
}
export function calculateResult(waysToWin: number[]): number {
    let result = 1;

    for (let i = 0; i < waysToWin.length; i++) {
        result *= waysToWin[i];
    }
    return result;
}

let result = calculateResult(waysToWin);

console.log(result);