import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);
let data: Turn[][] = [];
type Turn = Record<string, number>;
type color = "green" | "red" | "blue";

data = lines.map(line => {
    let start = line.substring(line.indexOf(':') + 2).split('; ').map(turn => mapColor(turn));
    return start;
})

function mapColor(turn: string){
    let turn_map: Turn = {} as Turn;
    turn.split(', ').map(cube => {
        let [number, color] = cube.split(' ');
        turn_map[color] = parseInt(number);
    }
    )
    return turn_map;
}

let bag = {
    red: 12,
    green: 13,
    blue: 14,
}

let sum = 0;

function checkBag(bag: Turn, data: Turn[][]){
    for (let i = 0; i < data.length; i++){
        let flag = true;
        for (let turn of data[i]){
            if (turn.red > bag.red || turn.green > bag.green || turn.blue > bag.blue){
                flag = false;
            }
        }
        if (flag){
            sum += i + 1;
        }
}
}

checkBag(bag, data); 
console.log(sum);