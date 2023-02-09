// eslint-disable-next-line import/prefer-default-export
export const viewMoreUtilsFunction = (viewMore) => {
  if (viewMore) {
    return 'View Less';
  }
  return 'View More';
};

export const onKeyPress = (e, dispatch, history) => {
  /* istanbul ignore next */
  if (e.key === 'Enter') {
    dispatch({
      type: 'POST_RECENT_SEARCH_DASHBOARD',
      payload: e.target.value,
    });
    history.push(`/search?key=${e.target.value}`);
  }
};

export const viewMoreUtilsFun = (viewMore) => {
  if (viewMore) {
    return 'search-list-ul-scroll';
  }
  return 'search-list-ul';
};
