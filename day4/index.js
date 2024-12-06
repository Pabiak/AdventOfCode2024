import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

const word = "XMAS";

const lines = input.trim().split('\n').map((line) => line.split(''));

let found = 0;

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        for(let k = 0; k < word.length; k++) {
            if (lines[i][j + k] !== word[k]) {
                break;
            }
            if (k === word.length - 1) {
                found++;
            }
        }
        for(let k = 0; k < word.length; k++) {
            if (lines[i][j - k] !== word[k]) {
                break;
            }
            if (k === word.length - 1) {
                found++;
            }
        }
        if (i < lines.length - 3) {
            for(let k = 0; k < word.length; k++) {
                if (lines[i + k][j] !== word[k]) {
                    break;
                }
                if (k === word.length - 1) {
                    found++;
                }
            }
            for(let k = 0; k < word.length; k++) {
                if (lines[i + k][j + k] !== word[k]) {
                    break;
                }
                if (k === word.length - 1) {
                    found++;
                }
            }
            for(let k = 0; k < word.length; k++) {
                if (lines[i + k][j - k] !== word[k]) {
                    break;
                }
                if (k === word.length - 1) {
                    found++;
                }
            }
        }
        if (i > 2) {
            for(let k = 0; k < word.length; k++) {
                if (lines[i - k][j] !== word[k]) {
                    break;
                }
                if (k === word.length - 1) {
                    found++;
                }
            }
            for (let k = 0; k < word.length; k++) {
                if (lines[i - k][j + k] !== word[k]) {
                    break;
                }
                if (k === word.length - 1) {
                    found++;
                }
            }
            for (let k = 0; k < word.length; k++) {
                if (lines[i - k][j - k] !== word[k]) {
                    break;
                }
                if (k === word.length - 1) {
                    found++;
                }
            }
        }
    }
}
console.log(found);