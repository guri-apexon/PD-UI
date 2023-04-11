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
      const textDiv = scrollDiv.textContent;
      const indexTxt = textDiv.indexOf(linkandReference);
      if (indexTxt) {
        scrollDiv.scrollBy(0, indexTxt);
      }
    } catch (error) {
      toast.error('Error while finding refrence');
    }
  }
};

export const replaceHtmlTags = (sectionHeader) => {
  return sectionHeader.replace(/<[^>]+>/g, '');
};
