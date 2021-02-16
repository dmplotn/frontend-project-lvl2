import _ from 'lodash';
import fs from 'fs';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const inner = keys
    .flatMap((key) => {
      if (!_.has(data1, key)) {
        return `  + ${key}: ${data2[key]}`;
      }
      if (!_.has(data2, key)) {
        return `  - ${key}: ${data1[key]}`;
      }
      if (data1[key] === data2[key]) {
        return `    ${key}: ${data1[key]}`;
      }
      return [
        `  - ${key}: ${data1[key]}`,
        `  + ${key}: ${data2[key]}`,
      ];
    })
    .join('\n');
  return `{\n${inner}\n}`;
};

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));
  return getDiff(data1, data2);
};
