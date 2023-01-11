import React from 'react';
import Card from 'apollo-react/components/Card';
import Panel from 'apollo-react/components/Panel';
import PropTypes from 'prop-types';

import PanelGroup from 'apollo-react/components/PanelGroup';
import Pdf from './SourcePDFPanel/pdfviewer';
import Digitize from './DigitizedPanel/DigitalizeCard';
import BladeLeft from './BladeLeft/BladeLeft';

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
    // ignore clicks on the component itself
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
    const { data, refx, sectionRef } = this.props;
    const {
      // subSectionData,
      pageNo,
      pageRight,
      sectionNumber,
      headerDetails,
      paginationPage,
    } = this.state;

    return (
      <>
        <div>
          <BladeLeft handlePageNo={this.handlePageNo} dataSummary={data} />
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

                  <Pdf
                    page={pageNo}
                    refs={refx}
                    pageRight={pageRight}
                    handlePaginationPage={this.handlePaginationPage}
                  />
                </Card>
              </Panel>
            )}
            <Panel width="auto" hideButton>
              <Digitize
                sectionRef={sectionRef}
                sectionNumber={sectionNumber}
                headerDetails={headerDetails}
                handlePageRight={this.handlePageRight}
                data={data}
                paginationPage={paginationPage}
              />
            </Panel>
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
};
