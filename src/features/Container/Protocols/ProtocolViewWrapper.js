import React from 'react';
import Card from 'apollo-react/components/Card';
import Panel from 'apollo-react/components/Panel';
import PropTypes from 'prop-types';

import PanelGroup from 'apollo-react/components/PanelGroup';
import Pdf from './SourcePDFPanel/pdfviewer';
import Digitize from './DigitizedPanel/DigitalizeCard';
import BladeLeft from './BladeLeft/BladeLeft';
import BladeRight from './BladeRight/BladeRight';

class ProtocolViewWrapper extends React.Component {
  constructor() {
    super();
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

  handlePaginationPage = (paginationPage) => {
    this.setState({ paginationPage });
  };

  handlePageNo = (event, page, sectionNo) => {
    this.setState({ pageNo: page });
    this.setState({ sectionNumber: sectionNo });
  };

  handleClick() {
    document.addEventListener('click', this.handleOutsideClick, false);
    this.setState({ popupVisible: true });
  }

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

  hideEle = () => {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.setState({ popupVisible: false });
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

    return (
      <>
        {data.userPrimaryRoleFlag && (
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
                  <div className="panel-heading">Source Document</div>
                  {summaryData?.success ? (
                    <Pdf
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
              <Panel width={window.innerWidth / 2} hideButton>
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
