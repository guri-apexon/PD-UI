import Tooltip from 'apollo-react/components/Tooltip';
import { redaction } from '../AppConstant/AppConstant';

const replaceall = require('replaceall');

export const covertMMDDYYYY = (date) => {
  const onlyDate = date.split('T')[0];
  const dateFormat = new Date(onlyDate);
  return dateFormat
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, '-');
};

export const convertDatesFormat = (format, seperator, date) => {
  const newDate = new Date(date);
  let dd = newDate.getDate();

  let mm = newDate.getMonth() + 1;
  const yyyy = newDate.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  switch (format) {
    case 'mmddyyyy':
      return `${mm}${seperator}${dd}${seperator}${yyyy}`;
    case 'ddmmyyyy':
      return `${mm}${seperator}${dd}${seperator}${yyyy}`;
    default:
      return newDate;
  }
};

export const formatESDate = (dateString) => {
  if (dateString && dateString !== undefined) {
    if (dateString.length > 7) {
      const str = dateString;
      const year = str.substring(0, 4);
      const month = str.substring(4, 6);
      const day = str.substring(6, 8);
      const hour = str.substring(8, 10);
      const minute = str.substring(10, 12);
      const second = str.substring(12, 14);
      const date = new Date(year, month - 1, day, hour, minute, second);
      return date
        .toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, '-');
    }
    if (dateString.length === 4) {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(dateString)) {
        return '-';
      }
      return '-';
    }
    return '-';
  }
  return '-';
};

export const localISOTime = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  return localISOTime;
};

export const iconStatus = (status, qcStatus) => {
  if (qcStatus === 'QC1' || qcStatus === 'QC2' || qcStatus === 'FEEDBACK_RUN') {
    return 'Digitization Complete';
  }
  switch (status) {
    case 'DIGITIZER1_STARTED':
    case 'DIGITIZER2_STARTED':
    case 'DIGITIZER1_COMPLETED':
    case 'DIGITIZER2_COMPLETED':
    case 'DIGITIZER2_OMOPUPDATE_STARTED':
    case 'DIGITIZER2_OMOPUPDATE_COMPLETED':
    case 'I2E_OMOP_UPDATE_STARTED':
    case 'I2E_OMOP_UPDATE_COMPLETED':
      return 'Digitization In Progress';
    case 'TRIAGE_STARTED':
    case 'TRIAGE_COMPLETED':
      return 'Upload Complete';
    case 'EXTRACTION_STARTED':
    case 'EXTRACTION_COMPLETED':
    case 'FINALIZATION_STARTED':
    case 'FINALIZATION_COMPLETED':
      return 'Extraction In Progress';
    case 'PROCESS_COMPLETED':
      return 'Digitization Complete';
    case 'ERROR':
      return 'Digitization Error';
    case 'COMPARISON_STARTED':
    case 'COMPARISON_COMPLETED':
      return 'Comparison In Progress';
    case 'QC1':
    case 'QC2':
      return 'QC Review';
    default:
      return 'Digitization Error';
  }
};

export const qcIconStatus = (status, pdStatus) => {
  if (
    (status === 'QC1' || status === 'QC2' || status === 'FEEDBACK_RUN') &&
    pdStatus === 'ERROR'
  ) {
    return 'ERROR';
  }
  switch (status) {
    case 'QC_NOT_STARTED':
      return 'QC Not Started';
    case 'QC1':
    case 'QC2':
    case 'FEEDBACK_RUN':
      return 'QC In Progress';
    case 'QC_COMPLETED':
      return 'QC Completed';
    default:
      return 'ERROR';
  }
};

export const createFullMarkup = (str) => {
  if (str) {
    return {
      __html: replaceall(
        redaction.text,
        `<span class="blur">${redaction.text}</span>`,
        str,
      ),
    };
  }
  return {
    __html: str,
  };
};

export const createEnrichedText = (content, terms) => {
  let text = content;
  if (terms) {
    const arr = Object.keys(terms);
    arr.forEach((term) => {
      text = replaceall(term, `<b class="enriched-txt">${term}</b>`, content);
    });
  }

  return text;
};

export const handleProtocolTitle = (value, testID) => {
  return (
    <Tooltip
      variant="light"
      title="Protocol Title"
      // eslint-disable-next-line react/no-danger
      subtitle={<div dangerouslySetInnerHTML={createFullMarkup(value)} />}
      placement="top"
    >
      <span data-testid={testID}>
        <span
          className="adjust-ellipses"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={createFullMarkup(value)}
        />
      </span>
    </Tooltip>
  );
};
export const uploadDateValidation = (uploadDate) => {
  const baseDate = new Date(process.env.REACT_APP_DATE_BEFORE);
  const compareDate = new Date(uploadDate);
  if (compareDate > baseDate) {
    return true;
  }
  return false;
};
