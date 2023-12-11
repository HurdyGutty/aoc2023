import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);

let histories = lines.map(line => line.split(' ').map(word => parseInt(word)));


let sum = 0;
for (let i = 0; i < histories.length; i++) {
    let history = histories[i];
    let last = 0;
    for (let j = 0; j < history.length; j++) {
        last += history.at(-1) as number;
        while(history.some((num) => num !== 0)) {
            let new_array = [];
            for (let k = 0; k < history.length - 1; k++) {
                new_array.push(history[k + 1] - history[k]);
            }
            last += new_array.at(-1) as number;
            history = new_array;
        }
    }
    sum += last;
}
console.log(sum);


