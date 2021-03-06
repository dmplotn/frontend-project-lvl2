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

    let part;
    switch (type) {
      case 'added':
        part = `Property '${fullName}' was added with value: ${afterValue}`;
        break;
      case 'deleted':
        part = `Property '${fullName}' was removed`;
        break;
      case 'nested':
        part = formatAst(children, [...nameParts, name]);
        break;
      case 'changed':
        part = `Property '${fullName}' was updated. From ${beforeValue} to ${afterValue}`;
        break;
      case 'unchanged':
        part = [];
        break;
      default:
        throw new Error(`Unknown node type(${type})`);
    }

    return part;
  });

  return parts.join('\n');
};

export default formatAst;
