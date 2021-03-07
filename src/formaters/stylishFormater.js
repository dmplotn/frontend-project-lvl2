const valueAsStr = (value, depth) => {
  const objectInnerAsStr = (obj, depthLevel) => {
    const indent = ' '.repeat(depthLevel * 4);
    return Object
      .entries(obj)
      .map(([k, v]) => `${indent}    ${k}: ${valueAsStr(v, depthLevel)}`)
      .join('\n');
  };
  const objectAsStr = (obj, depthLevel) => {
    const indent = ' '.repeat(depthLevel * 4);
    return `{\n${objectInnerAsStr(obj, depthLevel + 1)}\n${indent}    }`;
  };
  return (value instanceof Object) ? objectAsStr(value, depth) : String(value);
};

const formatInner = (ast, depth = 0) => {
  const indent = ' '.repeat(depth * 4);
  const parts = ast.flatMap((node) => {
    const { name, type, children } = node;

    const beforeValue = valueAsStr(node.beforeValue, depth);
    const afterValue = valueAsStr(node.afterValue, depth);

    switch (type) {
      case 'added':
        return `${indent}  + ${name}: ${afterValue}`;
      case 'deleted':
        return `${indent}  - ${name}: ${beforeValue}`;
      case 'nested':
        return `${indent}    ${name}: {\n${formatInner(children, depth + 1)}\n${indent}    }`;
      case 'changed':
        return [
          `${indent}  - ${name}: ${beforeValue}`,
          `${indent}  + ${name}: ${afterValue}`,
        ];
      case 'unchanged':
        return `${indent}    ${name}: ${beforeValue}`;
      default:
        throw new Error(`Unknown node type(${type})`);
    }
  });

  return parts.join('\n');
};

const formatAst = (ast) => `{\n${formatInner(ast)}\n}`;

export default formatAst;
