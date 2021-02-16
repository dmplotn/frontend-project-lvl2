import { program } from 'commander';
import packageConfig from '../package.json';
import generateDiff from './diffGenerator.js';

export default () => {
  program
    .arguments('<filepath1> <filepath2>')
    .description(packageConfig.description)
    .version(packageConfig.version)
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);

  const [filepath1, filepath2] = program.args;

  try {
    const diff = generateDiff(filepath1, filepath2);
    console.log(diff);
  } catch (err) {
    console.log(err.message);
  }
};
