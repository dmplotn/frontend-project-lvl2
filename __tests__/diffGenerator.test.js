import fs from 'fs';
import url from 'url';
import path from 'path';
import genDiff from '../src/diffGenerator.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishResult = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
const plainResult = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');

const cases = [
  ['before.json', 'after.json', 'stylish', stylishResult],
  ['before.yaml', 'after.yaml', 'stylish', stylishResult],
  ['before.json', 'after.json', 'plain', plainResult],
  ['before.yaml', 'after.yaml', 'plain', plainResult],
];

test.each(cases)(
  'return diff between %s and %s using %s format',
  (beforeName, afterName, formatName, expected) => {
    const beforePath = getFixturePath(beforeName);
    const afterPath = getFixturePath(afterName);
    expect(genDiff(beforePath, afterPath, formatName)).toBe(expected);
  },
);
