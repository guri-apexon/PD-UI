/* eslint-disable import/prefer-default-export */
export const summaryUtilsFun = (summary, setHeaderList) => {
  if (summary?.data?.length) {
    setHeaderList(
      summary.data.filter((x) => x.source_file_section !== 'blank_header'),
    );
  } else {
    setHeaderList([]);
  }
};

export const sectionNumberFun = (sectionNumber, setSectionSequence) => {
  if (sectionNumber >= 0) {
    setSectionSequence(sectionNumber);
  }
};

export const tocActiveSelectorUtilsFun = (tocActiveSelector, setTocActive) => {
  if (tocActiveSelector) setTocActive(tocActiveSelector);
};

export const sectionSequenceUtilsFun = (
  sectionSequence,
  sectionRef,
  scrollToTop,
  setCurrentActiveCard,
  headerList,
) => {
  if (sectionSequence === 'undefined' || sectionSequence === undefined) {
    // eslint-disable-next-line no-irregular-whitespace
    //  refs[1].current.scrollIntoView({ behavior: 'smooth' });
  } else if (
    sectionRef[sectionSequence] &&
    sectionRef[sectionSequence].current
  ) {
    scrollToTop(sectionSequence);
    setCurrentActiveCard(headerList[sectionSequence]?.link_id);
  }
};
