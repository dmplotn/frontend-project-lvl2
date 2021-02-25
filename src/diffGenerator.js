import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const inner = keys
    .flatMap((key) => {
      let newValue;
      if (!_.has(data1, key)) {
        newValue = `  + ${key}: ${data2[key]}`;
      } else if (!_.has(data2, key)) {
        newValue = `  - ${key}: ${data1[key]}`;
      } else if (data1[key] === data2[key]) {
        newValue = `    ${key}: ${data1[key]}`;
      } else {
        newValue = [
          `  - ${key}: ${data1[key]}`,
          `  + ${key}: ${data2[key]}`,
        ];
      }
      return newValue;
    })
    .join('\n');

  return `{\n${inner}\n}`;
};

export default (filepath1, filepath2) => {
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

  return getDiff(data1, data2);
};
