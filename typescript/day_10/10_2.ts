import { mainLoop, type Position, goodConnection, direction, type Pipe, lines, SPosition } from "./10_1.js";

let startPipeMove = [{x: mainLoop[1].x - mainLoop[0].x, y: mainLoop[1].y - mainLoop[0].y}, {
    x: mainLoop[mainLoop.length - 1].x - mainLoop[0].x,
    y: mainLoop[mainLoop.length - 1].y - mainLoop[0].y
}];
let startType = lines[mainLoop[0].y][mainLoop[0].x];

for (let pipe of Object.keys(direction)) {
    let directions = direction[pipe as Pipe];

    if (directions[0].x === startPipeMove[0].x && directions[0].y === startPipeMove[0].y
        && directions[1].x === startPipeMove[1].x && directions[1].y === startPipeMove[1].y
        || directions[0].x === startPipeMove[1].x && directions[0].y === startPipeMove[1].y
        && directions[1].x === startPipeMove[0].x && directions[1].y === startPipeMove[0].y) {
            startType = pipe;
            break;
        }
}

let new_map = Array.from(lines, (line) => new Array(line.length).fill('.'));

mainLoop.forEach((position) => {
    new_map[position.y][position.x] = 'X';
});

console.log(new_map);
type PipeType = '.' | '|' | '-' | 'L' | 'J' | '7' | 'F';

type PipeConvert = {
    '.': string[],
    '|': string[],
    '-': string[],
    'L': string[],
    'J': string[],
    '7': string[],
    'F': string[],
}

let convertDouble = {
    '.': ['..', '..'],
    '|': ['.X', '.X'],
    '-': ['..', 'XX'],
    'L': ['.X', '..'],
    'J': ['X.', '..'],
    '7': ['..','X.'],
    'F': ['..','.X'],
}

let doubleGridMap = new_map.map((line, i, map) => line.map((value, j) => {
    if (lines[i][j] === 'S') return convertDouble[startType as PipeType];
    if (value === 'X') return convertDouble[lines[i][j] as PipeType];
    return convertDouble[value as PipeType]
    }));


let finishMap = [];

finishMap = doubleGridMap.map((line, i, map) => {
    let first_line = '';
    let second_line = '';

    for (let j = 0; j < line.length; j++) {
        first_line += line[j][0];
        second_line += line[j][1];
    }
    return [first_line, second_line];
}).flat();

function BFS (map: string[], start: Position): Set<string> {
    let queue = [start];
    let four_directions = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x:-1, y: 0}];
    let visited = Array.from(map, (line) => new Array(line.length).fill(false));
    let result = new Set<string>();
    let deleted = new Set<string>();

    while (queue.length > 0) {
        let current = queue.shift() as Position;
        if (visited[current.y][current.x]) continue;
        visited[current.y][current.x] = true;
        let x_index = Math.floor(current.x / 2);
        let y_index = Math.floor(current.y / 2);
        if (!deleted.has(`${x_index},${y_index}`)) 
            result.add(`${x_index},${y_index}`);
        for (let direction of four_directions) {
            let next = {x: current.x + direction.x, y: current.y + direction.y};
            let next_x_index = Math.floor(next.x / 2);
            let next_y_index = Math.floor(next.y / 2);
            if (next.x < 0 || next.y < 0 || next.x >= map[0].length || next.y >= map.length) continue;
            if (map[next.y][next.x] === 'X') {
                result.delete(`${next_x_index},${next_y_index}`);
                deleted.add(`${next_x_index},${next_y_index}`);
                continue;
            }
            queue.push(next);
        }
    }

    return result;
}


let outside = BFS(finishMap, {x: 0, y: 0});

let map_size = lines.length * lines[0].length;

console.log(map_size - outside.size - mainLoop.length);