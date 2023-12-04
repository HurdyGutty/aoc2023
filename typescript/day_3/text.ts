import * as fs from 'node:fs/promises';

export async function readInput(): Promise<string> {
    return await fs.readFile('day_3/day_3.txt', { encoding: 'utf-8', flag: 'r' })
}


export function parseInput(input: string): string[] {
    return input.split('\r\n');
}