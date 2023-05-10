import { toast } from 'react-toastify';
import moment from 'moment-timezone';

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

export const renderAuditInfo = (itemVal, keyName) => {
  if (keyName === 'last_reviewed_date' && itemVal) {
    itemVal = moment(itemVal).isValid()
      ? moment.utc(itemVal).tz('America/New_York').format('DD-MMM-YYYY HH:mm')
      : '-----';
  }
  return itemVal || '-----';
};

export const tablePopup = (e, callback) => {
  const { left, top } = e.currentTarget.getBoundingClientRect();
  const tableEnrichedPopup = document.createElement('div');
  tableEnrichedPopup.className = 'table-enriched-place-holder';
  tableEnrichedPopup.style.position = 'absolute';
  tableEnrichedPopup.style.left = `${left}px`;
  tableEnrichedPopup.style.top = `${top}px`;

  document.body.appendChild(tableEnrichedPopup);

  tableEnrichedPopup.addEventListener('click', (event) => {
    callback(event);
  });
  tableEnrichedPopup.click();
};
