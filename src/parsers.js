import yaml from 'js-yaml';

const getParser = (extName) => {
  const mapping = {
    '.json': JSON.parse,
    '.yaml': yaml.load,
  };

  return mapping[extName] ?? null;
};

export default getParser;
