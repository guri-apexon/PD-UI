/* eslint-disable no-console */
import React from "react";

import Blade from "apollo-react/components/Blade";
import Download from "apollo-react-icons/Download";
import Plus from "apollo-react-icons/Plus";

class Sidebar extends React.Component {
  state = {
    open: true,
    expanded: false,
  };

  // onChange = (e, expanded) => {
  //   this.setState({ expanded });
  //   expanded
  //     ? console.log("Blade is now expanded")
  //     : console.log("Blade is now collapsed");
  // };

  onClose = () => {
    this.setState({ open: true, expanded: false });
  };

  onOpen = () => {
    this.setState({ open: true });
  };
  handleDownload = (type, data) => {
    /* istanbul ignore else */
    if ((type = "toc")) {
      this.props.handleDownloadTOC(data);
    }
  };

  render() {
    // const { expanded, open } = this.state;
    const { open, setOpen, compare } = this.props;
    const data = compare.iqvdata.data;

    return (
      <>
        {/* <Button variant="primary" onClick={this.onOpen}>
          {"Open Custom Blade"}
        </Button> */}
        <div className="sidebar">
          <Blade
            side="right"
            width={350}
            expanded={open}
            onChange={() => setOpen(!open)}
            open={open}
            onClose={() => setOpen(false)}
            // title="Custom Blade"
            // subtitle="This blade has a custom width and `onChange` function"
            hasBackdrop={false}
            // hideCloseButton
          >
            <div className="sidebar-div">
              <div
                className="header-section"
                onClick={() => this.handleDownload("toc", data)}
                data-testid="download-div"
              >
                Summary of Changes <Download />
              </div>
              <hr />
              <div className="TOC">
                <div className="header-section">Table of Contents</div>
                <ul>
                  {data.map((item, i) => {
                    const type = item[2];
                    const text1 = item[4];
                    return (
                      type === "header" && (
                        <li>
                          <a>{text1}</a>
                        </li>
                      )
                    );
                  })}
                  {/* <li>
                    <a href="#Synopsis">Synopsis</a>
                  </li> */}
                  {/* <li>Sponser, investigators and Trial Administative</li>
                  <li>Background Information</li>
                  <li>Trial Objectives</li>
                  <li>Investigational Plan</li>
                  <li>Investigational Medicinal Product and others</li>
                  <li>Trial Procedure and Assessments</li> */}
                  {/* <li>
                    <a href="#Statistics">Statistics</a>
                  </li> */}
                  {/* <li>Ethical and Regulatory Aspects</li>
                  <li>Trial Management</li>
                  <li>References</li>
                  <li>Appendices</li> */}
                </ul>
              </div>
              <div className="SOA">
                <div className="header-section">Schedule of Assessments</div>
                <div className="view-changes">
                  <Plus />
                  <a>View Changes</a>
                </div>
              </div>
            </div>
          </Blade>
        </div>
      </>
    );
  }
}

export default Sidebar;
