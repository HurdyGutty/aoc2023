import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);

let histories = lines.map(line => line.split(' ').map(word => parseInt(word)));

function firstPropagate(history: number[]): number {
    let first = history[0];
    if (history.every((num) => num === 0)) {
        return first;
    }
    let new_array = [];
    for (let k = 0; k < history.length - 1; k++) {
        new_array.push(history[k + 1] - history[k]);
    }
    return first - firstPropagate(new_array);
}

let sum = 0;
for (let i = 0; i < histories.length; i++) {
    let history = histories[i];
    let first = 0;
    first += firstPropagate(history);
    sum += first;
}
console.log(sum);


