/* eslint-disable no-console */
import React from "react";

import Blade from "apollo-react/components/Blade";
import Download from "apollo-react-icons/Download";
import Plus from "apollo-react-icons/Plus";
import axios from "axios";
const FileDownload = require("js-file-download");

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

  // onClose = () => {
  //   this.setState({ open: true, expanded: false });
  // };

  // onOpen = () => {
  //   this.setState({ open: true });
  // };
  handleDownload = (type, data) => {
    /* istanbul ignore else */
    if ((type = "toc")) {
      // this.props.handleDownloadTOC(data);
      axios({
        url: "http://localhost:4000/create-excel",
        method: "POST",
        responseType: "blob", // Important
        data: data,
      }).then((response) => {
        FileDownload(response.data, `${data.protocolNumber}.xlsx`);
      });
    }
  };

  render() {
    // const { expanded, open } = this.state;
    const { open, setOpen, compare } = this.props;
    const data = compare.iqvdata.data;

    return (
      <>
        {/* Protocol.scss */}
        <div className="sidebar">
          <Blade
            side="right"
            width={350}
            expanded={open}
            open={open}
            onClose={() => setOpen(false)}
            hasBackdrop={false}
            data-testid="sidebar-div"
            className="sidebar-blade"
          >
            <div className="sidebar-div">
              <div
                className="header-section"
                onClick={() => this.handleDownload("toc", compare)}
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
                        <li key={"toc" + i}>
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
