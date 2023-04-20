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
      const elements = Array.from(
        scrollDiv.querySelectorAll('.single-segment'),
      );

      const match = elements.find((el) => {
        return el.textContent
          .toLowerCase()
          .includes(linkandReference.toLowerCase());
      });
      if (match) {
        match.scrollIntoView();
      } else {
        toast.error('Error while finding refrence');
      }
    } catch (error) {
      toast.error('Error while finding refrence');
    }
  }
};

export const replaceHtmlTags = (sectionHeader) => {
  return sectionHeader.replace(/<[^>]+>/g, '');
};
