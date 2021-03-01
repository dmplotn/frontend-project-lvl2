import _ from 'lodash';

const nodeActions = [
  {
    check: ({ data1, key }) => !_.has(data1, key),
    getNode: (key, data1, data2) => ({
      name: key,
      type: 'added',
      afterValue: data2[key],
    }),
  },
  {
    check: ({ data2, key }) => !_.has(data2, key),
    getNode: (key, data1) => ({
      name: key,
      type: 'deleted',
      beforeValue: data1[key],
    }),
  },
  {
    check: ({ data1, data2, key }) => typeof data1[key] === 'object' && typeof data2[key] === 'object',
    getNode: (key, data1, data2, fn) => ({
      name: key,
      type: 'nested',
      children: fn(data1[key], data2[key]),
    }),
  },
  {
    check: ({ data1, data2, key }) => data1[key] !== data2[key],
    getNode: (key, data1, data2) => ({
      name: key,
      type: 'changed',
      beforeValue: data1[key],
      afterValue: data2[key],
    }),
  },
  {
    check: ({ data1, data2, key }) => data1[key] === data2[key],
    getNode: (key, data1) => ({
      name: key,
      type: 'unchanged',
      beforeValue: data1[key],
    }),
  },
];

const getNodeAction = (processData) => nodeActions.find(({ check }) => check(processData));

const buildAst = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.flatMap((key) => {
    const { getNode } = getNodeAction({ data1, data2, key });
    return getNode(key, data1, data2, buildAst);
  });
};

export default buildAst;
