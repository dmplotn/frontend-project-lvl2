import { program } from 'commander';
import packageConfig from '../package.json';

export default () => {
  program
    .arguments('<filepath1> <filepath2>')
    .description(packageConfig.description)
    .version(packageConfig.version)
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
};
