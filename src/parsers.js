import yaml from 'js-yaml';

const getParser = (extName) => {
  const mapping = {
    '.json': JSON.parse,
    '.yaml': yaml.load,
    '.yml': yaml.load,
  };

  return mapping[extName] ?? null;
};

export default getParser;
