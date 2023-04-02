import Tooltip from 'apollo-react/components/Tooltip';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
  redaction,
} from '../AppConstant/AppConstant';
import PROTOCOL_CONSTANT from '../features/Container/Protocols/CustomComponents/constants';

const replaceall = require('replaceall');

const nextChar = (c) => {
  const i = (parseInt(c, 36) + 1) % 36;
  return (!i * 10 + i).toString(36);
};

const updateFootNotePayload = (data) => {
  const updateFootNoteData = cloneDeep(data);
  if (updateFootNoteData.length > 0) {
    updateFootNoteData.forEach((notes, index) => {
      const indicatorValue =
        index !== 0
          ? nextChar(updateFootNoteData[index - 1].footnote_indicator)
          : 'a';
      updateFootNoteData[index].previous_sequnce_index =
        index === 0 ? null : index - 1;
      updateFootNoteData[index].footnote_indicator = indicatorValue;
      updateFootNoteData[
        index
      ].footnote_text = `${indicatorValue}. ${updateFootNoteData[index].footnote_text}`;
    });
  }

  return updateFootNoteData;
};

const filterTableProperties = (data) => {
  let filterUpdatedData = cloneDeep(data);
  filterUpdatedData = filterUpdatedData.filter((list) => list?.op_type);
  filterUpdatedData.forEach((record) => {
    record.columns = record.columns.filter((op) => op?.op_type);
  });
  return filterUpdatedData;
};

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
      text = replaceall(term, `<b class="enriched-txt">${term}</b>`, text);
    });
  }

  return text;
};

