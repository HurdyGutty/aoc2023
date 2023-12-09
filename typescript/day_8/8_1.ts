import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);

function isAlpha(c: string): boolean {
    let charCode = c.charCodeAt(0);
    return (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123);
}

function parseLine(line: string): string[] {
    let nodes: string[] = [];
    let node = "";
    for (let i = 0; i < line.length; i++) {
        if (node.length === 3) {
            nodes.push(node)
            node = "";
        };
        
        if (isAlpha(line[i])) {
            node += line[i];
        }
    }
    return nodes;
}

export type ParseLineFn = (line: string) => string[];
export type Node = {
    value: string,
    L: string | Node,
    R: string | Node

};
export type Tree = {
    [key: string]: Node
};

function parseNode(lines: string[], parseLine: ParseLineFn): [string, string[][]] {
    let data: [string, string[][]] = [] as any;

    data.push(lines[0]);
    data.push(lines[1].split("\r\n").map(parseLine))
    return data;

}

let [directions, nodes] = parseNode(lines, parseLine);


function buildTreeFromNodes(nodes: string[][]): Tree {
    let tree: Tree = {};
    for (let i = 0; i < nodes.length; i++) {
        let [node, left, right] = nodes[i];
        tree[node] = { value: node,  L: left, R: right };
    }
    for (let key in tree) {
        let { L, R } = tree[key];
        if ((typeof L === 'string') && tree[L]) {
            tree[key].L = tree[L];
        }
        if ((typeof R === 'string') && tree[R]) {
            tree[key].R = tree[R];
        }
    }
    return tree;
}

let tree = buildTreeFromNodes(nodes);
let first = tree['AAA'];
let numberOfTurns = 0;

function getDirection(direction: string, turn: number): string {
    return direction[turn % direction.length];
}

while (first.value !== 'ZZZ') {
    let direction = getDirection(directions, numberOfTurns);
    if (direction === 'L') {
        first = first.L as Node;
    } else {
        first = first.R as Node;
    }
    numberOfTurns++;
    if (first.value === 'ZZZ') {
        break;
    }
}



