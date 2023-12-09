import { convertData, type Rule } from "./5_1.js";
import { parseInput, readInput } from "./text.js";

let input = await readInput();
let lines: string[] = parseInput(input)


let [seeds , categories] = convertData(lines);

function createSeedRange(seeds: number[]): Rule[] {
    let rule: Rule = {start: 0, end: 0, conversion: 0};
    let rules: Rule[] = [];

    for (let i = 0; i < seeds.length; i++) {
        if(i % 2 == 0) {
            rule.start = seeds[i];
        } else {
            rule.end = rule.start + seeds[i] - 1;
        }
        if (rule.start !== 0 && rule.end !== 0) {
            rules.push(rule);
            rule = {start: 0, end: 0, conversion: 0};
        }
    }
    return rules;
}

let rules: Rule[] = createSeedRange(seeds);

function seedRangeConverse(sourceRule: Rule, destinationRule: Rule): Rule | Rule[] {
    if (sourceRule.start > destinationRule.end || sourceRule.end < destinationRule.start) {
        return sourceRule;
    }
    let start_diff = sourceRule.start - destinationRule.start;
    let end_diff = sourceRule.end - destinationRule.end;
    if  (start_diff >= 0) {
        if (end_diff <= 0) {
            return {start: sourceRule.start, end: sourceRule.end, conversion: sourceRule.conversion + destinationRule.conversion};
        } else {
            return [{start: sourceRule.start, end: destinationRule.end, conversion: sourceRule.conversion + destinationRule.conversion},
                {start: destinationRule.end + 1, end: sourceRule.end, conversion: sourceRule.conversion}];
        }
    } else {
        if (end_diff <= 0) {
            return [{start: sourceRule.start, end: destinationRule.start - 1, conversion: sourceRule.conversion},
                {start: destinationRule.start, end: sourceRule.end, conversion: sourceRule.conversion + destinationRule.conversion}];
        } else {
            return [{start: sourceRule.start, end: destinationRule.start - 1, conversion: sourceRule.conversion},
                {start: destinationRule.start, end: destinationRule.end, conversion: sourceRule.conversion + destinationRule.conversion},
                {start: destinationRule.end + 1, end: sourceRule.end, conversion: sourceRule.conversion}];
        } 
    }
}



// function removeOverlappingRange(rules: Rule[]): Rule[] {
//     for (let i = 0; i < rules.length; i++) {
//         for (let j = i + 1; j < rules.length; j++) {
//            if (rules[i].start > rules[j].end || rules[i].end < rules[j].start) {
//                continue;
//            } 
//            let start_diff = rules[i].start - rules[j].start;
//               let end_diff = rules[i].end - rules[j].end;
//             if (start_diff >= 0) {
//                 if (end_diff <= 0) {
//                     rules.splice(j, 1);
//                     j--;
//                 } else {
//                     rules[i].start = rules[j].end  + 1;
//                 }
//             } else {
//                 if (end_diff <= 0) {
//                     rules[i].end = rules[j].start - 1;
//                 } else {
//                     rules.splice(i, 1, {start: rules[i].start, end: rules[j].start - 1, conversion: rules[i].conversion},
//                         {start: rules[j].end + 1, end: rules[i].end, conversion: rules[i].conversion});
//                 }
//             }
                
//         }
//     }
//     return rules;
// }
// console.log(rules);
// rules = removeOverlappingRange(rules);
// console.log(rules);


// let i = 0;

// for (let i = 0; i < categories.length; i++) {
//     for (let j = 0; j < categories[i].length; j++) {
//         let category = categories[i][j];
//         console.log('Catergory: ',category);
//         for (let n = 0; n < rules.length; n++) {
//             let result = seedRangeConverse(rules[n], category);
//             if (Array.isArray(result)) {
//                 rules.splice(n, 1, ...result);
//                 n += result.length - 1;
//             } else {
//                 rules[n] = result;
//             }
//         }
//         console.log(rules);
        
//     }
// }
// console.log(rules);
let new_seeds = new Set<number>();
for (let range of rules){
    for (let i = range.start; i <= range.end; i++) {
        new_seeds.add(i);
    }
}
let iter = new_seeds.values();

for (let seed = iter.next().value; seed !== undefined; seed = iter.next().value) {
    new_seeds.delete(seed);
    for (let category of categories) {
        for (let rule of category) {
            if (seed >= rule.start && seed <= rule.end) {
                seed += rule.conversion;
                break;
            }
        }
    }
    new_seeds.add(seed);
}
// function findMin(rules: Rule[]): number {
//     let min = rules[0].start + rules[0].conversion;
//     for (let i = 1; i < rules.length; i++) {
//         let smallest = rules[i].start + rules[i].conversion;
//         if (smallest < 0) continue;
//         if (smallest < min) {
//             min = smallest;
//         }
//     }
//     return min;
// }
console.log(Math.min.apply(this, [...new_seeds]));



