import queryString from 'query-string';

export const conditionBlock = (location, setValue) => {
  const params = location.search;
  const parsed = queryString.parse(params);
  if ('tab' in parsed) {
    setValue(parseInt(parsed.tab, 10));
  }
};

export const pdfPage = async (pdfArray) => {
  for (let index = 0; index < 250; index++) {
    pdfArray.push(index);
  }
};

export const tocactiveUtils = (tocIsactive, header) => {
  for (let i = 0; i < header.data.length; i++) {
    tocIsactive.push(false);
  }
};
