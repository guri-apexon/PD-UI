import React from 'react';
import Card from 'apollo-react/components/Card';
import PanelGroup from 'apollo-react/components/PanelGroup';
import Panel from 'apollo-react/components/Panel';
import PropTypes from 'prop-types';
import PDFViewer from './SourcePanel/PdfViewer';
import Digitize from './DigitizedPanel/DigitalizeCard';
import BladeLeft from './BladeLeft/BladeLeft';
import BladeRight from './BladeRight/BladeRight';
import { PROTOCOL_RIGHT_MENU } from './Constant/Constants';

class ProtocolViewWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

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

  render() {
    const {
      data,
      refx,
      sectionRef,
      summaryData,
      globalPreferredTerm,
      setGlobalPreferredTerm,
    } = this.props;
    const {
      pageNo,
      pageRight,
      sectionNumber,
      headerDetails,
      paginationPage,
      rightValue,
    } = this.state;

    return (
      <>
        {data?.userPrimaryRoleFlag &&
          // eslint-disable-next-line
          pageRight != PROTOCOL_RIGHT_MENU.SCHEDULE_OF_ACTIVITIES && (
            <div>
              <BladeLeft handlePageNo={this.handlePageNo} dataSummary={data} />
            </div>
          )}
        <div>
          <BladeRight
            dataSummary={data}
            globalPreferredTerm={globalPreferredTerm}
            setGlobalPreferredTerm={setGlobalPreferredTerm}
          />
        </div>

        <div className="view-wrapper">
          <PanelGroup className="panel_group">
            {data?.userPrimaryRoleFlag &&
              // eslint-disable-next-line
              pageRight != PROTOCOL_RIGHT_MENU.SCHEDULE_OF_ACTIVITIES && (
                <Panel
                  width={window.innerWidth / 2}
                  minWidth={window.innerWidth / 4}
                  maxWidth={window.innerWidth / 1.5}
                  hideButton
                  resizable
                >
                  <Card className="protocol-source-column">
                    <div className="panel-heading">Source Document</div>
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
              <Panel width="auto" resizable hideButton>
                <Digitize
                  sectionRef={sectionRef}
                  sectionNumber={sectionNumber}
                  headerDetails={headerDetails}
                  handlePageRight={this.handlePageRight}
                  data={data}
                  paginationPage={paginationPage}
                  rightBladeValue={rightValue}
                  globalPreferredTerm={globalPreferredTerm}
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
  globalPreferredTerm: PropTypes.isRequired,
  setGlobalPreferredTerm: PropTypes.isRequired,
};
