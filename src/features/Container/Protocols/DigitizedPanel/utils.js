import { toast } from 'react-toastify';

export const scrollToLinkandReference = (index, linkandReference) => {
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
        // NOSONAR
        document
          .evaluate(
            `//*[text()[contains(., '${linkandReference}')]][last()]`,
            document.body,
          )
          .iterateNext()
          .getBoundingClientRect().top,
      );
    } catch (error) {
      toast.error('Error while finding refrence');
    }
  }
};

export const replaceHtmlTags = (sectionHeader) => {
  return sectionHeader.replace(/<[^>]+>/g, '');
};
