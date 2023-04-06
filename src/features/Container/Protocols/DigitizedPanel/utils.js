const scrollToLinkandReference = (index, linkandReference) => {
  const dvParent = document.getElementsByClassName('section-single-content')[
    index
  ];
  const scrollDiv = dvParent.getElementsByClassName(
    'readable-content-wrapper',
  )[0];
  if (scrollDiv) {
    try {
      scrollDiv.scrollBy(
        0,
        document
          .evaluate(
            `//*[text()[contains(., '${linkandReference}')]][last()]`,
            document.body,
          )
          .iterateNext()
          .getBoundingClientRect().top,
      );
    } catch (error) {
      console.log(error, 'scroll error');
    }
  }
};

export default scrollToLinkandReference;
