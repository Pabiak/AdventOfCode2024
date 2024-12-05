import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = fs.readFileSync(path.resolve(__dirname, 'locations.txt'), 'utf8');

const lines = input.trim().split('\n');

const leftList = lines.map(line => parseInt(line.trim().split(/\s+/)[0], 10));
const rightList = lines.map(line => parseInt(line.trim().split(/\s+/)[1], 10));

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

// part 1
const diff = leftList.reduce((a, x, i) => a + Math.abs(x - rightList[i]), 0);
console.log(diff);

// part 2
const occurancesSum = leftList.reduce((a, x) => a + x * rightList.filter(y => y == x).length, 0);

console.log(occurancesSum);