export const createPreferredText = (content, terms) => {
  let text = content;
  if (terms) {
    const arr = Object.keys(terms);
    arr.forEach((term) => {
      text = replaceall(term, `<b class="Preferred-txt">${term}</b>`, content);
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

export const updateContent = (origArray, obj) => {
  const arr = cloneDeep(origArray);
  // eslint-disable-next-line
  arr.forEach((val) => {
    if (val.line_id === obj.lineId) {
      val.content = obj.content;
      val.qc_change_type = obj.type;
      return false;
    }
  });
  return arr;
};

export const tableJSONByRowAndColumnLength = (row, column) => {
  const json = [];
  for (let i = 0; i < row; i++) {
    const rowObj = {};
    rowObj.row_indx = `${i}`.toString();
    rowObj.op_type = '';
    rowObj.roi_id = '';

    let columnObj = [];
    for (let j = 0; j < column; j++) {
      const obj = {
        col_indx: j.toString(),
        op_type: null,
        cell_id: '',
        value: '',
      };
      columnObj = [...columnObj, obj];
    }
    rowObj.columns = columnObj;
    json.push(rowObj);
  }
  return JSON.stringify(json);
};

const setContent = (type) => {
  switch (type) {
    case CONTENT_TYPE.TEXT:
      return 'Edit Your Text Here';
    case CONTENT_TYPE.HEADER:
      return '<h2>Edit Your Text Here</h2>';
    case CONTENT_TYPE.TABLE:
      return {
        Table: '',
        TableProperties: tableJSONByRowAndColumnLength(2, 2),
        SectionHeaderPrintPage: '0',
        TableIndex: '1',
        TableName: '',
        Header: [],
      };
    default:
      return '';
  }
};

export const prepareContent = ({
  sectionContent,
  type,
  currentLineId,
  contentType,
  content,
  level,
  isSaved,
  section,
}) => {
  const clonedSection = cloneDeep(sectionContent);
  let newObj = {};

  switch (type) {
    case 'ADDED':
      if (currentLineId && contentType) {
        const prevIndex =
          clonedSection?.findIndex((val) => val.line_id === currentLineId) || 0;
        const prevObj = clonedSection[prevIndex] || null;
        if (!prevObj) {
          currentLineId = section.line_id;
        }

        const {
          font_info: fontInfo,
          link_id: linkId,
          type,
          file_section_level: fileSectionLevel,
          aidocid,
        } = prevObj;
        newObj = {
          ...PROTOCOL_CONSTANT[contentType],
          uuid: uuidv4(),
          line_id: uuidv4(),
          content: setContent(contentType),
          qc_change_type: QC_CHANGE_TYPE.ADDED,
          prev_line_detail: {
            type,
            link_id: linkId,
            line_id: currentLineId,
            file_section_level: fileSectionLevel,
          },
        };
        if (fontInfo) {
          newObj = {
            ...newObj,
            link_id: fontInfo.link_id,
            aidocid,
            prev_line_detail: {
              ...newObj.prev_line_detail,
              link_id: fontInfo.link_id,
              link_id_level2: fontInfo.link_id_level2,
              link_id_level3: fontInfo.link_id_level3,
              link_id_level4: fontInfo.link_id_level4,
              link_id_level5: fontInfo.link_id_level5,
              link_id_level6: fontInfo.link_id_level6,
              link_id_subsection1: fontInfo.link_id_subsection1,
              link_id_subsection2: fontInfo.link_id_subsection2,
              link_id_subsection3: fontInfo.link_id_subsection3,
            },
          };
        }
        clonedSection?.splice(prevIndex + 1, 0, newObj);
        return clonedSection;
      }
      break;
    case 'MODIFY':
      if (clonedSection && currentLineId) {
        return clonedSection.map((x) => {
          if (x.line_id === currentLineId) {
            x.content = content;
            if (x.qc_change_type !== QC_CHANGE_TYPE.ADDED) {
              x.qc_change_type = QC_CHANGE_TYPE.UPDATED;
            }
            if (x.type === CONTENT_TYPE.TABLE) {
              x.isSaved = isSaved;
            }
          }
          return x;
        });
      }
      break;
    case 'DELETE':
      if (clonedSection && currentLineId) {
        return clonedSection.map((x) =>
          x.line_id === currentLineId
            ? { ...x, qc_change_type: QC_CHANGE_TYPE.DELETED }
            : x,
        );
      }
      break;
    case 'LINK_LEVEL_UPDATE':
      if (clonedSection && currentLineId && level) {
        return clonedSection.map((x) => {
          if (x.line_id === currentLineId) {
            if (contentType) x.type = contentType;
            if (x.type === CONTENT_TYPE.HEADER) {
              x.linkLevel = level;
            }
          }
          return x;
        });
      }
      break;
    default:
      return clonedSection;
  }
  return null;
};

export const markContentForDelete = (origArray, lineId) => {
  const arr = cloneDeep(origArray);
  const i = arr.findIndex((val) => val.line_id === lineId);
  arr[i].qc_change_type = 'delete';
  return arr;
};

export const isPrimaryUser = (protMetaData) => {
  return protMetaData?.redactProfile === 'profile_1';
};
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => {
      return reject(error);
    };
  });

export const createReturnObj = (obj, linkId) => {
  if (obj.type === CONTENT_TYPE.TEXT) {
    if (obj.qc_change_type === QC_CHANGE_TYPE.ADDED) {
      return {
        type: obj.type,
        content: obj.content,
        qc_change_type: obj.qc_change_type,
        link_id: linkId,
        prev_detail: {
          line_id: obj?.prev_line_detail?.line_id?.slice(0, 36),
        },
      };
    }
    if (obj.qc_change_type === QC_CHANGE_TYPE.UPDATED) {
      return {
        type: obj.type,
        content: obj.content,
        link_id: linkId,
        qc_change_type:
          obj.content === '' ? QC_CHANGE_TYPE.DELETED : obj.qc_change_type,
        line_id: obj.line_id?.slice(0, 36),
      };
    }
    return {
      type: obj.type,
      content: obj.content,
      link_id: linkId,
      qc_change_type: obj.qc_change_type,
      line_id: obj.line_id?.slice(0, 36),
    };
  }
  if (obj.type === CONTENT_TYPE.HEADER) {
    if (obj.qc_change_type === QC_CHANGE_TYPE.ADDED) {
      return {
        type: obj.type,
        qc_change_type: obj.qc_change_type,
        link_prefix: '',
        link_text: obj.content,
        link_level: obj?.linkLevel?.toString() || '',
        line_id: '',
        content: obj.content,
        uuid: '',
        prev_detail: {
          line_id: obj?.prev_line_detail?.line_id?.slice(0, 36),
          link_id: linkId,
          link_id_level2: '',
          link_id_level3: '',
          link_id_level4: '',
          link_id_level5: '',
          link_id_level6: '',
          link_id_subsection1: '',
          link_id_subsection2: '',
          link_id_subsection3: '',
          link_level: obj?.prev_line_detail?.file_section_level,
        },
        section_locked: false,
      };
    }
    if (obj.qc_change_type === QC_CHANGE_TYPE.UPDATED) {
      return {
        type: obj.type,
        qc_change_type: obj.qc_change_type,
        link_prefix: '',
        link_text: obj.content,
        content: obj.content,
        link_id: linkId,
        link_level: obj.linkLevel,
        line_id: obj.line_id?.slice(0, 36),
        link_id_level2: '',
        section_locked: false,
      };
    }
    return {
      type: obj.type,
      link_level: obj.file_section_level,
      qc_change_type: obj.qc_change_type,
      link_id: linkId,
      link_id_level2: '',
      line_id: obj.line_id?.slice(0, 36),
      section_locked: false,
    };
  }
  if (obj.type === CONTENT_TYPE.IMAGE) {
    if (obj.qc_change_type === QC_CHANGE_TYPE.ADDED) {
      return {
        type: obj.type,
        content: obj.content,
        qc_change_type: obj.qc_change_type,
        link_id: linkId,
        prev_detail: {
          line_id: obj?.prev_line_detail?.line_id?.slice(0, 36),
        },
      };
    }
    return {
      type: obj.type,
      content: obj.content,
      link_id: linkId,
      qc_change_type: obj.qc_change_type,
      line_id: obj.line_id?.slice(0, 36),
    };
  }
  if (obj.type === CONTENT_TYPE.TABLE) {
    if (obj.qc_change_type === QC_CHANGE_TYPE.ADDED) {
      return {
        type: obj.type,
        table_roi_id: '',
        content: {
          ...obj.content,
          AttachmentListProperties: updateFootNotePayload(
            obj?.content?.AttachmentListProperties,
          ),
        },
        qc_change_type: obj.qc_change_type,
        prev_detail: {
          line_id: obj?.prev_line_detail?.line_id?.slice(0, 36),
        },
        uuid: obj?.uuid,
        line_id: obj?.line_id,
      };
    }
    if (obj.qc_change_type === QC_CHANGE_TYPE.UPDATED) {
      return {
        ...obj,
        content: {
          ...obj.content,
          TableProperties: filterTableProperties(obj?.content?.TableProperties),
          AttachmentListProperties: updateFootNotePayload(
            obj?.content?.AttachmentListProperties,
          ),
        },
      };
    }
    return {
      type: obj.type,
      content: obj.content,
      link_id: linkId,
      qc_change_type: obj.qc_change_type,
      line_id: obj.line_id?.slice(0, 36),
    };
  }
  return obj;
};

export const getSaveSectionPayload = (sectionContent, linkId) => {
  const req = [...sectionContent]
    .filter((x) => x.qc_change_type !== '')
    .map((obj) => createReturnObj(obj, linkId));
  return req;
};

export const getKeyFromEnrichText = (term) => {
  if (term === 'preferred_term') return 'iqv_standard_term';
  if (term === 'medical_term') return 'clinical_terms';
  if (term === 'ontology') return 'ontology';
  return '';
};
