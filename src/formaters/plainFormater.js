const valueAsStr = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const formatAst = (ast, nameParts = []) => {
  const parts = ast.flatMap((node) => {
    const { name, type, children } = node;
    const beforeValue = valueAsStr(node.beforeValue);
    const afterValue = valueAsStr(node.afterValue);
    const fullName = [...nameParts, name].join('.');

    switch (type) {
      case 'added':
        return `Property '${fullName}' was added with value: ${afterValue}`;
      case 'deleted':
        return `Property '${fullName}' was removed`;
      case 'nested':
        return formatAst(children, [...nameParts, name]);
      case 'changed':
        return `Property '${fullName}' was updated. From ${beforeValue} to ${afterValue}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type(${type})`);
    }
  });

  return parts.join('\n');
};

export default formatAst;
