import fs from 'fs';
import url from 'url';
import path from 'path';
import genDiff from '../src/diffGenerator.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

const cases = [
  ['before.json', 'after.json', result],
  ['before.yaml', 'after.yaml', result],
];

test.each(cases)(
  'return diff between %s and %s',
  (beforeName, afterName, expected) => {
    expect(genDiff(getFixturePath(beforeName), getFixturePath(afterName))).toBe(expected);
  },
);
