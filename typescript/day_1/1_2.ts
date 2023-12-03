import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);
let sum = 0;
let i = 0;
let number_line: number[] = []
let letters_tree = {
    letter: 'n',
    number: {'nine': 9},
    left: {
        letter: 'f',
        number: {'four': 4, 'five': 5},
        left: {
            letter: 'e',
            number: {'eight': 8},
        }
    },
    right: {
        letter: 's',
        number: {'seven': 7, 'six': 6},
        left: {
            letter: 'o',
            number: {'one': 1},
        },
        right: {
            letter: 't',
            number: {'two': 2, 'three': 3},
        }
    }

}

type Node = {
    letter: string,
    number: {[key: string]: number},
    left?: Node,
    right?: Node,
};

let node: Node | undefined = letters_tree;

function traverse(node: Node, line: string) {
    let letter_compare = line[i].localeCompare(node.letter);
    if (letter_compare === 0) {
        for (let [number_letter, number] of Object.entries(node.number)) {
            if (line.slice(i, i + number_letter.length).localeCompare(number_letter) === 0) {
                number_line.push(number);
                i += number_letter.length - 2;
                break;
            }
        }
        
    } else if (letter_compare < 0) {
        if (!node.left) {
            return;
        }
        node = node.left;
        traverse(node, line);
    } else {
        if (!node.right) {
            return;
        }
        node = node.right;
        traverse(node, line);
    }
}

for (let line of lines) {
    number_line = [];
    for (i = 0; i < line.length; i++) {
        if (!isNaN(parseInt(line[i]))) {
            number_line.push(parseInt(line[i]));
            continue;
        }
        node = letters_tree;
        traverse(node, line);
    }
    if (number_line.length > 0)
    {
        sum += number_line[0] * 10 + number_line[number_line.length - 1];
    }
}

console.log(sum);

