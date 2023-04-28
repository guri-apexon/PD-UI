import { toast } from 'react-toastify';
import moment from 'moment';

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

const beforeUnLoad = (e, cb) => {
  e.preventDefault();
  cb(true);
};

export const onBeforeUnload = (updateSectionLock) => {
  document.addEventListener('beforeunload', (e) =>
    beforeUnLoad(e, updateSectionLock),
  );
  return () => {
    document.removeEventListener('beforeunload', beforeUnLoad);
  };
};

export const renderAuditInfo = (item, names) => {
  const itemVal = item?.audit_info[names.keyName] || '-----';

  // eslint-disable-next-line
  return names?.keyName === 'last_reviewed_date'
    ? moment(itemVal, 'DD-MM-YYYY h:m:s A')
        .local()
        .format('DD-MMM-YYYY HH:mm A')
    : itemVal;
};
