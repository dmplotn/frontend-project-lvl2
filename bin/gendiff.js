#!/usr/bin/env node
import program from 'commander';
import generateDiff from '../src/diffGenerator.js';

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .parse(process.argv);

const [filepath1, filepath2] = program.args;
const { format } = program.opts();

let diff;
try {
  diff = generateDiff(filepath1, filepath2, format);
} catch (err) {
  console.log(err.message);
}

console.log(diff);
