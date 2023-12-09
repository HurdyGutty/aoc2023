import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input)

export type Rule = {
    start: number,
    end: number,
    conversion: number,
}
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


export function convertData(lines: string[]): [number[], Rule[][]]  {
    let categories: Rule[][] = [];
    let seeds: number[] = [];
    for (let i = 0; i < lines.length; i++) {
        let rules: Rule[] = [];
        let number = 0;
        let rule_strings: string[] = [];
        if (i === 0) {
            seeds = extractNumber(lines[0]);
            continue;
        }
        rule_strings = lines[i].split('\r\n');
        for (let j = 1; j < rule_strings.length; j++) {
            let rule_string = rule_strings[j];
            let [destination, source, range] = extractNumber(rule_string);
            rules.push({ start: source, end: source + range - 1, conversion: destination - source });
        }
        categories.push(rules);
    }
    return [seeds, categories];
}

let [seeds , categories] = convertData(lines);

for (let i = 0; i < seeds.length; i++) {

    for (let catergory of categories) {
        for (let rule of catergory) {
            const {start, end, conversion} = rule;
            if (seeds[i] >= start && seeds[i] <= end) {
                seeds[i] += conversion;
                break;
            }
        }
    }
}
export function findMin(seeds: number[]): number {
    let min = seeds[0];
    for (let seed of seeds) {
        if (seed < min) {
            min = seed;
        }
    }
    return min;
}

console.log(findMin(seeds));