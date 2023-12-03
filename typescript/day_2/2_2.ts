import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);
let data:  number[] = [];
let sum = 0;
type Game = {
    red: number,
    green: number,
    blue: number
};
type color = "green" | "red" | "blue";

data = lines.map(line => {
    let games_string = line.substring(line.indexOf(':') + 2).split('; ');
    return mapColor(games_string);
})

function mapColor(game_strings: string[]){
    let this_game: Game = {
        red: 0,
        green: 0,
        blue: 0
    };
    for (let turn of game_strings){
        turn.split(', ').map(cube => {
            let [number, color] = cube.split(' ');
                if (color == 'red' && parseInt(number) > this_game.red){
                    this_game.red = parseInt(number);
                }
                if (color == 'green' && parseInt(number) > this_game.green){
                    this_game.green = parseInt(number);
                }
                if (color == 'blue' && parseInt(number) > this_game.blue){
                    this_game.blue = parseInt(number);
                }
            }
        )
    }
    this_game.red = Math.max(this_game.red, 1);
    this_game.green = Math.max(this_game.green, 1);
    this_game.blue = Math.max(this_game.blue, 1);
    return this_game.red * this_game.green * this_game.blue;
}
sum = data.reduce((a, b) => a + b, 0);

console.log(sum);