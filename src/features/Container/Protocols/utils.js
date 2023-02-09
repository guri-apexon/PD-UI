import FileDownload from 'js-file-download';
import { toast } from 'react-toastify';
import { httpCall, BASE_URL_8000 } from '../../../utils/api';

// eslint-disable-next-line import/prefer-default-export
export const setProtocolToDownloadUtilsFun = (
  protocolSelected,
  data,
  setProtocolSelected,
  setCompareMessage,
  message1,
  message2,
) => {
  if (protocolSelected.source) {
    if (protocolSelected.source === data.id) {
      const obj = {
        source: '',
        target: '',
        sourceData: '',
        targetData: '',
      };
      setProtocolSelected(obj);
      setCompareMessage(message1);
    } else if (protocolSelected.target === data.id) {
      const obj = {
        source: protocolSelected.source,
        target: '',
        sourceData: protocolSelected.sourceData,
        targetData: '',
      };
      setProtocolSelected(obj);
      setCompareMessage(message2);
    } else {
      const obj = {
        source: protocolSelected.source,
        target: data.id,
        sourceData: protocolSelected.sourceData,
        targetData: data,
      };
      setProtocolSelected(obj);
      setCompareMessage('');
    }
  } else {
    const obj = {
      source: data.id,
      target: '',
      sourceData: data,
      targetData: '',
    };
    setProtocolSelected(obj);
    // eslint-disable-next-line no-undef
    setCompareMessage(message2);
  }
};

/* istanbul ignore next */
export const downloadCompareUtilsFun = async (
  type,
  setLoader,
  protocolSelected,
  userId1,
  summary,
  setProtocolSelected,
) => {
  try {
    setLoader(true);
    const config = {
      url: `${BASE_URL_8000}/api/document_compare/?id1=${
        protocolSelected.source
      }&id2=${protocolSelected.target}&userId=${userId1.substring(
        1,
      )}&protocol=${summary.data.protocol}&file_type=${type}`,
      method: 'GET',
      responseType: 'blob',
    };
    const resp = await httpCall(config);
    if (resp.message === 'Success') {
      FileDownload(
        resp.data,
        `${protocolSelected.source}_${protocolSelected.target}.compare_detail${type}`,
      );
      setLoader(false);
    } else if (resp.message === 'No-Content') {
      toast.info('No difference found for this compare');
      setLoader(false);
    } else if (resp.message === 'Not-Found') {
      toast.error('Compare is not available for selected documents.');
      setLoader(false);
    }
    setProtocolSelected([]);
  } catch (e) {
    setLoader(false);
    /* istanbul ignore next */
    if (e.response && e.response.data) {
      toast.error(e.response.data.detail);
    } else {
      toast.error('Data fetching failed. Please try again.');
    }
  }
};
export const payloadsectionContent = (subSections, listData) => {
  /* istanbul ignore else */
  if (subSections.TOC && subSections.TOC.length) {
    listData.push({
      section: 'Table of Contents',
      id: 'TOC',
      subSections: true,
    });
  }
};
export const sectionpayloaddata = (subSections, listData) => {
  if (subSections.SOA && subSections.SOA.length) {
    listData.push({
      section: 'Schedule of Assessments',
      id: 'SOA',
      subSections: true,
    });
  }
};
export const sectionloaddata = (viewData, listData) => {
  if (viewData.iqvdataSummary) {
    listData.push({ section: 'Summary', id: 'SUM', subSections: false });
  }
};
