import { calculatePoints } from "./4_1.js";
import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: [string, string, number][] = parseInput(input).map(line => {
                    let result: (string | number)[] = line.substring(input.indexOf(':') + 2).split(' | ');
                    result.push(1);
                    return result;
                }
            ) as [string, string, number][];

console.log(lines);

let sum = 0;

for (let n = 0; n < lines.length; n++) {
    let line = lines[n];
    let points = 0;
    let [winning, having, cards] = line;

    points = calculatePoints(winning, having);
    if (points > 0) {
        for (let k = 1; k <= points; k++) {
            if (lines[n + k] === undefined) break;
            lines[n + k][2] += cards;
        }
        
    }
    console.log(`card ${n + 1}: `, cards);
    sum += cards;
}

console.log(sum);



