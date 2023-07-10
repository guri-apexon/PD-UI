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
import Globe from 'apollo-react-icons/Globe';
import MenuButton from 'apollo-react/components/MenuButton';
import Tooltip from 'apollo-react/components/Tooltip';
import InfoIcon from 'apollo-react-icons/Info';
import IconButton from 'apollo-react/components/IconButton';
import Download from 'apollo-react-icons/Download';
import Modal from 'apollo-react/components/Modal/Modal';
import { messages } from '../../../AppConstant/AppConstant';
import { userId } from '../../../store/userDetails';
import { httpCall, BASE_URL_8000 } from '../../../utils/api';
import { protocolSummary, associateDocs } from './protocolSlice';
import AssociateDocumentsTable from '../../Components/DocumentsTable/AssociateDocumentsTable';
import DocumentsTable from '../../Components/DocumentsTable/DocumentsTable';
import CompareView from './CompareView/CompareView';
import { isPrimaryUser } from '../../../utils/utilFunction';

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
  const [isModal, setIsModal] = useState(false);
  const [identifier, setIdentifier] = useState();

  const getUserName = async (userID) => {
    const config = {
      url: `${BASE_URL_8000}/api/user/read_all_users?userId=${userID}`,
      method: 'GET',
    };
    const userDetailResp = await httpCall(config);
    if (userDetailResp?.success) {
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
    const len = arr.body.length;
    return (
      <div>
        <ol className="version-validation ">
          {arr.body.map((item) => (
            <li
              key={uuidv4()}
              className={
                len === 1
                  ? 'compare-text-header view-browser'
                  : 'compare-text-header'
              }
            >
              <p className={len === 1 && 'view-browser-header'}>
                {item.header}
              </p>
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
    } else if (type === 'BROWSER') {
      setToolTipSelected(messages.compareViaUIContent);
    } else {
      setToolTipSelected(messages.downloadFileContentExcel);
    }
    setToolTip1(true);
  };
  /* istanbul ignore next */
  const closeToolTip = () => {
    setToolTip1(false);
  };

  function blobToFormData(sourceBlob, targetBlob) {
    const formData = new FormData();
    formData.append('left.file', sourceBlob, 'filename.pdf');
    formData.append('left.file_type', 'pdf');
    formData.append('right.file', targetBlob, 'filename.pdf');
    formData.append('right.file_type', 'pdf');
    return formData;
  }

  const fileDownload = async (protocolData) => {
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        protocolData?.documentFilePath,
      )}&userId=${userId1.substring(1)}&protocol=${protocolData?.protocol}`,
      method: 'GET',
      responseType: 'blob',
    };
    const response = await httpCall(config);
    return response;
  };
  const handleCompareView = async () => {
    setLoader(true);
    const sourceProtocol = associateDocuments.find(
      (x) => x.id === protocolSelected.source,
    );
    const targetProtocol = associateDocuments.find(
      (x) => x.id === protocolSelected.target,
    );
    const [respsource, respTarget] = await Promise.all([
      fileDownload(sourceProtocol),
      fileDownload(targetProtocol),
    ]);
    if (respsource?.success && respTarget?.success) {
      const config = {
        method: 'POST',
        headers: {
          Authorization: `Token ${process.env.REACT_APP_DRAFTABLE_TOKEN} `,
        },
        body: blobToFormData(respsource.data, respTarget.data),
      };
      fetch('https://api.draftable.com/v1/comparisons', config)
        .then((response) => response.json())
        .then((data) => {
          setLoader(false);
          setIdentifier(data?.identifier);
          setIsModal(true);
        });
    } else {
      toast.info('Access Provisioned to Primary Users only');
      setLoader(false);
    }
  };

  const menuItems = [
    {
      key: 'CSV',
      text: (
        <div className="dropdown-text-style" data-testid="csv">
          <Download className="icon" />
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
                data-testid="csv-toolip"
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
        <div
          className="dropdown-text-style"
          ref={tooltip2Ref}
          data-testid="excel"
        >
          <Download className="icon" />
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
                data-testid="excel-toolip"
              >
                <InfoIcon size="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
      onClick: () => downloadCompare('.xlsx'),
    },
    {
      key: 'BROWSER',
      disabled: !isPrimaryUser(summary.data),
      text: (
        <div
          className="dropdown-text-style"
          ref={tooltip2Ref}
          data-testid="browser-view"
        >
          <Globe className="icon" />
          <div>View in Browser</div>
          <div className="info-icon">
            <Tooltip
              variant="light"
              title="Please click here to see the detail."
              placement="top"
            >
              <IconButton
                color="primary"
                onClick={(e) => openToolTip(e, 'BROWSER')}
                size="small"
                data-testid="browser-view-toolip"
              >
                <InfoIcon size="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ),
      onClick: () => handleCompareView(),
    },
  ];
  const downloadButton = () => {
    return <label className="compare-main-button">Compare Result</label>;
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
                className="compare-menu"
                id="compareMenu"
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
      {isModal && (
        <CompareView
          isModal={isModal}
          setIsModal={setIsModal}
          identifier={identifier}
        />
      )}
    </div>
  );
}

export default Documents;
Documents.propTypes = {
  handleChangeTab: PropTypes.isRequired,
};
