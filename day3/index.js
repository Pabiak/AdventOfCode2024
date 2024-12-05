import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

const lines = input
    .trim()
    .split('\n')
    .map((line) => Array.from(line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)));

const result = lines.reduce((acc, line) => {
    return (
        acc +
        line.reduce(
            (acc, match) => acc + Number(match[1]) * Number(match[2]),
            0
        )
    );
}, 0);

console.log(result);

const lines2 = input
    .trim()
    .split('\n')
    .map((line) =>
        Array.from(
            line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g)
        )
    );

let enabled = true;
const resul2 = lines2.reduce((acc, line) => {
    return (
        acc +
        line.reduce(
            (acc, match) => {
                if (match[0] === 'do()') {
                    enabled = true;
                    return acc;
                }
                if (match[0] === "don't()") {
                    enabled = false;
                    return acc;
                }
                if (!enabled) {
                    return acc;
                }
                return acc + Number(match[1]) * Number(match[2]);
            },
            0
        )
    );
}, 0);

console.log(resul2);
