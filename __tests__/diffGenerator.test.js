import fs from 'fs';
import url from 'url';
import path from 'path';
import genDiff from '../src/diffGenerator.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('plain json', () => {
  const beforePath = getFixturePath('beforePlain.json');
  const afterPath = getFixturePath('afterPlain.json');
  const resultPath = getFixturePath('resultPlain.txt');
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(beforePath, afterPath)).toBe(result);
});

test('plain yaml', () => {
  const beforePath = getFixturePath('beforePlain.yaml');
  const afterPath = getFixturePath('afterPlain.yaml');
  const resultPath = getFixturePath('resultPlain.txt');
  const result = fs.readFileSync(resultPath, 'utf-8');
  expect(genDiff(beforePath, afterPath)).toBe(result);
});
