import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);

// console.log(lines);

type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S';
let direction = {
    '|': [{x: 0, y: -1}, {x: 0, y: 1}],
    '-': [{x: 1, y: 0}, {x: -1, y: 0}],
    'L': [{x: 0, y: -1}, {x: 1, y: 0}],
    'J': [{x: 0, y: -1}, {x: -1, y: 0}],
    '7': [{x: 0, y: 1}, {x: -1, y: 0}],
    'F': [{x: 0, y: 1}, {x: 1, y: 0}],
    'S': [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}]
}

let SPosition = {x: 0, y: 0};

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === 'S') {
            SPosition.x = j;
            SPosition.y = i;
        }
    }
}


type Position = {x: number, y: number};

export let mainLoop: Position[] = [];

export function goodConnection (current: Position, next: Position): boolean {
    if (next.x < 0 || next.y < 0 || next.x >= lines[0].length || next.y >= lines.length)
        return false;

    let next_value = lines[next.y][next.x];
    let current_value = lines[current.y][current.x];
    if (next_value === '.' || current_value === '.') {
        return false;
    }
    let next_directions = direction[next_value as Pipe];
    let current_directions = direction[current_value as Pipe];

    for (let next_direction of next_directions) {
        if (next_direction.x + next.x !== current.x && next_direction.y + next.y !== current.y){
            continue;
        }
        for (let current_direction of current_directions) {
            if (current_direction.x + current.x !== next.x && current_direction.y + current.y !== next.y){
                continue;
            }
            return true;
        }
    }

    return false;

}

// function traverse(current: Position, previous: Position, visited: boolean[][], mainLoop: Position[]): Position[] | undefined {
//     if (lines[current.y][current.x] === 'S' && visited[current.y][current.x]) {
//         return mainLoop;
//     }
//     if (visited[current.y][current.x]) {
//         return;
//     }
//     mainLoop.push(current);
//     visited[current.y][current.x] = true;
//     let directions = direction[lines[current.y][current.x] as Pipe];
//     for (let dir of directions) {
//         let previous_dir = {x: previous.x - current.x, y: previous.y - current.y};
//         if (dir.x === previous_dir.x && dir.y === previous_dir.y) continue;
//         let next: Position = {x: current.x + dir.x, y: current.y + dir.y};
//         if (goodConnection(current, next)) {
//             let loop = traverse(next, current, visited, mainLoop);
//             if (loop) return loop;
//         }
//     }

//     mainLoop.pop();
// }

function traverse(start: Position, visited: boolean[][], mainLoop: Position[]): Position[] | undefined {
    let value = lines[start.y][start.x];
    let directions = direction[value as Pipe];
    let current = start;
    mainLoop.push(current);
    visited[current.y][current.x] = true;
    for (let dir of directions) {
        current = {x: start.x + dir.x, y: start.y + dir.y};
        while ( !visited[current.y][current.x] && lines[current.y][current.x] !== 'S') {
            if (!lines[current.y][current.x] || lines[current.y][current.x] === '.') break;
            mainLoop.push(current);
            visited[current.y][current.x] = true;
            let pipe_directions = direction[lines[current.y][current.x] as Pipe];
            for (let pipe_dir of pipe_directions) {
                let next = {x: current.x + pipe_dir.x, y: current.y + pipe_dir.y};
                
                let skipArgument = visited[next.y][next.x];
                if (skipArgument) continue;
                if (goodConnection(current, next)) {
                    current = next;
                    break;
                }
            }

        }
        for (let current_direction of direction[lines[current.y][current.x] as Pipe]) {
            if (current_direction.x + current.x !== start.x && current_direction.y + current.y !== start.y){
                continue;
            }
            return mainLoop;
        }
        
        mainLoop = [];
    }
}

function findMainLoop(lines: string[]) {
    let visited: boolean[][] = [];
    for (let i = 0; i < lines.length; i++) {
        visited.push([]);
        for (let j = 0; j < lines[i].length; j++) {
            visited[i].push(false);
        }
    }
    let current: Position = SPosition;
    return traverse(current, visited, mainLoop);
}

let result = findMainLoop(lines)?.length;

if (result) result /= 2;


console.log(mainLoop);