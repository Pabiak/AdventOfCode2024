import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

const lines = input.trim().split('\n');

const digitsFromSingleLine = lines.map((line) =>
    line
        .trim()
        .split(/\s+/)
        .map((digit) => parseInt(digit, 10))
);

const safeLevels = digitsFromSingleLine.reduce((a, x) => {
    let isDecreasing = false;
    let isIncreasing = false;
    let biggestChange = 0;
    let smallestChange = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < x.length - 1; i++) {
        const diff = Math.abs(x[i] - x[i + 1]);
        biggestChange = Math.max(biggestChange, diff);
        smallestChange = Math.min(smallestChange, diff);

        if (x[i] > x[i + 1]) isDecreasing = true;
        if (x[i] < x[i + 1]) isIncreasing = true;

        if (isDecreasing && isIncreasing) return a;
        if (biggestChange > 3) return a;
        if (smallestChange < 1) return a;
    }

    return a + 1;
}, 0);

// part2
const safeLevels2 = digitsFromSingleLine.reduce((a, x) => {
    let isDecreasing = false;
    let isIncreasing = false;
    let biggestChange = 0;
    let smallestChange = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < x.length - 1; i++) {
        const diff = Math.abs(x[i] - x[i + 1]);
        biggestChange = Math.max(biggestChange, diff);
        smallestChange = Math.min(smallestChange, diff);

        if (x[i] > x[i + 1]) isDecreasing = true;
        if (x[i] < x[i + 1]) isIncreasing = true;

        if (
            (isDecreasing && isIncreasing) ||
            biggestChange > 3 ||
            smallestChange < 1
        ) {
            let isValidAfterRemoval = false;

            for (let j = 0; j < x.length; j++) {
                const copy = [...x];
                copy.splice(j, 1);

                let isDecreasingCopy = false;
                let isIncreasingCopy = false;
                let biggestChangeCopy = 0;
                let smallestChangeCopy = Number.MAX_SAFE_INTEGER;

                for (let k = 0; k < copy.length - 1; k++) {
                    const diffCopy = Math.abs(copy[k] - copy[k + 1]);
                    biggestChangeCopy = Math.max(biggestChangeCopy, diffCopy);
                    smallestChangeCopy = Math.min(smallestChangeCopy, diffCopy);

                    if (copy[k] > copy[k + 1]) isDecreasingCopy = true;
                    if (copy[k] < copy[k + 1]) isIncreasingCopy = true;

                    if (isDecreasingCopy && isIncreasingCopy) break;
                    if (biggestChangeCopy > 3) break;
                    if (smallestChangeCopy < 1) break;
                }

                if (
                    !(isDecreasingCopy && isIncreasingCopy) &&
                    biggestChangeCopy <= 3 &&
                    smallestChangeCopy >= 1
                ) {
                    isValidAfterRemoval = true;
                    break;
                }
            }

            if (!isValidAfterRemoval) return a;
        }
    }

    return a + 1;
}, 0);


console.log(safeLevels);
console.log(safeLevels2);
