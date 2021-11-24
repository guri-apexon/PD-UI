/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { useSelector } from "react-redux";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import "./Documents.scss";
// import Button from "apollo-react/components/Button";
import { toast } from "react-toastify";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import Loader from "apollo-react/components/Loader";
import FileDownload from "js-file-download";
import cloneDeep from "lodash/cloneDeep";
import { userId } from "../../../store/userDetails";

import MenuButton from "apollo-react/components/MenuButton";
import { messages } from "../../../AppConstant/AppConstant";
// import Tooltip from "apollo-react/components/Tooltip";
import InfoIcon from "apollo-react-icons/Info";
import IconButton from "apollo-react/components/IconButton";
import Download from "apollo-react-icons/Download";
import Peek from "apollo-react/components/Peek";

const message1 = "Please Select Base Document for Compare";
const message2 = "Please Select Comparator Document for Compare";
const Documents = ({ handleChangeTab }) => {
  const summary = useSelector(protocolSummary);
  const userId1 = useSelector(userId);
  const associateDocuments = useSelector(associateDocs);
  const [protocolSelected, setProtocolSelected] = useState({
    source: "",
    target: "",
    sourceData: "",
    targetData: "",
  });
  const [compareMessage, setCompareMessage] = useState(message1);
  const [loader, setLoader] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  const [userName, setUserName] = useState("");
  const [tooltip1, setToolTip1] = useState(false);
  const [tooltip2, setToolTip2] = useState(false);
  // const [completed, setCompleted] = useState(0);

  const getUserName = async (userID) => {
    const config = {
      url: `${BASE_URL_8000}/api/user/read_all_users?userId=${userID}`,
      method: "GET",
    };
    const userDetailResp = await httpCall(config);
    console.log(userDetailResp);
    if (userDetailResp.success) {
      const userName = `${userDetailResp.data.first_name} ${userDetailResp.data.last_name}`;
      setUserName(userName);
    } else {
      setUserName("");
    }
  };
  useEffect(() => {
    let newObj = cloneDeep(summary.data);
    newObj.userName = userName;
    setSummaryData(newObj);
  }, [userName]);
  useEffect(() => {
    if (summary.success && summary.data.userId) {
      if (isNaN(parseInt(summary.data.userId))) {
        let newObj = cloneDeep(summary.data);
        newObj.userName = "-";
        setSummaryData(newObj);
      } else {
        getUserName(summary.data.userId);
      }
    }
  }, [summary]);

  const setProtocolToDownload = (data) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    if (protocolSelected.source) {
      if (protocolSelected.source === data.id) {
        const obj = {
          source: "",
          target: "",
          sourceData: "",
          targetData: "",
        };
        setProtocolSelected(obj);
        setCompareMessage(message1);
      } else if (protocolSelected.target === data.id) {
        const obj = {
          source: protocolSelected.source,
          target: "",
          sourceData: protocolSelected.sourceData,
          targetData: "",
        };
        setProtocolSelected(obj);
        setCompareMessage(message2);
      } else {
        const obj = {
          source: protocolSelected.source,
          target: data.id,
          sourceData: protocolSelected.sourceData,
          targetData: data,
        };
        setProtocolSelected(obj);
        setCompareMessage("");
      }
    } else {
      const obj = {
        source: data.id,
        target: "",
        sourceData: data,
        targetData: "",
      };
      setProtocolSelected(obj);
      setCompareMessage(message2);
    }
    // if (protocolSelected.length === 0) {
    //   setProtocolSelected([id]);
    // } else if (protocolSelected.length === 1) {
    //   const index = protocolSelected.indexOf(id);
    //   if (index > -1) {
    //     setProtocolSelected((protocolSelected) =>
    //       protocolSelected.filter((item) => item !== id)
    //     );
    //   } else {
    //     setProtocolSelected([...protocolSelected, id]);
    //   }
    // } else if (protocolSelected.length === 2) {
    //   const index = protocolSelected.indexOf(id);
    //   if (index > -1) {
    //     setProtocolSelected((protocolSelected) =>
    //       protocolSelected.filter((item) => item !== id)
    //     );
    //   } else {
    //     toast.warn("Comparison is available only for two protocols.");
    //     // setProtocolSelected([...protocolSelected, id]);
    //   }
    // }
  };
  const downloadCompare = async (type) => {
    try {
      setLoader(true);
      // console.log("UserID Required", userId1);
      const config = {
        url: `${BASE_URL_8000}/api/document_compare/?id1=${
          protocolSelected.source
        }&id2=${protocolSelected.target}&userId=${userId1.substring(
          1
        )}&protocol=${summary.data.protocol}&file_type=${type}`,
        method: "GET",
        responseType: "blob",
      };
      const resp = await httpCall(config);
      if (resp.message === "Success") {
        FileDownload(
          resp.data,
          `${protocolSelected.source}_${protocolSelected.target}.compare_detail${type}`
        );
        // console.log(completed);
        // if (completed === 100 || completed === "100") {
        setLoader(false);
        // }
      } else if (resp.message === "No-Content") {
        toast.info("No difference found for this compare");
        setLoader(false);
      } else if (resp.message === "Not-Found") {
        toast.error("Compare is not available for selected documents.");
        setLoader(false);
      }
      setProtocolSelected([]);
    } catch (e) {
      setLoader(false);
      console.log("Compare Resp", e.response);
      /* istanbul ignore next*/
      if (e.response && e.response.data) {
        toast.error(e.response.data.detail);
      } else {
        toast.error("Data fetching failed. Please try again.");
      }
    }
  };
  const fileContent = (arr) => {
    console.log("TOOLTIP", arr);
    return (
      <div>
        <h3>{arr.header}</h3>
        <ol className="version-validation" style={{ width: 500 }}>
          {arr.body.map((item, i) => (
            <li key={i} className="compare-text-header">
              {item.header}
              <ul>
                {item.body.map((subHeader, j) => (
                  <li className="compare-text-sub-header" key={j}>
                    {subHeader}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    );
  };
  const handleToottip = (e, tooltip) => {
    e.stopPropagation();
    if (tooltip === 1) {
      setToolTip1(!tooltip1);
    } else if (tooltip === 2) {
      setToolTip2(!tooltip2);
    } else {
      setToolTip1(false);
      setToolTip2(false);
    }
  };
  const menuItems = [
    {
      key: "CSV",
      text: (
        <div className="dropdown-text-style">
          <div>CSV</div>
          <div className="info-icon">
            <Peek
              placement="top"
              anchor={
                <IconButton
                  color="primary"
                  onClick={(e) => handleToottip(e, 1)}
                  size="small"
                >
                  <InfoIcon size="small" />
                </IconButton>
              }
              content={fileContent(messages.downloadFileContentExcel)}
              open={tooltip1}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            />
          </div>
        </div>
      ),
      onClick: () => downloadCompare(".csv"),
    },
    {
      key: "EXCEL",
      text: (
        <div className="dropdown-text-style">
          <div>Excel</div>
          <div className="info-icon">
            <Peek
              placement="top"
              anchor={
                <IconButton
                  color="primary"
                  onClick={(e) => handleToottip(e, 2)}
                  size="small"
                >
                  <InfoIcon size="small" />
                </IconButton>
              }
              content={fileContent(messages.downloadFileContentExcel)}
              open={tooltip2}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            />
          </div>
        </div>
      ),
      onClick: () => downloadCompare(".xlsx"),
    },
  ];
  const downloadButton = () => {
    return (
      <label className="compare-main-button">
        Compare Result
        <Download />
      </label>
    );
  };

  // console.log("Protocol Selected", protocolSelected);
  return (
    <ClickAwayListener onClickAway={(e) => handleToottip(e, 3)}>
      <div className="document-tab">
        {loader && <Loader />}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              className="source-document-tab"
              data-testid="source-document-tab"
            >
              {"userName" in summaryData && summaryData.userName && (
                <DocumentsTable initialsRow={[summaryData]} />
              )}
            </div>
          </Grid>
          {associateDocuments && associateDocuments.length > 1 && (
            <>
              <div className="compare-info">
                {protocolSelected.source && protocolSelected.target === "" && (
                  <div className="compare-Detail">
                    <label>Baseline Document :</label>
                    <span>{`${protocolSelected.sourceData.protocol} (${protocolSelected.sourceData.documentStatus} ${protocolSelected.sourceData.versionNumber})`}</span>
                  </div>
                )}
                {protocolSelected.source && protocolSelected.target && (
                  <div className="compare-container">
                    <div className="compare-Detail">
                      <label>Baseline Document :</label>
                      <span>{`${protocolSelected.sourceData.protocol} (${protocolSelected.sourceData.documentStatus} ${protocolSelected.sourceData.versionNumber})`}</span>
                    </div>
                    <div className="compare-Detail">
                      <label>Comparator Document :</label>
                      <span>{`${protocolSelected.targetData.protocol} (${protocolSelected.targetData.documentStatus} ${protocolSelected.targetData.versionNumber})`}</span>
                    </div>
                  </div>
                )}
                <span className="compare-message">{compareMessage}</span>
              </div>
              <div className="compare-buttons">
                <MenuButton
                  buttonText={downloadButton()}
                  menuItems={menuItems}
                  disabled={
                    protocolSelected.source && protocolSelected.target
                      ? false
                      : true
                  }
                />
              </div>
            </>
          )}
          <Grid item xs={12}>
            <div className="associate-document-tab">
              <AssociateDocumentsTable
                handleChangeTab={handleChangeTab}
                protocolSelected={protocolSelected}
                setProtocolToDownload={setProtocolToDownload}
                //  initialsRow={protocolData && protocolData}
                initialsRow={associateDocuments && associateDocuments}
                showCheckbox={
                  associateDocuments && associateDocuments.length > 1
                    ? true
                    : false
                }
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </ClickAwayListener>
  );
};

export default Documents;
