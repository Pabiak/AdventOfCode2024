import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const rules = input[0].split("\n").map(x => x.split("|").map(Number));
const updates = input[1].split("\n").map(x => x.split(",").map(Number));

let totalMiddleSum = 0;

updates.forEach(update => {
    let isValid = true;

    for (const [x, y] of rules) {
        if (update.includes(x) && update.includes(y)) {
            if (update.indexOf(x) > update.indexOf(y)) {
                isValid = false;
                break;
            }
        }
    }

    if (!isValid) return;

    totalMiddleSum += update[Math.floor(update.length / 2)];
});

console.log(totalMiddleSum);
