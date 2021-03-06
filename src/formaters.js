import formatStylishAst from './formaters/stylishFormater.js';
import formatPlainAst from './formaters/plainFormater.js';

const getFormater = (format) => {
  const mapping = {
    stylish: formatStylishAst,
    plain: formatPlainAst,
    json: (ast) => JSON.stringify(ast, null, '\t'),
  };

  return mapping[format] ?? null;
};

export default getFormater;
