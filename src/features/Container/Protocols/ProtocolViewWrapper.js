import React from 'react';
import Card from 'apollo-react/components/Card';
import Panel from 'apollo-react/components/Panel';
import PanelGroup from 'apollo-react/components/PanelGroup';
import { redaction } from '../../../AppConstant/AppConstant';
import Pdf from './SourcePDFPanel/pdfviewer';
import Digitize from './DigitizedPanel/DigitalizeCard';
import BladeLeft from './BladeLeft/BladeLeft';

const replaceall = require('replaceall');

class ProtocolViewWrapper extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      popupVisible: false,
      subSectionData: [],
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

  handleClick(id) {
    document.addEventListener('click', this.handleOutsideClick, false);
    let subData = [];
    const {
      // eslint-disable-next-line react/prop-types
      data: { TOC, SOA },
    } = this.props;
    switch (id) {
      case 'TOC':
        subData = TOC;
        break;
      case 'SOA':
        subData = SOA;
        break;
      default:
        break;
    }
    this.setState({ popupVisible: true, subSectionData: subData });
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
    this.setState({ popupVisible: false, subSectionData: [] });
  };

  /* eslint-disable */
  createFullMarkup(str) {
    if (str || str !== undefined) {
      if (str.includes(redaction.text)) {
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
    }
    return {
      __html: '<div></div>',
    };
  }
  /* eslint-enable */

  render() {
    /* eslint-disable */
    const { data, refx, sectionRef } = this.props;
    const {
      subSectionData,
      pageNo,
      pageRight,
      sectionNumber,
      headerDetails,
      paginationPage,
    } = this.state;
    const refs = subSectionData.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
    this.refs = refs;
    /* eslint-enable */

    return (
      <>
        <div>
          <BladeLeft handlePageNo={this.handlePageNo} dataSummary={data} />
        </div>
        <div className="view-wrapper">
          <PanelGroup className="panel_group">
            {
              /* eslint-disable react/prop-types */
              data.userPrimaryRoleFlag && (
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
              )
            }
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
