/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Card from 'apollo-react/components/Card';
import Panel from 'apollo-react/components/Panel';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import PanelGroup from 'apollo-react/components/PanelGroup';
import FileDownload from 'js-file-download';
import { toast } from 'react-toastify';
import PDFViewer from './SourcePanel/PdfViewer';
import Digitize from './DigitizedPanel/DigitalizeCard';
import BladeLeft from './BladeLeft/BladeLeft';
import BladeRight from './BladeRight/BladeRight';
import { BASE_URL_8000, httpCall } from '../../../utils/api';

class ProtocolViewWrapper extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.state = {
      popupVisible: false,
      headerDetails: '',
      pageRight: 0,
      pageNo: 0,
      sectionNumber: -1,
      paginationPage: 0,
    };
  }

  componentDidMount() {}

  /* istanbul ignore next */
  handlePageRight = (pageRight) => {
    this.setState({ pageRight });
  };

  /* istanbul ignore next */
  handlePaginationPage = (paginationPage) => {
    this.setState({ paginationPage });
  };

  /* istanbul ignore next */
  handlePageNo = (event, page, sectionNo) => {
    this.setState({ pageNo: page });
    this.setState({ sectionNumber: sectionNo });
  };

  /* istanbul ignore next */
  handleClick() {
    document.addEventListener('click', this.handleOutsideClick, false);
    this.setState({ popupVisible: true });
  }

  /* istanbul ignore next */
  handleOutsideClick(e) {
    if (e.target && this.node && this.node.contains(e.target)) {
      return;
    }
    const { popupVisible } = this.state;
    if (popupVisible) {
      this.hideEle();
    } else {
      this.handleClick();
    }
  }

  /* istanbul ignore next */
  hideEle = () => {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.setState({ popupVisible: false });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  handleDownload = async (e) => {
    e.preventDefault();
    const { data } = this.props;
    const userId1 = data.userId;

    const splitArr = data.documentFilePath.split('\\');
    const fileName = splitArr[splitArr.length - 1];

    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        data.documentFilePath,
      )}&userId=${userId1}&protocol=${data.protocol}`,
      method: 'GET',
      responseType: 'blob',
    };

    const resp = await httpCall(config);
    if (resp.success) {
      FileDownload(resp.data, fileName);
    } else if (resp.message === 'No Access') {
      toast.info('Access Provisioned to Primary Users only');
    } else {
      toast.error('Download Failed');
    }
  };

  render() {
    const { data, refx, sectionRef, summaryData } = this.props;
    const {
      pageNo,
      pageRight,
      sectionNumber,
      headerDetails,
      paginationPage,
      rightValue,
    } = this.state;
    const fileTypeArr = data.fileName.split('.');
    const fileType = fileTypeArr[fileTypeArr.length - 1];
    return (
      <>
        {data?.userPrimaryRoleFlag && (
          <div>
            <BladeLeft handlePageNo={this.handlePageNo} dataSummary={data} />
          </div>
        )}
        <div>
          <BladeRight dataSummary={data} />
        </div>

        <div className="view-wrapper">
          <PanelGroup className="panel_group">
            {data.userPrimaryRoleFlag && (
              <Panel
                width={window.innerWidth / 2}
                minWidth={window.innerWidth / 4}
                maxWidth={window.innerWidth / 1.5}
                hideButton
                resizable
              >
                <Card className="protocol-source-column">
                  <div style={{ display: 'flex' }}>
                    <div className="panel-heading">Source Document</div>
                    {!isEqual(fileType, 'pdf') && (
                      <div style={{ marginTop: '15px' }}>
                        <a href="#" onClick={this.handleDownload}>
                          {data.fileName}
                        </a>
                      </div>
                    )}
                  </div>
                  {summaryData?.success ? (
                    <PDFViewer
                      page={pageNo}
                      refs={refx}
                      pageRight={pageRight}
                      handlePaginationPage={this.handlePaginationPage}
                    />
                  ) : (
                    <div className="digitize-panel-content">
                      <div className="loader">{summaryData?.errorMsg}</div>
                    </div>
                  )}
                </Card>
              </Panel>
            )}
            {data && (
              <Panel
                width="auto"
                minWidth={window.innerWidth / 4}
                maxWidth={window.innerWidth / 1.5}
                resizable
                hideButton
              >
                <Digitize
                  sectionRef={sectionRef}
                  sectionNumber={sectionNumber}
                  headerDetails={headerDetails}
                  handlePageRight={this.handlePageRight}
                  data={data}
                  paginationPage={paginationPage}
                  rightBladeValue={rightValue}
                />
              </Panel>
            )}
          </PanelGroup>
        </div>
      </>
    );
  }
}
export default ProtocolViewWrapper;

ProtocolViewWrapper.propTypes = {
  data: PropTypes.isRequired,
  refx: PropTypes.isRequired,
  sectionRef: PropTypes.isRequired,
  summaryData: PropTypes.isRequired,
};
