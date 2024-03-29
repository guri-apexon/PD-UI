import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Grid from 'apollo-react/components/Grid';
import './Documents.scss';
import { toast } from 'react-toastify';
import Loader from 'apollo-react/components/Loader';
import FileDownload from 'js-file-download';
import cloneDeep from 'lodash/cloneDeep';
import MenuButton from 'apollo-react/components/MenuButton';
import Tooltip from 'apollo-react/components/Tooltip';
import InfoIcon from 'apollo-react-icons/Info';
import IconButton from 'apollo-react/components/IconButton';
import Download from 'apollo-react-icons/Download';
import Modal from 'apollo-react/components/Modal';
import { messages } from '../../../AppConstant/AppConstant';
import { userId } from '../../../store/userDetails';
import { httpCall, BASE_URL_8000 } from '../../../utils/api';
import { protocolSummary, associateDocs } from './protocolSlice';
import AssociateDocumentsTable from '../../Components/DocumentsTable/AssociateDocumentsTable';
import DocumentsTable from '../../Components/DocumentsTable/DocumentsTable';

const message1 = 'Please Select Base Document for Compare';
const message2 = 'Please Select Comparator Document for Compare';
function Documents({ handleChangeTab }) {
  const summary = useSelector(protocolSummary);
  const userId1 = useSelector(userId);
  const associateDocuments = useSelector(associateDocs);
  const [protocolSelected, setProtocolSelected] = useState({
    source: '',
    target: '',
    sourceData: '',
    targetData: '',
  });
  const [compareMessage, setCompareMessage] = useState(message1);
  const [loader, setLoader] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  const [userName, setUserName] = useState('');
  const [tooltip1, setToolTip1] = useState(false);
  const [tooltipSelected, setToolTipSelected] = useState(
    messages.downloadFileContentCSV,
  );
  const tooltip1Ref = useRef(null);
  const tooltip2Ref = useRef(null);

  const getUserName = async (userID) => {
    const config = {
      url: `${BASE_URL_8000}/api/user/read_all_users?userId=${userID}`,
      method: 'GET',
    };
    const userDetailResp = await httpCall(config);
    if (userDetailResp.success) {
      const userName = `${userDetailResp.data.first_name} ${userDetailResp.data.last_name}`;
      setUserName(userName);
    } else {
      setUserName('');
    }
  };
  /* eslint-disable */
  useEffect(() => {
    const newObj = cloneDeep(summary.data);
    newObj.userName = userName;
    setSummaryData(newObj);
  }, [userName]);
  /* eslint-enable */
  useEffect(() => {
    if (summary.success && summary.data.userId) {
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(parseInt(summary.data.userId, 10))) {
        const newObj = cloneDeep(summary.data);
        newObj.userName = '-';
        setSummaryData(newObj);
      } else {
        getUserName(summary.data.userId);
      }
    }
  }, [summary]);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        tooltip1Ref.current &&
        !tooltip1Ref.current.contains(event.target) &&
        tooltip2Ref.current &&
        !tooltip2Ref.current.contains(event.target)
      ) {
        setToolTip1(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltip1Ref, tooltip2Ref]);

  const setProtocolToDownload = (data) => {
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
      setCompareMessage(message2);
    }
  };
  /* istanbul ignore next */
  const downloadCompare = async (type) => {
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
  const fileContent = (arr) => {
    return (
      <div>
        <ol className="version-validation">
          {arr.body.map((item) => (
            <li key={uuidv4()} className="compare-text-header">
              {item.header}
              <ul>
                {item.body.map((subHeader) => (
                  <li className="compare-text-sub-header" key={uuidv4()}>
                    {subHeader}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );
  };
  /* istanbul ignore next */
  const openToolTip = (e, type) => {
    e.stopPropagation();
    if (type === 'csv') {
      setToolTipSelected(messages.downloadFileContentCSV);
    } else {
      setToolTipSelected(messages.downloadFileContentExcel);
    }
    setToolTip1(true);
  };
  /* istanbul ignore next */
  const closeToolTip = () => {
    setToolTip1(false);
  };

  const menuItems = [
    {
      key: 'CSV',
      text: (
        <div className="dropdown-text-style">
          <div>CSV</div>
          <div className="info-icon">
            <Tooltip
              variant="light"
              title="Please click here to see the detail."
              placement="top"
            >
              <IconButton
                color="primary"
                onClick={(e) => openToolTip(e, 'csv')}
                size="small"
              >
                <InfoIcon size="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
      onClick: () => downloadCompare('.csv'),
    },
    {
      key: 'EXCEL',
      text: (
        <div className="dropdown-text-style" ref={tooltip2Ref}>
          <div>Excel</div>
          <div className="info-icon">
            <Tooltip
              variant="light"
              title="Please click here to see the detail."
              placement="top"
            >
              <IconButton
                color="primary"
                onClick={(e) => openToolTip(e, 'excel')}
                size="small"
              >
                <InfoIcon size="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
      onClick: () => downloadCompare('.xlsx'),
    },
  ];
  const downloadButton = () => {
    return (
      <label className="compare-main-button">
        Compare Result
        <Download />
      </label>
    );
  };

  return (
    <div className="document-tab">
      {loader && <Loader />}
      <Modal
        open={tooltip1}
        onClose={() => closeToolTip()}
        title={tooltipSelected.header}
        // eslint-disable-next-line react/no-children-prop
        children={fileContent(tooltipSelected)}
        buttonProps={[{ label: 'Okay' }]}
        id="neutral"
        hideButtons
        className="modal-csv-excel-detail"
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className="source-document-tab"
            data-testid="source-document-tab"
          >
            {'userName' in summaryData && summaryData.userName && (
              <DocumentsTable initialsRow={[summaryData]} />
            )}
          </div>
        </Grid>
        {associateDocuments && associateDocuments.length > 1 && (
          <>
            <div className="compare-info">
              {protocolSelected.source && protocolSelected.target === '' && (
                <div className="compare-Detail">
                  <label>Baseline Document :</label>
                  <span>{`${protocolSelected.sourceData.protocol} (${protocolSelected.sourceData.documentStatus} ${protocolSelected.sourceData.versionNumber})`}</span>
                </div>
              )}
              {protocolSelected.source && protocolSelected.target && (
                <div className="compare-container">
                  <div className="compare-Detail">
                    <label>Baseline Document :</label>
                    <span>{`${protocolSelected.sourceData.protocol} (${protocolSelected.sourceData.documentStatus} ${protocolSelected.sourceData.versionNumber})`}</span>
                  </div>
                  <div className="compare-Detail">
                    <label>Comparator Document :</label>
                    <span>{`${protocolSelected.targetData.protocol} (${protocolSelected.targetData.documentStatus} ${protocolSelected.targetData.versionNumber})`}</span>
                  </div>
                </div>
              )}
              <span className="compare-message">{compareMessage}</span>
            </div>
            <div className="compare-buttons">
              <MenuButton
                buttonText={downloadButton()}
                menuItems={menuItems}
                disabled={!(protocolSelected.source && protocolSelected.target)}
              />
            </div>
          </>
        )}
        <Grid item xs={12}>
          <div className="associate-document-tab">
            <AssociateDocumentsTable
              handleChangeTab={handleChangeTab}
              protocolSelected={protocolSelected}
              setProtocolToDownload={setProtocolToDownload}
              //  initialsRow={protocolData && protocolData}
              initialsRow={associateDocuments}
              showCheckbox={
                !!(associateDocuments && associateDocuments.length > 1)
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Documents;
Documents.propTypes = {
  handleChangeTab: PropTypes.isRequired,
};
