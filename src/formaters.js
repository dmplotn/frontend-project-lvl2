import formatStylishAst from './formaters/stylishFormater.js';

const getFormater = (format) => {
  const mapping = {
    stylish: formatStylishAst,
  };

  return mapping[format] ?? null;
};

export default getFormater;
