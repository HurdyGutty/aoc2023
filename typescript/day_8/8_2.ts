import {tree, nodes, directions, type Node, type Tree, getDirection} from "./8_1.js";

console.log(nodes);

let allAEndNodes = nodes.filter(([node]) => node.endsWith('A')).map(([node]) => node);

console.log(allAEndNodes);
let numberOfTurns = 0;

let first = allAEndNodes.map(node => tree[node]);
let turnToZ: number[] = [];
console.log(first);
let i = 0;

for (let i = 0; i < first.length; i++) {
    let node = first[i];
    while (!node.value.endsWith('Z')) {
        let direction = getDirection(directions, numberOfTurns);
        if (direction === 'L') {
            node = node.L as Node;
        } else {
            node = node.R as Node;
        }
        numberOfTurns++;
        if (node.value[2] === 'Z') {
            break;
        }
    }
    turnToZ.push(numberOfTurns);
    numberOfTurns = 0;
}

function findGCD(numbers: number[]): number {
    let gcd = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        let number = numbers[i];
        while (number !== 0) {
            let temp = number;
            number = gcd % number;
            gcd = temp;
        }
    }
    return gcd;

}

function findLCM(numbers: number[]): number {
    let lcm = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        let number = numbers[i];
        let gcd = findGCD([lcm, number]);
        lcm = (lcm * number) / gcd;
    }
    return lcm;
}



console.log(findLCM(turnToZ));