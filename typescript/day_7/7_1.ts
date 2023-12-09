import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input);

let data = lines.map(line => {
    let string_data = line.split(" ");
    return {
        hand: string_data[0],
        bid: parseInt(string_data[1]),
    }
});
let suit = {
    7: "Five of a kind",
    6: "Four of a kind",
    5: "Full house",
    4: "Three of a kind",
    3: "Two pairs",
    2: "One pair",
    1: "High card",
}

function type(hand: string): number {
    let countPerCard: Map<string, number> = new Map();
    countPerCard.set(hand[0], 1);

    for (let i = 1; i < hand.length; i++) {
        if (countPerCard.has(hand[i])) {
            countPerCard.set(hand[i], countPerCard.get(hand[i]) as number + 1);
        } else {
            countPerCard.set(hand[i], 1);
        }
    }

    if (countPerCard.size < 2) {
        return 7;
    }
    if (countPerCard.size === 2) {
        let values = Array.from(countPerCard.values());
        if (values.includes(4)) {
            return 6;
        } else {
            return 5;
        }
    }
    if (countPerCard.size === 3) {
        let values = Array.from(countPerCard.values());
        if (values.includes(3)) {
            return 4;
        } else {
            return 3;
        }
    }
    if (countPerCard.size === 4) {
        return 2;
    }
    return 1;
}

export type HandWithType = {
    hand: string,
    bid: number,
    type: number,
}

let addType: HandWithType[] = data.map(d => ({hand: d.hand, bid: d.bid, type: type(d.hand)}));


export function isNumber(char: string): boolean {
    return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

function compareCard(card1: string, card2: string): number {
    let card1_value = card1.charCodeAt(0);
    let card2_value = card2.charCodeAt(0);
    if (!isNumber(card1[0]) && !isNumber(card2[0])) {
        type Card = "T" | "J" | "Q" | "K" | "A";
        let cards: Record<Card, number> = {
            "T": 10,
            "J": 11,
            "Q": 12,
            "K": 13,
            "A": 14,
        }
        card1_value = cards[card1[0] as Card];
        card2_value = cards[card2[0] as Card];


        if (card1_value > card2_value) {
            return 1;
        }
        if (card1_value < card2_value) {
            return -1;
        }
        return 0;
    } 
    else{
        let sortValue = card1_value - card2_value;
        if (sortValue === 0) {
            return sortValue;
        } else {
            return (sortValue > 0 ? 1 : -1);
        }
        
    } 

};

export type CompareCard = (card1: string, card2: string) => number;

export function compareHand(hand1: string, hand2: string, compareCard: CompareCard): number {
    for (let i = 0; i < hand1.length; i++) {
        if (compareCard(hand1[i], hand2[i]) !== 0) {
            return compareCard(hand1[i], hand2[i]);
        }
    }
    return 0;
}
type compareHand = typeof compareHand;

export function sortHand(addType: HandWithType[], compareFn: compareHand, compareCard: CompareCard): HandWithType[] {
    return addType.sort((a, b) => {
        if (a.type > b.type) {
            return 1;
        }
        if (a.type < b.type) {
            return -1;
        }
        return compareFn(a.hand, b.hand, compareCard);
    });
}

let sorted = sortHand(addType, compareHand, compareCard);

console.log(sorted);

export function calculateResult(addType: HandWithType[]): number {
    let result = 0;
    for (let i = 0; i < addType.length; i++) {
        result += addType[i].bid * (i + 1);
    }
    return result;
}

console.log(calculateResult(sorted));