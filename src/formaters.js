import formatStylishAst from './formaters/stylishFormater.js';
import formatPlainAst from './formaters/plainFormater.js';

const getFormater = (format) => {
  const mapping = {
    stylish: formatStylishAst,
    plain: formatPlainAst,
  };

  return mapping[format] ?? null;
};

export default getFormater;
