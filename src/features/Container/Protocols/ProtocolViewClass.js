/* eslint-disable */
import React from 'react';
import Card from 'apollo-react/components/Card';
import ChevronRight from 'apollo-react-icons/ChevronRight';
import Loader from '../../Components/Loader/Loader';
import { redaction } from '../../../AppConstant/AppConstant';
import Pdf from '../Protocols/pdfviewer';
import Digitize from './DigitalizeCard';

import Accordion from 'apollo-react/components/Accordion';
import Records from './records.json';
import AccordionDetails from 'apollo-react/components/AccordionDetails';

import AccordionSummary from 'apollo-react/components/AccordionSummary';

import Typography from 'apollo-react/components/Typography';
import Drag from 'apollo-react-icons/Drag';
import Panel from 'apollo-react/components/Panel';
import PanelGroup from 'apollo-react/components/PanelGroup';
import BladeLeft from './BladeLeft';

// import Digitize from './DigitizeCard';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
// import { headerList } from '../../../store/Digitized/actions';
const replaceall = require('replaceall');
class ProtocolViewClass extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      popupVisible: false,
      subSectionData: [],
      section: null,
      activeSection: null,
      activeSubSection: null,
      headerDetails: '',
      pageRight: 1,
      pageNo: 1,
      sectionNumber: undefined,
    };
  }

  handlePageRight = (pageRight) => {
    this.setState({ pageRight: pageRight });
  };

  handlePageNo = (event, page, sectionNo) => {
    this.setState({ pageNo: page });
    this.setState({ sectionNumber: sectionNo });
  };

  componentDidMount() {
  }

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
  getTable(item, unq, noHeader = false) {
    const footNote = [];
    for (const [key, value] of Object.entries(item)) {
      const note = key.split('_')[0];
      if (note === 'FootnoteText') {
        footNote.push(value);
      }
    }
    return (
      <>
        <div style={{}}>
          {!noHeader ? (
            <h2
              style={{
                // paddingTop: "20px",
                fontSize: '16px',
                marginBottom: '20px',
              }}
              dangerouslySetInnerHTML={this.createFullMarkup(item.TableName)}
            >
              {/* {item.TableName} */}
            </h2>
          ) : null}
        </div>
        <div
          id={`${unq}-${item.TableIndex}`}
          key={`${unq}-${item.TableIndex}`}
          style={{ overflowX: 'auto', marginTop: '10px', marginBottom: '20px' }}
          ref={this.refs[`${unq}-${item.TableIndex}`]}
        >
          {/* <div dangerouslySetInnerHTML={this.createFullMarkup(item.Table)} /> */}
          <div dangerouslySetInnerHTML={{ __html: item.Table }} />
        </div>
        <div>
          {footNote.map((notes) => {
            return (
              notes && (
                <p
                  style={{ fontSize: '12px' }}
                  dangerouslySetInnerHTML={this.createFullMarkup(notes)}
                >
                  {/* {notes} */}
                </p>
              )
            );
          })}
        </div>
      </>
    );
  }
  getTocElement = (data) => {
    // let section_level = data[0];
    const CPT_section = data[1];
    const type = data[2];
    const content = data[3];
    // let font_info = data[4];
    // let level_1_CPT_section = data[5];
    // let file_section = data[6];
    // let file_section_num = data[7];
    // let file_section_level = data[8];
    const seq_num = data[9];
    if (!content) {
      return null;
    }
    // const isBold = getStyle(font_info);
    if (type === 'table') {
      if (CPT_section === 'Unmapped') {
        return this.getTable(content, 'TOC-TABLE', true);
      }
      return this.getTable(content, 'TOC-TABLE');
    }
    switch (type) {
      case 'header':
        return (
          <div
            id={`TOC-${seq_num}`}
            key={`TOC-${seq_num}`}
            ref={this.refs[`TOC-${seq_num}`]}
            dangerouslySetInnerHTML={this.createFullMarkup(data[3])}
          />
        );
      default:
        if (CPT_section === 'Unmapped') {
          return (
            <p
              id={`CPT_section-${seq_num}`}
              key={`CPT_section-${seq_num}`}
              style={{ fontSize: '12px' }}
              dangerouslySetInnerHTML={this.createFullMarkup(data[3])}
            />
          );
        }
        return (
          <p
            id={`CPT_section-${seq_num}`}
            key={`CPT_section-${seq_num}`}
            // className={`indent ${isBold}`}
            style={{ fontSize: '12px' }}
            dangerouslySetInnerHTML={this.createFullMarkup(data[3])}
          />
        );
    }
  };
  handleClick(id) {
    this.setState({ section: id });
    document.addEventListener('click', this.handleOutsideClick, false);
    let subData = [];
    switch (id) {
      case 'TOC':
        subData = this.props.data.TOC;
        break;
      case 'SOA':
        subData = this.props.data.SOA;
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
    if (this.state.popupVisible) {
      this.hideEle();
    } else {
      this.handleClick();
    }
  }

  hideEle = () => {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.setState({ popupVisible: false, subSectionData: [] });
  };
  render() {
    const { view, listData, page } = this.props;
    const refs = this.state.subSectionData.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});

    const refsSection = listData.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
    const scrollSections = (id) => {
      refsSection[id].current &&
        refsSection[id].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      this.setState({
        activeSubSection: null,
        section: id,
        activeSection: id,
        popupVisible: false,
        subSectionData: [],
      });
      // this.hideEle();
    };
    this.refs = refs;
    const scrollHide = (id) => {
      refs[id].current &&
        refs[id].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      this.setState({
        activeSubSection: id,
        activeSection: this.state.section,
      });
      this.hideEle();
    };
    
    return (
      <>
        <div>
          <BladeLeft handlePageNo={this.handlePageNo} />
        </div>
        <div className="view-wrapper">
          <PanelGroup className="panel_group">
            <Panel
              width={window.innerWidth / 2}
              minWidth={window.innerWidth / 4}
              maxWidth={window.innerWidth / 1.5}
              hideButton
              resizable
            >
              <Card className="protocol-source-column">
                <div className="panel-heading" style={{ marginLeft: '10px' }}>
                  Source Document
                </div>

                <Pdf
                  page={this.state.pageNo}
                  refs={this.props.refx}
                  pageRight={this.state.pageRight}
                />
              </Card>
            </Panel>
            <Panel width={'auto'} hideButton>
              <Digitize
                sectionRef={this.props.sectionRef}
                sectionNumber={this.state.sectionNumber}
                headerDetails={this.state.headerDetails}
                handlePageRight={this.handlePageRight}
                data={this.props.data}
              />
            </Panel>
          </PanelGroup>
        </div>
      </>
    );
  }
}
export default ProtocolViewClass;
