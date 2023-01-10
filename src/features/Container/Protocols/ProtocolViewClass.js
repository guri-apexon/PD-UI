/* eslint-disable */
import React from 'react';
import Card from 'apollo-react/components/Card';
import ChevronRight from 'apollo-react-icons/ChevronRight';
import Loader from '../../Components/Loader/Loader';
import { redaction } from '../../../AppConstant/AppConstant';

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
    };
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
    const { view, listData } = this.props;

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

    if (view.loader) {
      return (
        <div
          style={{
            display: 'inline-block',
            margin: 'auto',
            marginTop: '10%',
          }}
        >
          <Loader />
        </div>
      );
    }

    if (view.err) {
      return (
        <div
          style={{
            display: 'inline-block',
            margin: 'auto',
            marginTop: '10%',
          }}
        >
          {view.err}
        </div>
      );
    }
    return (
      <div className="view-wrapper">
        <Card className="index-column">
          <div
            ref={(node) => {
              this.node = node;
            }}
          >
            <div
              className="dropdown-wrapper"
              data-testid="dropdown-wrapper-test"
              id="dropdown-wrapper-id"
            >
              {listData.map((item) => (
                <button
                  className={`btn btn1 ${
                    this.state.activeSection === item.id ? 'active' : ''
                  }`}
                  onClick={() =>
                    item.subSections
                      ? this.handleClick(item.id)
                      : scrollSections(item.id)
                  }
                  key={`section-${item.id}`}
                >
                  <span
                    style={{ marginLeft: '16px' }}
                    dangerouslySetInnerHTML={{ __html: item.section }}
                  >
                    {/* {item.section}{" "} */}
                  </span>
                  {item.subSections && (
                    <span style={{ float: 'right', fontSize: '1em' }}>
                      <ChevronRight
                        className="view-more-icon"
                        variant="small"
                        style={{ float: 'right', fontSize: '1em' }}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
            {this.state.popupVisible && (
              <div
                className="dropdown-menu sample"
                data-testid="dropdown-menu-test"
                id="dropdown-menu-id"
              >
                {this.state.subSectionData.map((data, i) => (
                  <span>
                    <a
                      className={`btn btn1 ${
                        this.state.activeSubSection === data.id ? 'active' : ''
                      }`}
                      key={`sub-section-${data.id}`}
                      onClick={() => scrollHide(data.id)}
                      style={{ width: '95%' }}
                    >
                      <p
                        style={{ margin: 0, marginLeft: '16px' }}
                        dangerouslySetInnerHTML={{ __html: data.section }}
                      >
                        {/* {`${data.section}`} */}
                      </p>
                    </a>
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
        <Card className="protocol-column">
          <div
            style={{
              scrollPadding: '50px 0px 0px 50px',
              padding: '10px 16px',
              overflowY: 'scroll',
              height: '65vh',
            }}
            data-testid="protocol-column-wrapper"
          >
            {view.iqvdataToc.data.length &&
              view.iqvdataToc.data.map((item) => {
                return this.getTocElement(item);
              })}
            {view.iqvdataSoa.map((item) => this.getTable(item, 'SOA'))}
            {view.iqvdataSummary && (
              <div
                id="SUM"
                key="SUM"
                ref={refsSection.SUM}
                style={{ marginTop: '10%' }}
              >
                <h1>Summary</h1>
                <table border="1">
                  <tbody>
                    {view.iqvdataSummary.data.map((item) => {
                      return (
                        <tr>
                          <td style={{ width: '30%' }}>
                            {' '}
                            <div
                              style={{ fontWeight: '600' }}
                              // dangerouslySetInnerHTML={{ __html: item[2] }}
                              dangerouslySetInnerHTML={this.createFullMarkup(
                                item[2],
                              )}
                            />
                          </td>
                          <td style={{ width: '70%' }}>
                            {' '}
                            <p
                              style={{ marginTop: 0, marginBottom: '10px' }}
                              // dangerouslySetInnerHTML={{ __html: item[1] }}
                              dangerouslySetInnerHTML={this.createFullMarkup(
                                item[1],
                              )}
                            />
                          </td>
                        </tr>
                      );

                      // return (
                      //   <>
                      //     <div dangerouslySetInnerHTML={{ __html: item[2] }}></div>
                      //     <p
                      //       style={{ marginTop: 0, marginBottom: "10px" }}
                      //       dangerouslySetInnerHTML={{ __html: item[1] }}
                      //     ></p>
                      //   </>
                      // );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

export default ProtocolViewClass;
