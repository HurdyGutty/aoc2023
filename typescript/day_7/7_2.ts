import { isNumber, type HandWithType, sortHand, compareHand, calculateResult } from "./7_1.js";
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
    let count_J = 0;

    for (let i = 0; i < hand.length; i++) {
        if (hand[i] === "J") {
            count_J++;
            continue;
        }
        if (countPerCard.has(hand[i])) {
            countPerCard.set(hand[i], countPerCard.get(hand[i]) as number + 1);
        } else {
            countPerCard.set(hand[i], 1);
        }
    } 
    let max_key = "";

    for (let [key, value] of countPerCard.entries()) {
        if (max_key === "") {
            max_key = key;
            continue;
        }
        if (value > (countPerCard.get(max_key) as number)) {
            max_key = key;
        }
    }

    countPerCard.set(max_key, countPerCard.get(max_key) as number + count_J);

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

let addType: HandWithType[] = data.map(d => ({hand: d.hand, bid: d.bid, type: type(d.hand)}));

// console.log(addType);
function compareCard(card1: string, card2: string): number {

    if (card1 === "J" && card2 === "J") {
        return 0;
    }
    if (card1 === "J") {
        return -1;
    }
    if (card2 === "J") {
        return 1;
    }
    let card1_value = card1.charCodeAt(0);
    let card2_value = card2.charCodeAt(0);
    if (!isNumber(card1[0]) && !isNumber(card2[0])) {
        type Card = "T" | "J" | "Q" | "K" | "A";
        let cards: Record<Card, number> = {
            "T": 10,
            "J": 0,
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

}
// export type CompareCard = (card1: string, card2: string) => number;

// export function compareHand(hand1: string, hand2: string, compareCard: CompareCard): number {
//     for (let i = 0; i < hand1.length; i++) {
//         if (compareCard(hand1[i], hand2[i]) !== 0) {
//             return compareCard(hand1[i], hand2[i]);
//         }
//     }
//     return 0;
// }

let sorted = sortHand(addType, compareHand, compareCard);

console.log(sorted);
console.log(calculateResult(sorted));
