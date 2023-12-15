import { parseInput, readInput } from "./text.js";

let input = await readInput();
export let lines: string[] = parseInput(input);
type Position = {x: number, y: number};

let galaxies: Position[] = [];
let noGalaxiesRow = new Set(lines.keys());
let noGalaxiesColumn = new Set(Array(lines[0].length).keys());

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] === '#') {
            noGalaxiesColumn.delete(j);
            noGalaxiesRow.delete(i);
        }
    }
}

let iter = noGalaxiesColumn.values();
let offset = 0;
for (let value = iter.next().value; value !== undefined; value = iter.next().value) {
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        lines[i] = line.slice(0, value + offset) + '.' + line.slice(value + offset);
    }
    offset++;
}

iter = noGalaxiesRow.values();
offset = 0;

for (let value = iter.next().value; value !== undefined; value = iter.next().value) {
    lines.splice(value + offset, 0, lines[value + offset]);
    offset++;
}

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] === '#') {
            galaxies.push({x: j, y: i});
        }
    }

}
let step = 0;

for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        step += Math.abs(galaxies[j].x - galaxies[i].x) + Math.abs(galaxies[j].y - galaxies[i].y);
    }
}

console.log(step);