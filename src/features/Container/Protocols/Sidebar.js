/* eslint-disable */
import React from 'react';

import Blade from 'apollo-react/components/Blade';
import Download from 'apollo-react-icons/Download';
import Plus from 'apollo-react-icons/Plus';
import axios from 'axios';

const FileDownload = require('js-file-download');

class Sidebar extends React.Component {
  state = {
    open: true,
    expanded: false,
  };

  handleDownload = (type, data) => {
    /* istanbul ignore else */
    if (type === 'toc') {
      axios({
        url: 'http://localhost:4000/create-excel',
        method: 'POST',
        responseType: 'blob', // Important
        data,
      }).then((response) => {
        FileDownload(response.data, `${data.protocolNumber}.xlsx`);
      });
    }
  };

  render() {
    const { open, setOpen, compare } = this.props;
    const { data } = compare.iqvdata;

    return (
      <>
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
                onClick={() => this.handleDownload('toc', compare)}
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
                    const text1 = item[4] ? item[4] : item[5];

                    const noOFDiff = item[7];
                    return (
                      type === 'header' && (
                        <li key={`toc${i}`}>
                          <a>
                            {text1} ({noOFDiff})
                          </a>
                        </li>
                      )
                    );
                  })}
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
