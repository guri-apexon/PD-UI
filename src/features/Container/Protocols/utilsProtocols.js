import queryString from 'query-string';

export const conditionBlock = (location, setValue) => {
  const params = location.search;
  const parsed = queryString.parse(params);
  if ('tab' in parsed) {
    setValue(parseInt(parsed.tab, 10));
  }
};

export const abc = () => {
  console.log('abc');
};
