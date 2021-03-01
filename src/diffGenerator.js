import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';
import getFormater from './formaters.js';
import buildAst from './ast.js';

const getParseredData = (filepath1, filepath2) => {
  const extName1 = path.extname(filepath1);
  const extName2 = path.extname(filepath2);

  if (extName1 !== extName2) {
    throw new Error('File extensions must be the same.');
  }

  const parse = getParser(extName1);

  if (parse === null) {
    throw new Error('Required parser not found.');
  }

  const fileContent1 = fs.readFileSync(filepath1, 'utf-8');
  const fileContent2 = fs.readFileSync(filepath2, 'utf-8');

  const data1 = parse(fileContent1);
  const data2 = parse(fileContent2);

  return [data1, data2];
};

export default (filepath1, filepath2, format = 'stylish') => {
  const [data1, data2] = getParseredData(filepath1, filepath2);

  const formatAst = getFormater(format);

  const ast = buildAst(data1, data2);
  return formatAst(ast);
};
