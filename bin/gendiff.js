#!/usr/bin/env node
import { program } from 'commander';
import packageConfig from '../package.json';
import generateDiff from '../src/diffGenerator.js';

program
  .arguments('<filepath1> <filepath2>')
  .description(packageConfig.description)
  .version(packageConfig.version)
  .option('-f, --format [type]', 'output format', 'stylish')
  .parse(process.argv);

const [filepath1, filepath2] = program.args;
const { format } = program.opts();

try {
  const diff = generateDiff(filepath1, filepath2, format);
  console.log(diff);
} catch (err) {
  console.log(err.message);
}
